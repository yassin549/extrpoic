#!/bin/bash

# This script packages the essential frontend assets for handoff to the backend team.

# Define the output file
OUTPUT_FILE="handoff.zip"

# List of files and directories to include
FILES_TO_INCLUDE="\
  dist/ \
  assets/ \
  public/ \
  src/ \
  components/ \
  tokens/ \
  provably_fair.md \
  README.md \
  package.json \
  vite.config.ts \
  tailwind.config.js \
  postcss.config.js \
  tsconfig.json \
  migration.md \
  handoff-checklist.md
"

# Remove the old zip file if it exists
rm -f $OUTPUT_FILE

# Create the new zip file
zip -r $OUTPUT_FILE $FILES_TO_INCLUDE

echo "Handoff package created: $OUTPUT_FILE"
