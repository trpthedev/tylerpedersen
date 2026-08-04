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
