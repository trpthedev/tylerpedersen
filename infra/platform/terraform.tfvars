# Non-secret identifiers. The DigitalOcean token comes from
# TF_VAR_digitalocean_token, set by the infra workflow.

cluster_version = "1.36.3-do.0"
node_pool_name  = "tylerpedersen-default-pool"

# starter allows only 1 repository; the api image needs a second one.
registry_tier = "basic"
