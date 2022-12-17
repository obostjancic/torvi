#!/bin/bash
cd "$(dirname "$0")"

pwd
ls
echo $(whoami)
git reset --hard
git pull
yarn
yarn build
pm2 restart 0
