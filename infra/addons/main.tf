terraform {
  required_version = ">= 1.6.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.43"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.35"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    endpoints                   = { s3 = "https://nyc3.digitaloceanspaces.com" }
    bucket                      = "tylerpedersen-tfstate"
    key                         = "addons.tfstate"
    region                      = "us-east-1"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
    use_path_style              = true
  }
}

provider "digitalocean" {
  token = var.digitalocean_token
}

# Read the cluster created by infra/platform. Keeps provider config out of the
# same apply that creates the cluster, which would fail on a cold plan.
data "digitalocean_kubernetes_cluster" "this" {
  name = var.cluster_name
}

locals {
  kube = data.digitalocean_kubernetes_cluster.this.kube_config[0]
}

provider "kubernetes" {
  host                   = local.kube.host
  token                  = local.kube.token
  cluster_ca_certificate = base64decode(local.kube.cluster_ca_certificate)
}

provider "helm" {
  kubernetes = {
    host                   = local.kube.host
    token                  = local.kube.token
    cluster_ca_certificate = base64decode(local.kube.cluster_ca_certificate)
  }
}

# --- Adopt what the deploy workflow installed imperatively -------------------

import {
  to = kubernetes_namespace.web
  id = var.app_namespace
}

import {
  to = helm_release.ingress_nginx
  id = "ingress-nginx/ingress-nginx"
}

import {
  to = helm_release.cert_manager
  id = "cert-manager/cert-manager"
}

# --- Resources ---------------------------------------------------------------

resource "kubernetes_namespace" "web" {
  metadata {
    name = var.app_namespace
  }
}

# Version is pinned deliberately. An unpinned upgrade can recreate the
# LoadBalancer Service, which issues a new IP and breaks DNS at Namecheap.
resource "helm_release" "ingress_nginx" {
  name             = "ingress-nginx"
  namespace        = "ingress-nginx"
  create_namespace = true
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  version          = var.ingress_nginx_version
}

resource "helm_release" "cert_manager" {
  name             = "cert-manager"
  namespace        = "cert-manager"
  create_namespace = true
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = var.cert_manager_version

  set = [
    {
      name  = "crds.enabled"
      value = "true"
    }
  ]
}

# --- DOCR pull secret --------------------------------------------------------

data "digitalocean_container_registry_docker_credentials" "this" {
  registry_name = var.registry_name
}

resource "kubernetes_secret" "docr" {
  metadata {
    name      = var.pull_secret_name
    namespace = kubernetes_namespace.web.metadata[0].name
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = data.digitalocean_container_registry_docker_credentials.this.docker_credentials
  }
}
