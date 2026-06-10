.PHONY: setup env env-force env-check db-up db-down db-logs

ENV_FILE ?= .env

setup: env db-up

env:
	@if [ -f "$(ENV_FILE)" ]; then \
		echo "$(ENV_FILE) already exists. Use 'make env-force' to overwrite it."; \
	else \
		$(MAKE) env-force; \
	fi

env-force:
	@printf '%s\n' \
		'OPENAI_API_KEY=' \
		'PINECONE_API_KEY=' \
		'PINECONE_INDEX=geo-rca' \
		'DATABASE_URL=postgresql://geo_rca:geo_rca@localhost:5432/geo_rca' \
		'REDIS_URL=redis://localhost:6379' \
		'NEXT_PUBLIC_API_BASE_URL=http://localhost:3333/api' \
		> "$(ENV_FILE)"
	@echo "Generated $(ENV_FILE)"

env-check:
	@test -f "$(ENV_FILE)" && echo "$(ENV_FILE) exists" || echo "$(ENV_FILE) is missing. Run 'make env'."

db-up:
	docker compose up -d postgres redis

db-down:
	docker compose down

db-logs:
	docker compose logs -f postgres redis
