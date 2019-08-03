#!/usr/bin/env bash
docker login &&
docker pull davonbarnette/slackboit:latest &&
docker rm -f slackboit
docker run --env-file slackboit.env -p 8080:8080 davonbarnette/slackboit