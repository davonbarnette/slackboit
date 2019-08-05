#!/usr/bin/env bash
set -e
echo "Running database migrations..."
npx sequelize db:migrate || exit
echo "Starting Slackboit..." &&\
exec node index.js