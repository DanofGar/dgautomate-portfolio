#!/bin/bash

# Imagen 4.0 image generation script
# Usage: ./generate-image.sh "prompt" "output-filename.png" [aspect_ratio]
# aspect_ratio: "1:1", "16:9", "9:16", "3:4", "4:3" (default: 1:1)

PROMPT="$1"
OUTPUT="$2"
ASPECT="${3:-1:1}"

if [ -z "$PROMPT" ] || [ -z "$OUTPUT" ]; then
    echo "Usage: ./generate-image.sh \"prompt\" \"output-filename.png\" [aspect_ratio]"
    exit 1
fi

if [ -z "$GOOGLE_API_KEY" ]; then
    echo "Error: GOOGLE_API_KEY not set"
    exit 1
fi

# Create temp file for response
TEMP_RESPONSE=$(mktemp)

echo "Generating: $OUTPUT"
echo "Prompt: $PROMPT"
echo ""

curl -s -X POST \
    "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GOOGLE_API_KEY}" \
    -H "Content-Type: application/json" \
    -d "{
        \"instances\": [{\"prompt\": \"$PROMPT\"}],
        \"parameters\": {
            \"sampleCount\": 1,
            \"aspectRatio\": \"$ASPECT\"
        }
    }" > "$TEMP_RESPONSE"

# Check for error
if grep -q "error" "$TEMP_RESPONSE"; then
    echo "API Error:"
    cat "$TEMP_RESPONSE"
    rm "$TEMP_RESPONSE"
    exit 1
fi

# Extract base64 image and decode
IMAGE_DATA=$(cat "$TEMP_RESPONSE" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if 'predictions' in data and len(data['predictions']) > 0:
    print(data['predictions'][0].get('bytesBase64Encoded', ''))
else:
    print('')
")

if [ -z "$IMAGE_DATA" ]; then
    echo "No image data in response:"
    cat "$TEMP_RESPONSE"
    rm "$TEMP_RESPONSE"
    exit 1
fi

echo "$IMAGE_DATA" | base64 -d > "$OUTPUT"
rm "$TEMP_RESPONSE"

echo "Saved: $OUTPUT"
