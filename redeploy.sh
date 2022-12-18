#!/bin/bash
cd "$(dirname "$0")"

git reset --hard
git pull

cd client
yarn 
yarn build
cd ..

cd api
yarn
yarn build
pm2 restart 0
