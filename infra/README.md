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
fails on a cold plan. Apply `platform` first, then `addons`; destroy in reverse.

DNS is **not** managed here — records live at Namecheap and stay manual.

The cert-manager `ClusterIssuer` also stays out, applied from `k8s/cluster-issuer.yaml`.
`kubernetes_manifest` requires the CRD to exist at plan time, which breaks cold planning.

## Running it

Never from a laptop. Everything goes through `.github/workflows/infra.yml`:

- **Plan** runs automatically on any PR touching `infra/**`.
- **Apply / destroy** are manual: Actions > infra > Run workflow, pick the
  directory and the action. Destroy additionally requires typing `DESTROY` into
  the confirm field.

The `infra` GitHub environment gates applies and destroys.

## Backend

State lives in a DigitalOcean Spaces bucket (`tylerpedersen-tfstate`, nyc3), which
is S3-compatible. Spaces keys are stored as the `SPACES_ACCESS_KEY_ID` and
`SPACES_SECRET_ACCESS_KEY` repository secrets.

Spaces has no state locking, so never run two applies concurrently.

## Rebuilding from scratch

After a destroy, a fresh apply recreates everything — but it is a rebuild, not a
restore:

- The ingress LoadBalancer gets a **new IP**. Update the A records at Namecheap by
  hand or the site stays down.
- The registry comes back empty. Pods cannot start until `deploy.yml` pushes an
  image.
- TLS certificates are reissued. Let's Encrypt rate-limits roughly 5 per domain
  per week, so repeated cycles will lock you out.

The original resources were adopted with `import` blocks, which have since been
removed. A fresh apply creates rather than adopts.
