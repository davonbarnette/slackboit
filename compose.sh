#!/usr/bin/env bash
sudo docker login &&
sudo docker-compose pull &&
sudo docker-compose up -d