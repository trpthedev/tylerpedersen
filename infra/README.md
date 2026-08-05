# infra

Terraform for the long-lived DigitalOcean resources. Everything here predates any
single commit; per-commit rollout stays in `.github/workflows/deploy.yml`.

## Split

| State | Owns |
| --- | --- |
| `platform/` | DOCR registry, DOKS cluster + node pool |
| `addons/` | `web` namespace, DOCR pull secret, ingress-nginx, cert-manager |

Two states because the `kubernetes` and `helm` providers need cluster credentials
at configure time. Creating the cluster in the same apply that configures them
fails on a cold plan.

DNS is **not** managed here — records live at Namecheap and stay manual.

The cert-manager `ClusterIssuer` also stays out, applied from `k8s/cluster-issuer.yaml`.
`kubernetes_manifest` requires the CRD to exist at plan time, which breaks cold planning.

## Adopting the existing infrastructure

The registry, cluster, and Helm releases already exist — the deploy workflow created
them imperatively. Both states use `import` blocks to adopt them rather than create
duplicates.

Fill these in first, from the live cluster:

```sh
doctl kubernetes cluster get tylerpedersen   # cluster_id, cluster_version, node pool name
helm list -A                                  # ingress_nginx_version, cert_manager_version
```

Then:

```sh
cd platform
terraform init
terraform plan   # MUST report "No changes"
```

**The plan is the gate.** If it wants to modify anything, the HCL does not match
reality — fix the HCL, never apply through it. Two failure modes to watch:

- Wrong `cluster_version` or `node_pool_name` -> plans a cluster **replace**.
- Wrong chart version -> upgrades ingress-nginx, which can recreate the
  LoadBalancer, issue a new IP, and take the site down until Namecheap is edited
  by hand.

Once `platform` plans clean, repeat for `addons`.

## Backend

State lives in a DigitalOcean Spaces bucket (`tylerpedersen-tfstate`), which is
S3-compatible. Create the bucket before `terraform init`, and export Spaces keys as
`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`.
