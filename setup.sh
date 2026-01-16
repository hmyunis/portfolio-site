#!/bin/bash

echo "🚀 Setting up portfolio site..."

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Don't forget to add your Web3Forms access key to .env"
else
    echo "✓ .env file already exists"
fi

# Copy site data files
if [ ! -f src/data/siteData.json ]; then
    echo "📝 Creating siteData.json from example..."
    cp src/data/siteData.example.json src/data/siteData.json
    echo "⚠️  Don't forget to update src/data/siteData.json with your personal information"
else
    echo "✓ siteData.json already exists"
fi

# Copy projects file
if [ ! -f src/data/projects.json ]; then
    echo "📝 Creating projects.json from example..."
    cp src/data/projects.example.json src/data/projects.json
    echo "⚠️  Don't forget to update src/data/projects.json with your projects"
else
    echo "✓ projects.json already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your Web3Forms access key"
echo "2. Edit src/data/siteData.json with your personal information"
echo "3. Edit src/data/projects.json with your projects"
echo "4. Run 'npm run dev' to start the development server"
