#!/usr/bin/env python3
"""Test Google AI image generation capabilities."""
import os
import google.generativeai as genai

# Configure API
api_key = os.environ.get('GOOGLE_API_KEY')
if not api_key:
    print("ERROR: GOOGLE_API_KEY not found in environment")
    exit(1)

genai.configure(api_key=api_key)

# List available models
print("=== Available Models ===")
for model in genai.list_models():
    if 'image' in model.name.lower() or 'imagen' in model.name.lower():
        print(f"  {model.name}: {model.display_name}")
        print(f"    Supported methods: {model.supported_generation_methods}")
        print()

# Also check Gemini models for image generation
print("\n=== Gemini Models with generateContent ===")
for model in genai.list_models():
    if 'gemini' in model.name.lower() and 'generateContent' in model.supported_generation_methods:
        print(f"  {model.name}")
