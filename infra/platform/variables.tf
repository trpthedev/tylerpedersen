variable "digitalocean_token" {
  description = "DigitalOcean personal access token"
  type        = string
  sensitive   = true
}

variable "registry_name" {
  description = "DigitalOcean container registry name"
  type        = string
  default     = "tylerpedersen"
}

variable "registry_tier" {
  description = "Container registry subscription tier"
  type        = string
  default     = "starter"
}

variable "cluster_name" {
  description = "DOKS cluster name"
  type        = string
  default     = "tylerpedersen"
}

variable "cluster_region" {
  description = "DOKS cluster region"
  type        = string
  default     = "nyc1"
}

variable "cluster_version" {
  description = "DOKS version slug. Must match the live cluster exactly (doctl kubernetes cluster get)"
  type        = string
}

variable "node_pool_name" {
  description = "Name of the existing default node pool. Must match exactly"
  type        = string
}

variable "node_size" {
  description = "Droplet size slug for the node pool"
  type        = string
  default     = "s-1vcpu-2gb"
}

variable "node_count" {
  description = "Node count in the default pool"
  type        = number
  default     = 2
}
