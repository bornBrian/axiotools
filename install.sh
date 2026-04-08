#!/bin/bash

# AxioTools Installation Script for macOS/Linux

echo "🚀 AxioTools Installation Script"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version) found"
echo "✓ npm $(npm --version) found"
echo ""

# Install Backend
echo "📦 Installing Backend..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✓ Backend dependencies installed"
else
    echo "❌ Backend installation failed"
    exit 1
fi
cd ..

# Install Frontend
echo ""
echo "📦 Installing Frontend..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✓ Frontend dependencies installed"
else
    echo "❌ Frontend installation failed"
    exit 1
fi
cd ..

echo ""
echo "================================="
echo "✅ Installation Complete!"
echo ""
echo "🚀 To start the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd backend"
echo "   $ npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ cd frontend"
echo "   $ npm start"
echo ""
echo "The frontend will open at http://localhost:3000"
echo "Backend API at http://localhost:5000"
