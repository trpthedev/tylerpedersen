# Non-secret identifiers. The DigitalOcean token comes from
# TF_VAR_digitalocean_token, set by the infra workflow.

# doctl kubernetes cluster list -> ID
cluster_id = "FILL-cluster-uuid"

# doctl kubernetes cluster get tylerpedersen -> Version
cluster_version = "FILL-k8s-version"

# doctl kubernetes cluster node-pool list tylerpedersen -> Name
node_pool_name = "FILL-pool-name"
