#!/bin/bash

echo "🚀 Setting up PDF Analyzer Service..."

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📚 Installing Python packages..."
pip install -r requirements.txt

# Download spaCy model
echo "🧠 Downloading spaCy English model..."
python -m spacy download en_core_web_sm

echo "✅ Setup complete!"
echo ""
echo "To start the PDF Analyzer Service:"
echo "1. cd pdf-analyzer-service"
echo "2. source venv/bin/activate"
echo "3. python main.py"
echo ""
echo "The service will be available at: http://127.0.0.1:8001"