#!/bin/bash
cd "$(dirname "$0")"
node --version
ls
echo $(whoami)
git reset --hard
git pull
yarn
yarn build
pm2 restart 0
