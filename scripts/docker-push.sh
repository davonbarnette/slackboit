#!/usr/bin/env bash
docker login &&
docker build -t slackboit:latest . &&
docker tag slackboit:latest davonbarnette/slackboit:latest &&
docker push davonbarnette/slackboit:latest