#!/bin/bash
cd "$(dirname "$0")"

git reset --hard
git pull

cd client
yarn install --pure-lockfile --production
yarn build
cd ..

cd api
yarn install --pure-lockfile --production
yarn build
pm2 restart 0
