# syntax=docker.mirror.hashicorp.services/docker/dockerfile:experimental
# Copyright IBM Corp. 2026

# Go version must be set explicitly. If it isn't, then "<UNSET>" is used, which
# causes an error due to the image name format.
# NOTE: The above experimental syntax declaration is required for this to work.
ARG GO_VERSION_FROM_GO_MOD=<UNSET>
FROM docker.mirror.hashicorp.services/golang:${GO_VERSION_FROM_GO_MOD} as builder

ENV GOBIN=/go/bin
ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GO111MODULE=on
WORKDIR /app

COPY go.mod /app
COPY go.sum /app
RUN go mod download

COPY ./ .

RUN go build -o bin/terraform-graph-catalog \
    -ldflags "-X terraform-graph-catalog/internal/version.GitCommit=$(git rev-parse --short HEAD)" \
    ./cmd/terraform-graph-catalog

FROM docker.mirror.hashicorp.services/alpine:3.16
RUN apk add --no-cache curl
COPY --from=builder /app/bin ./

STOPSIGNAL SIGINT
ENTRYPOINT ["./terraform-graph-catalog"]
