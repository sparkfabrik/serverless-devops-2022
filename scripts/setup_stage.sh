#!/usr/bin/env bash

read -p "Please insert the name of your serverless stage: " STAGE
sed -i "s/{STAGE}/$STAGE/" backend/package.json
sed -i "s/{STAGE}/$STAGE/" frontend/package.json
sed -i "s/{STAGE}/$STAGE/" frontend/src/environments/environment.prod.ts
sed -i "s/{STAGE}/$STAGE/" frontend/src/environments/environment.ts
