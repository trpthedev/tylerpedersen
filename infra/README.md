# infra

Terraform for the long-lived DigitalOcean resources. Everything here predates any
single commit; per-commit rollout stays in `.github/workflows/deploy.yml`.

## Split

| State | Owns |
| --- | --- |
| `platform/` | DOCR registry, DOKS cluster + node pool |
| `addons/` | `web` namespace, DOCR pull secret, ingress-nginx, cert-manager |

Two states because the `kubernetes` and `helm` providers need cluster credentials
at configure time. Apply `platform` first, then `addons`; destroy in reverse.

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

## After a rebuild

A fresh apply recreates everything, but it is a rebuild, not a restore:

1. `platform` apply — new cluster, empty registry.
2. `addons` apply — new ingress LoadBalancer with a **new IP**.
3. Update both A records at Namecheap (`tylerpedersen.com`, `www`) to that IP.
4. Run `deploy.yml` manually to build and push an image and apply the app
   manifests. Nothing runs in the cluster until this happens.
5. TLS issues on its own once DNS resolves — cert-manager uses an HTTP-01
   challenge, so Let's Encrypt has to reach the domain first.

Let's Encrypt rate-limits roughly 5 certificates per domain per week, so repeated
rebuild cycles will lock you out of new certs.
