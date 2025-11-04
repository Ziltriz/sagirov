#!/usr/bin/make

include .env
export $(shell sed 's/=.*//' .env)

SHELL = /bin/sh

IMAGES_PREFIX := $(shell basename $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))

CONTAINER_NAME := app
NGINX_CONTAINER_NAME := web_nginx

DOCKER_COMPOSE_FILE = docker-compose-${ENV_NAME}.yml

.SILENT: help init install build network up down restart status console logs status

.PHONY : help init install build network up down restart status console logs status

.DEFAULT_GOAL := help

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: install build network ## init service

install: network ## install service
	docker compose -f "$(DOCKER_COMPOSE_FILE)" run --rm "$(CONTAINER_NAME)" npm install -g pnpm@latest && pnpm install

build: ## build service
	docker compose -f "$(DOCKER_COMPOSE_FILE)" run --rm "$(CONTAINER_NAME)" pnpm build

network: ## create network service
	docker network create $(PROJECT_NAME)-${ENV_NAME} || true
	docker network create $(PROJECT_NAME)-si-service-${ENV_NAME} || true

up: ## Up service
	docker compose -f ${DOCKER_COMPOSE_FILE} up -d

down: ## down service
	docker compose -f ${DOCKER_COMPOSE_FILE} down

restart: ## restart service
	docker compose -f ${DOCKER_COMPOSE_FILE} restart

console: ## console service
	docker compose -f ${DOCKER_COMPOSE_FILE} exec "$(CONTAINER_NAME)" /bin/sh

logs: ## console service
	docker compose -f ${DOCKER_COMPOSE_FILE} logs "$(CONTAINER_NAME)"

status: ## status service
	docker compose -f ${DOCKER_COMPOSE_FILE} ps -a