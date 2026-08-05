# Non-secret identifiers. The DigitalOcean token comes from
# TF_VAR_digitalocean_token, set by the infra workflow.
#
# Exact installed chart versions. A mismatch here upgrades the release, which
# can recreate the ingress LoadBalancer and issue a new IP — DNS at Namecheap
# would then need a manual edit.
#
# Note cert-manager's chart version carries a "v" prefix; ingress-nginx's does not.

ingress_nginx_version = "4.15.1"
cert_manager_version  = "v1.21.1"
