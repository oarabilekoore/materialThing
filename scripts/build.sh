#!/bin/bash

# MaterialThing Framework Release Script

set -e

echo "🚀 Starting MaterialThing release process..."

# Clean all packages
echo "🧹 Cleaning previous builds..."
npm run clean

# Build all packages
echo "🔨 Building all packages..."
npm run build

# Run tests (when you add them)
echo "🧪 Running tests..."
# npm run test

# Version packages
echo "📦 Versioning packages..."
npm run version-packages

# Publish to NPM
echo "🚀 Publishing to NPM..."
npm run release

echo "✅ Release complete!"
