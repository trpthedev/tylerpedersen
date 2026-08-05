# Non-secret identifiers. The DigitalOcean token comes from
# TF_VAR_digitalocean_token, set by the infra workflow.

# helm list -A -> CHART column, exact installed versions.
# A mismatch here upgrades the release, which can recreate the ingress
# LoadBalancer and issue a new IP — DNS at Namecheap would need a manual edit.
ingress_nginx_version = "FILL"
cert_manager_version  = "FILL"
