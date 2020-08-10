#!/usr/bin/env bash

echo "Building dist ... ";

npm run build;

echo "Building image ... ";

gcloud config set project nftsnapshotbot;

gcloud builds submit --tag gcr.io/nftsnapshotbot/nft-snapshot-dapp;

echo "Image built - configuring service";

gcloud alpha run deploy nft-snapshot-dapp \
  --image gcr.io/nftsnapshotbot/nft-snapshot-dapp:latest \
  --platform managed \
  --region us-central1 \
  --max-instances=2 \
  --timeout=600 \
  --allow-unauthenticated \

