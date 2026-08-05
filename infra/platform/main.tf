terraform {
  required_version = ">= 1.6.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.43"
    }
  }

  # DigitalOcean Spaces (S3-compatible). Create the bucket before `terraform init`.
  # Auth via AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY set to Spaces keys.
  backend "s3" {
    endpoints                   = { s3 = "https://nyc3.digitaloceanspaces.com" }
    bucket                      = "tylerpedersen-tfstate"
    key                         = "platform.tfstate"
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

resource "digitalocean_container_registry" "this" {
  name                   = var.registry_name
  subscription_tier_slug = var.registry_tier
}

resource "digitalocean_kubernetes_cluster" "this" {
  name    = var.cluster_name
  region  = var.cluster_region
  version = var.cluster_version

  node_pool {
    name       = var.node_pool_name
    size       = var.node_size
    node_count = var.node_count
  }
}
