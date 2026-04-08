@echo off
REM AxioTools Installation Script for Windows

echo.
echo ======================================
echo ^|  ^!AxioTools Installation Script     ^|
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js is not installed. Please install Node.js 14+ first.
    echo   Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js and npm found
echo.

REM Install Backend
echo Installing Backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo X Backend installation failed
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
cd ..

REM Install Frontend
echo.
echo Installing Frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo X Frontend installation failed
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..

echo.
echo ======================================
echo [OK] Installation Complete!
echo ======================================
echo.
echo To start the application:
echo.
echo   Terminal 1 (Backend^):
echo   ^> cd backend
echo   ^> npm run dev
echo.
echo   Terminal 2 (Frontend^):
echo   ^> cd frontend
echo   ^> npm start
echo.
echo The frontend will open at http://localhost:3000
echo Backend API at http://localhost:5000
echo.
pause
