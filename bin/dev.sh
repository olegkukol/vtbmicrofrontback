#!/usr/bin/env bash
set -e

docker-compose up -d --force-recreate

npm run dev-server
