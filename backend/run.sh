#!/usr/bin/env bash
set -e
echo "Executing run command..."
echo "Running database migrations..."
npx sequelize db:migrate || exit
echo "Running database seeds..."
npx sequelize db:seed:all || exit
echo "Starting Slackboit..." &&\
exec node index.js