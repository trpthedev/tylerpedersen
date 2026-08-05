output "cluster_id" {
  description = "DOKS cluster UUID"
  value       = digitalocean_kubernetes_cluster.this.id
}

output "cluster_name" {
  description = "DOKS cluster name, consumed by the deploy workflow"
  value       = digitalocean_kubernetes_cluster.this.name
}

output "registry_name" {
  description = "DOCR registry name"
  value       = digitalocean_container_registry.this.name
}

output "registry_endpoint" {
  description = "Registry endpoint used for image tags"
  value       = "registry.digitalocean.com/${digitalocean_container_registry.this.name}"
}
