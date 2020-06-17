#! /bin/bash

source config

echo "Creating docker-compose template..."
envsubst < ./templates/docker-compose.template.yml > docker-compose.yml
echo "Creating docker-compose.prod template..."
envsubst < ./templates/docker-compose.prod.template.yml > docker-compose.prod.yml
echo "Creating package.json template..."
envsubst < ./templates/package.template.json > ./client/package.json
echo "Creating composer.json template..."
envsubst < ./templates/composer.template.json > ./server/composer.json
echo "Creating nginx template..."
envsubst < ./templates/nginx.dev.template.conf > ./web/nginx.dev.conf

echo "Done!"
