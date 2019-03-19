#!/usr/bin/env bash
docker login &&
docker pull davonbarnette/slackboit:latest &&
docker run --env-file slackboit.env -p 8080:8080 slackboit