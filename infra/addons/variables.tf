variable "digitalocean_token" {
  description = "DigitalOcean personal access token"
  type        = string
  sensitive   = true
}

variable "cluster_name" {
  description = "DOKS cluster name, looked up as a data source"
  type        = string
  default     = "tylerpedersen"
}

variable "registry_name" {
  description = "DOCR registry name used to mint pull credentials"
  type        = string
  default     = "tylerpedersen"
}

variable "app_namespace" {
  description = "Namespace the application deploys into"
  type        = string
  default     = "web"
}

variable "pull_secret_name" {
  description = "Name of the dockerconfigjson secret referenced by k8s/deployment.yaml"
  type        = string
  default     = "registry-tylerpedersen"
}

variable "ingress_nginx_version" {
  description = "ingress-nginx chart version. Must match the installed release (helm list -A)"
  type        = string
}

variable "cert_manager_version" {
  description = "cert-manager chart version. Must match the installed release (helm list -A)"
  type        = string
}
