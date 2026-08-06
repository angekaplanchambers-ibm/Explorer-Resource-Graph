NAME := terraform-graph-catalog
GO := go
PKG := $(shell go list ./...)
BIN_PATH ?= bin/$(NAME)
GIT_COMMIT ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo unknown)
EFFECTIVE_LD_FLAGS ?= "-X terraform-graph-catalog/internal/version.GitCommit=$(GIT_COMMIT) $(LD_FLAGS)"

.PHONY: help build run test lint fmt clean cover vet ensure-gotestsum new-migration

help:  ## Show this help message (default)
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make <target>\n\nTargets:\n"} /^[a-zA-Z_-]+:.*##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

build: ## Build the application
	$(GO) build -o $(BIN_PATH) -ldflags $(EFFECTIVE_LD_FLAGS) ./cmd/terraform-graph-catalog

run: build ## Run the application
	./$(BIN_PATH)

test: vet ensure-gotestsum ## Run tests
	gotestsum --format testname $(shell find . -name "*_test.go" | xargs dirname | sort -u | xargs go list) -- -count=1

ensure-gotestsum: ## Ensure gotestsum is installed
	@which gotestsum >/dev/null 2>&1 || go install gotest.tools/gotestsum@v1.10.0

fmt: ## Format code
	$(GO) fmt $(PKG)

vet: ## Run go vet
	$(GO) vet $(PKG)

clean: ## Remove build artifacts
	rm -rf bin/
	rm -f coverage.out

deps: ## Install dependencies
	$(GO) mod download

.PHONY: new-migration
new-migration: ## Create a new migration file.
ifndef MIGRATION_NAME
	$(error usage: make new-migration MIGRATION_NAME=foo)
endif
	$(eval VER=$(shell date +%s))
	touch internal/database/migrations/$(VER)_$(MIGRATION_NAME).up.sql
	touch internal/database/migrations/$(VER)_$(MIGRATION_NAME).down.sql
