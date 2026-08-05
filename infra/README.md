# tylerpedersen.com

Production-focused React platform and infrastructure build featuring automated container delivery, Kubernetes deployment, and cloud provisioning on DigitalOcean.

## Summary

Designed and implemented a full deployment pipeline for a Vite + React application with a strong DevOps focus. Built an end-to-end GitHub Actions workflow that handles container build, private registry publishing, Kubernetes rollout orchestration, and deployment diagnostics. Delivered a cluster-ready application stack including ingress and TLS automation.

## Key Achievements

- Built CI/CD automation that deploys on pull request merge to main.
- Containerized the frontend app with a multi-stage Docker build and NGINX runtime image.
- Published versioned and latest image tags to DigitalOcean Container Registry.
- Implemented Kubernetes deployment automation with rollout status monitoring and failure diagnostics.
- Integrated ingress-nginx and cert-manager for HTTPS termination and certificate management.
- Added private registry pull-secret wiring for Kubernetes pods using DigitalOcean registry credentials.

## Technical Highlights

### Application Stack

- React 19
- TypeScript 6
- Vite 8
- NGINX container runtime

### Cloud and Infrastructure

- DigitalOcean Container Registry (private image hosting)
- DigitalOcean Kubernetes (DOKS) deployment target
- GitHub Actions-driven infrastructure bootstrap for registry and cluster setup

### CI/CD and Delivery

- GitHub Actions workflow in .github/workflows/deploy.yml
- Merge-triggered pipeline:
  - Build and push container image
  - Ensure registry exists
  - Ensure Kubernetes cluster exists
  - Bootstrap required cluster components
  - Apply manifests and roll forward to commit SHA image
- Rollout diagnostics included for rapid failure triage:
  - Deployment, ReplicaSet, and Pod snapshots
  - Events and describe output for root-cause analysis

## Kubernetes Deployment Architecture

Resources in k8s include:

- Namespace for app isolation
- Deployment with 2 replicas
- ClusterIP service
- Ingress resource with host rules for:
  - tylerpedersen.com
  - www.tylerpedersen.com
- ClusterIssuer for Let's Encrypt certificate requests

## Security and Operational Practices

- Uses GitHub Actions secret for DigitalOcean access token.
- Keeps registry private and requires authenticated pulls.
- Configures imagePullSecrets for Kubernetes workloads pulling private images.
- Includes infrastructure and rollout logs for troubleshooting without direct cluster access.

## Repository Areas

- src: React application code
- Dockerfile: production image build
- .github/workflows/deploy.yml: CI/CD pipeline
- k8s: Kubernetes manifests for runtime deployment

## Outcome

Delivered a deployable cloud application platform with automated infrastructure-aware delivery, private container distribution, and Kubernetes-based production rollout capabilities.
