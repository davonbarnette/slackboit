#!/usr/bin/env bash
docker build -t slackboit:latest . &&
docker run -p 8080:8080 slackboit