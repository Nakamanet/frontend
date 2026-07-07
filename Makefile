.PHONY: help install dev test build deploy up down logs shell

# Next.js Frontend Makefile
# Standalone commands for Next.js frontend service

YELLOW := \033[0;33m
GREEN := \033[0;32m
RED := \033[0;31m
BLUE := \033[0;34m
CYAN := \033[0;36m
NC := \033[0m

# ============================================================================
# CONFIGURATION
# ============================================================================

SERVICE_NAME := anime-web
DOCKER_IMAGE := $(SERVICE_NAME):latest
CONTAINER_NAME := anime-next
NODE_ENV ?= development
PORT ?= 3000

help: ## Show all available commands
	@echo "$(BLUE)=== Next.js Frontend Makefile ===$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-25s$(NC) %s\n", $$1, $$2}'

# ============================================================================
# INSTALLATION & SETUP
# ============================================================================

install: ## Full setup: install deps, generate env
	@echo "$(GREEN)Installing Next.js Frontend...$(NC)"
	npm install
	@test -f .env.local || cp .env.example .env.local
	@echo "$(GREEN)✓ Installation complete$(NC)"
	@echo "$(YELLOW)Next: run 'make dev' to start$(NC)"

deps: ## Install npm dependencies
	@echo "$(GREEN)Installing npm dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

deps-update: ## Update npm dependencies
	@echo "$(YELLOW)Updating dependencies...$(NC)"
	npm update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"

deps-audit: ## Audit npm dependencies for vulnerabilities
	@echo "$(BLUE)Auditing npm packages...$(NC)"
	npm audit

deps-audit-fix: ## Auto-fix vulnerable dependencies
	@echo "$(BLUE)Fixing vulnerabilities...$(NC)"
	npm audit fix
	@echo "$(GREEN)✓ Fixed$(NC)"

# ============================================================================
# DEVELOPMENT
# ============================================================================

dev: ## Start development server with hot reload
	@echo "$(GREEN)Starting development server...$(NC)"
	@echo "$(CYAN)Listening on http://localhost:$(PORT)$(NC)"
	npm run dev

build: ## Build for production
	@echo "$(BLUE)Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

start: ## Start production server
	@echo "$(GREEN)Starting production server...$(NC)"
	npm start

preview: ## Preview production build locally
	@echo "$(GREEN)Previewing production build...$(NC)"
	npm run build
	npm run preview

export: ## Export static site (if using next export)
	@echo "$(BLUE)Exporting static site...$(NC)"
	npm run export || echo "$(YELLOW)Export not configured$(NC)"

# ============================================================================
# DOCKER OPERATIONS
# ============================================================================

docker-build: ## Build Docker image
	@echo "$(BLUE)Building Docker image: $(DOCKER_IMAGE)...$(NC)"
	docker build -t $(DOCKER_IMAGE) .
	@echo "$(GREEN)✓ Image built$(NC)"

docker-dev: docker-build ## Start dev with Docker
	@echo "$(GREEN)Starting development with Docker...$(NC)"
	docker run \
		--name $(CONTAINER_NAME) \
		-p $(PORT):$(PORT) \
		-v $(PWD):/app \
		-w /app \
		-e NODE_ENV=development \
		$(DOCKER_IMAGE) \
		npm run dev
	@echo "$(GREEN)✓ Service running at http://localhost:$(PORT)$(NC)"

docker-up: docker-build ## Start production with Docker
	@echo "$(GREEN)Starting production with Docker...$(NC)"
	docker run \
		--name $(CONTAINER_NAME) \
		-p $(PORT):$(PORT) \
		-v $(PWD):/app \
		-w /app \
		-e NODE_ENV=production \
		$(DOCKER_IMAGE) \
		npm start
	@echo "$(GREEN)✓ Service running at http://localhost:$(PORT)$(NC)"

docker-down: ## Stop Docker service
	@echo "$(YELLOW)Stopping $(SERVICE_NAME)...$(NC)"
	docker stop $(CONTAINER_NAME) 2>/dev/null || true
	docker rm $(CONTAINER_NAME) 2>/dev/null || true
	@echo "$(GREEN)✓ Service stopped$(NC)"

docker-restart: docker-down docker-dev ## Restart Docker service
	@echo "$(GREEN)✓ Service restarted$(NC)"

docker-logs: ## Tail Docker logs
	docker logs -f $(CONTAINER_NAME)

docker-shell: ## Access Docker container shell
	docker exec -it $(CONTAINER_NAME) bash

docker-compose-dev: ## Start with docker-compose (dev)
	docker-compose up next
	@echo "$(GREEN)✓ Running at http://localhost:$(PORT)$(NC)"

docker-compose-down: ## Stop docker-compose service
	docker-compose down

docker-compose-logs: ## View docker-compose logs
	docker-compose logs -f next

# ============================================================================
# TESTING
# ============================================================================

test: ## Run all tests
	@echo "$(BLUE)Running tests...$(NC)"
	npm run test

test-watch: ## Run tests in watch mode
	@echo "$(BLUE)Running tests in watch mode...$(NC)"
	npm run test:watch

test-coverage: ## Generate test coverage
	@echo "$(BLUE)Generating coverage...$(NC)"
	npm run test:coverage
	@echo "$(GREEN)✓ Report in coverage/index.html$(NC)"

test-e2e: ## Run E2E tests
	@echo "$(BLUE)Running E2E tests...$(NC)"
	npm run test:e2e

e2e: test-e2e ## Alias for E2E tests

# ============================================================================
# CODE QUALITY
# ============================================================================

lint: ## Lint code
	@echo "$(BLUE)Linting code...$(NC)"
	npm run lint

lint-fix: ## Auto-fix linting issues
	@echo "$(BLUE)Fixing linting issues...$(NC)"
	npm run lint:fix

format: ## Format code with Prettier
	@echo "$(BLUE)Formatting code...$(NC)"
	npm run format

format-check: ## Check code formatting
	@echo "$(BLUE)Checking code formatting...$(NC)"
	npm run format:check

typecheck: ## Type check TypeScript
	@echo "$(BLUE)Type checking...$(NC)"
	npx tsc --noEmit

analyze: ## Analyze bundle size
	@echo "$(BLUE)Analyzing bundle...$(NC)"
	npm run analyze || ANALYZE=true npm run build

# ============================================================================
# UTILITIES
# ============================================================================

npm: ## Run npm command (usage: make npm CMD="install package-name")
	npm $(CMD)

install-pkg: ## Install npm package (usage: make install-pkg PKG="package-name")
	npm install $(PKG)

install-pkg-dev: ## Install dev dependency (usage: make install-pkg-dev PKG="package-name")
	npm install --save-dev $(PKG)

remove-pkg: ## Remove npm package (usage: make remove-pkg PKG="package-name")
	npm uninstall $(PKG)

version: ## Show Node and npm versions
	@echo "Node: $$(node --version)"
	@echo "npm: $$(npm --version)"
	@echo "Next.js: $$(npx next --version)"

info: ## Show environment info
	@echo "$(BLUE)=== Next.js Frontend Info ===$(NC)"
	@echo "Service: $(SERVICE_NAME)"
	@echo "Port: $(PORT)"
	@echo "Environment: $(NODE_ENV)"
	@echo ""
	@echo "$(BLUE)Node/npm:$(NC)"
	@node --version && npm --version
	@echo ""
	@echo "$(BLUE)Top Dependencies:$(NC)"
	@npm list --depth=0 | head -15

env-check: ## Check .env configuration
	@echo "$(BLUE)=== Environment Check ===$(NC)"
	@test -f .env.local && echo "$(GREEN)✓ .env.local exists$(NC)" || echo "$(RED)✗ .env.local missing$(NC)"
	@grep -q "NEXT_PUBLIC_API_URL=" .env.local && echo "$(GREEN)✓ NEXT_PUBLIC_API_URL set$(NC)" || echo "$(YELLOW)⚠ NEXT_PUBLIC_API_URL not set$(NC)"
	@grep -q "NEXT_PUBLIC_CHAT_URL=" .env.local && echo "$(GREEN)✓ NEXT_PUBLIC_CHAT_URL set$(NC)" || echo "$(YELLOW)⚠ NEXT_PUBLIC_CHAT_URL not set$(NC)"

gen-api: ## Generate API client types from OpenAPI spec
	@echo "$(BLUE)Generating API types...$(NC)"
	npm run gen:api || echo "$(YELLOW)API generation not configured$(NC)"

# ============================================================================
# NEXT.JS SPECIFIC
# ============================================================================

pages: ## List all pages/routes
	@echo "$(BLUE)=== Pages/Routes ===$(NC)"
	@find pages app -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | grep -E "page\.(tsx|ts|jsx|js)|pages/" | sort

components: ## List all components
	@echo "$(BLUE)=== Components ===$(NC)"
	@find components -name "*.tsx" -o -name "*.ts" | head -20

image-optimize: ## Optimize images in public folder
	@echo "$(BLUE)Optimizing images...$(NC)"
	npm run image:optimize || echo "$(YELLOW)Image optimization not configured$(NC)"

sitemap: ## Generate sitemap
	@echo "$(BLUE)Generating sitemap...$(NC)"
	npm run sitemap || echo "$(YELLOW)Sitemap generation not configured$(NC)"

# ============================================================================
# PERFORMANCE
# ============================================================================

lighthouse: ## Run Lighthouse audit
	@echo "$(BLUE)Running Lighthouse audit...$(NC)"
	npx lighthouse http://localhost:$(PORT) --view || echo "$(YELLOW)Install lighthouse: npm install -g lighthouse$(NC)"

perf: ## Check performance
	@echo "$(BLUE)Performance check...$(NC)"
	npm run perf || npm run build && npm start

bundle-report: ## Generate bundle report
	@echo "$(BLUE)Generating bundle report...$(NC)"
	ANALYZE=true npm run build

# ============================================================================
# CLEANUP
# ============================================================================

clean: ## Clean temporary files
	@echo "$(YELLOW)Cleaning up...$(NC)"
	rm -rf .next/
	rm -rf out/
	rm -rf build/
	@echo "$(GREEN)✓ Cleaned$(NC)"

clean-node-modules: ## Remove node_modules
	@echo "$(YELLOW)Removing node_modules...$(NC)"
	rm -rf node_modules/
	@echo "$(GREEN)✓ Removed$(NC)"

clean-all: clean clean-node-modules ## Complete cleanup
	@echo "$(GREEN)✓ Complete cleanup done$(NC)"

prune: ## Remove dangling Docker images
	docker image prune -f

# ============================================================================
# GIT & DEPLOYMENT
# ============================================================================

status: ## Show git status
	git status

log: ## Show recent commits
	git log --oneline -10

push: ## Push to git (usage: make push MSG="Commit message")
	git add .
	git commit -m "$(MSG)"
	git push

pr: ## Create pull request (requires gh CLI)
	gh pr create --web

# ============================================================================
# PRODUCTION BUILD & DEPLOY
# ============================================================================

prod-build: ## Build production image
	@echo "$(BLUE)Building production image...$(NC)"
	docker build -t $(DOCKER_IMAGE)-prod --build-arg NODE_ENV=production .
	@echo "$(GREEN)✓ Production image built$(NC)"

prod-start: build start ## Build and start production
	@echo "$(GREEN)✓ Production running$(NC)"

prod-deploy: prod-build ## Deploy production image
	@echo "$(GREEN)Production build ready$(NC)"
	@echo "$(YELLOW)Push to registry and deploy:$(NC)"
	@echo "  docker push $(DOCKER_IMAGE)-prod"

# ============================================================================
# MONITORING & HEALTH
# ============================================================================

health-check: ## Check if service is healthy
	@echo "$(BLUE)Checking service health...$(NC)"
	curl -s http://localhost:$(PORT)/ > /dev/null && echo "$(GREEN)✓ Service is healthy$(NC)" || echo "$(RED)✗ Service is down$(NC)"

monitor: ## Monitor build times
	@echo "$(BLUE)Monitoring build...$(NC)"
	npm run dev &
	watch -n 1 'ls -lh .next/'

.DEFAULT_GOAL := help
