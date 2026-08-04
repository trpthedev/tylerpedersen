output "registry_name" {
  description = "DigitalOcean container registry name"
  value       = digitalocean_container_registry.this.name
}

output "registry_endpoint" {
  description = "Registry endpoint used for image tags"
  value       = "registry.digitalocean.com/${digitalocean_container_registry.this.name}"
}
