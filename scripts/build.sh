#!/bin/bash

# MaterialThing Framework Release Script

set -e

echo "🚀 Starting MaterialThing release process..."

# Clean all packages
echo "🧹 Cleaning previous builds..."
bun run clean

# Build all packages
echo "🔨 Building all packages..."
bun run build

# Run tests (when you add them)
echo "🧪 Running tests..."
# bun run test

# Version packages
echo "📦 Versioning packages..."
bun run version-packages

# Publish to bun
echo "🚀 Publishing to bun..."
bun run release

echo "✅ Release complete!"
