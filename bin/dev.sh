#!/usr/bin/env bash
set -e

docker-compose -f docker-compose.dev.yml up -d

npm run dev-server
