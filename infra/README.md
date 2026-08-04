# Terraform Infra

This Terraform config creates a DigitalOcean Container Registry.

## Prerequisites

- Terraform 1.5+
- A DigitalOcean PAT exported in your shell

## Usage

```bash
cd infra
export TF_VAR_digitalocean_token="<your_digitalocean_pat>"
terraform init
terraform plan
terraform apply
```

By default, Terraform uses this registry name:

- `tylerpedersen`

Optional: provide an explicit name override.

```bash
terraform apply -var="registry_name=<your_registry_name>"
```

## Outputs

- `registry_name`
- `registry_endpoint`

The workflow in `.github/workflows/deploy.yml` currently uses `tylerpedersen`
directly for the registry name, so no extra GitHub variable or secret is needed
for the registry name.
