# tylerpedersen.com

Production-focused React and Express platform featuring automated container delivery, Kubernetes deployment, and Terraform-managed infrastructure on DigitalOcean.

## Summary

Designed and implemented a full deployment pipeline for a Vite + React frontend and an Express API deployed to the same cluster. Infrastructure is managed as code with Terraform; GitHub Actions handles container build, private registry publishing, Kubernetes rollout orchestration, and deployment diagnostics.

## Key Achievements

- Built CI/CD automation that deploys on pull request merge to main.
- Containerized both the frontend and API with multi-stage Docker builds.
- Published versioned and latest image tags to DigitalOcean Container Registry.
- Implemented Kubernetes deployment automation with rollout status monitoring and failure diagnostics.
- Integrated ingress-nginx and cert-manager for HTTPS termination and certificate management.
- Managed cluster, registry, and cluster add-ons with Terraform using remote state in DigitalOcean Spaces.
- Routed frontend and API through a single host and certificate using path-based ingress rules.

## Technical Highlights

### Application Stack

- React 19
- TypeScript 6
- Vite 8
- Express 5
- NGINX container runtime

### Cloud and Infrastructure

- DigitalOcean Container Registry (private image hosting)
- DigitalOcean Kubernetes (DOKS) deployment target
- Terraform-managed registry, cluster, and cluster add-ons
- Remote Terraform state in DigitalOcean Spaces

### CI/CD and Delivery

- GitHub Actions workflows in .github/workflows
  - deploy.yml: application build and rollout
  - infra.yml: Terraform plan on PR, apply and destroy on manual dispatch
- Merge-triggered pipeline:
  - Build and push the web and API container images
  - Apply manifests and roll forward to the commit SHA image
- Rollout diagnostics included for rapid failure triage:
  - Deployment, ReplicaSet, and Pod snapshots
  - Events and describe output for root-cause analysis

## Architecture

Terraform owns the long-lived resources:

- Container registry
- Kubernetes cluster and node pool
- Namespace and registry pull secret
- ingress-nginx and cert-manager

GitHub Actions owns everything that changes per commit:

- Web Deployment (2 replicas) and ClusterIP service
- API Deployment (2 replicas) with readiness and liveness probes on /api/health
- Ingress with host rules for tylerpedersen.com and www.tylerpedersen.com
- ClusterIssuer for Let's Encrypt certificate requests

Requests to /api are routed to the API service; everything else falls through to
the static site. Sharing one host means one certificate and no CORS handling.

## API

Express service exposing a single endpoint:

- `GET /api/health` returns status, uptime, and a timestamp.

The frontend calls it on load and renders the result in the page footer.

## Security and Operational Practices

- Uses GitHub Actions secrets for the DigitalOcean access token and Spaces keys.
- Keeps registry private and requires authenticated pulls.
- Configures imagePullSecrets for Kubernetes workloads pulling private images.
- Runs the API container as a non-root user.
- Gates Terraform apply and destroy behind a protected GitHub environment.
- Includes infrastructure and rollout logs for troubleshooting without direct cluster access.

## Repository Areas

- src: React application code
- api: Express API service
- infra: Terraform configuration (platform and addons states)
- Dockerfile: production frontend image build
- .github/workflows: CI/CD and infrastructure pipelines
- k8s: Kubernetes manifests for runtime deployment

## Outcome

Delivered a deployable cloud application platform with infrastructure as code, automated delivery, private container distribution, and Kubernetes-based production rollout for both a frontend and an API.
