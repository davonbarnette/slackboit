#!/usr/bin/env bash
docker build -t slackboit:latest . &&
docker run --env-file .env -p 8080:8080 slackboit