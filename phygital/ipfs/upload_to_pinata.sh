#!/usr/bin/env bash

# Simple helper script to upload a JSON metadata file to Pinata using a JWT.
# Usage:
#   export PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#   ./upload_to_pinata.sh ../metadata/watch_001.json

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <path-to-json-file>"
  exit 1
fi

FILE_PATH="$1"

if [ -z "${PINATA_JWT:-}" ]; then
  echo "PINATA_JWT env var is not set."
  exit 1
fi

curl -X POST "https://api.pinata.cloud/pinning/pinFileToIPFS" \
  -H "Authorization: Bearer ${PINATA_JWT}" \
  -F "file=@${FILE_PATH}"

