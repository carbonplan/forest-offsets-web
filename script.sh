#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "azure-deployment" ]] ; then
  # Don't build
  exit 0;

else
  # Proceed with the build
  exit 1;
fi