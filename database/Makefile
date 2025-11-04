#!/usr/bin/make
include .env
export $(shell sed 's/=.*//' .env)

SHELL = /bin/sh

export UNAME_S=$(shell uname -s | tr A-Z a-z)
export GID=$(shell id -g)
export UID=$(shell id -u)

TAIL = 100
CONTAINER_NAME := postrges_app


help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## up service
	docker-compose up -d --force-recreate

down: ## down service
	docker-compose down

restart: ## restart service
	docker-compose restart

app-up: ## up service
	docker-compose up $(CONTAINER_NAME)

nginx-up: ## up service nginx
	docker-compose up $(CONTAINER_NAME_NGINX)

app-restart: ## restart service 
	docker-compose restart $(CONTAINER_NAME)

nginx-restart: ## restart nginx 
	docker-compose restart $(CONTAINER_NAME_NGINX)

app-console: ## shell service
	docker-compose exec $(CONTAINER_NAME) ${SHELL}

nginx-console: ## shell nginx
	docker-compose exec $(CONTAINER_NAME_NGINX) ${SHELL}

app-logs: ## logs service
	docker-compose logs -f --tail=100 "$(CONTAINER_NAME)"

nginx-logs: ## logs nginx
	docker-compose logs -f --tail=100 "$(CONTAINER_NAME_NGINX)"

status: ## status service
	docker-compose ps -a

network: ## create network service
	@docker network create $(PROJECT_NAME)-si-service || true
	@docker network create $(PROJECT_NAME)-$(ENV_NAME) || true
	@docker network create $(PROJECT_NAME)-si-service-$(ENV_NAME) || true
