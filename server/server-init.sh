#!/bin/bash
set -e

if [[ ! -d vendor ]];
then
  composer install
fi

printenv

composer dumpautoload

php artisan key:generate --force
php artisan config:cache

# Clear all the possible cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan passport:keys
php artisan migrate

php artisan queue:work --daemon &

exec "$@"
