#!/bin/bash

if [[ "$BRANCH" == "azure-deployment" ]] ; then
  # Don't build
  exit 0;

else
  # Proceed with the build
  exit 1;
fi