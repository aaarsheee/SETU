@echo off
echo ========================================
echo       P-SETU Sign Language App
echo ========================================
echo.
echo This will start both frontend and backend servers
echo - Frontend: http://localhost:5173
echo - Backend API: http://localhost:8000
echo - API Docs: http://localhost:8000/docs
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

echo.
echo Starting backend server...
start "P-SETU Backend" cmd /k "cd backend && start.bat"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting frontend server...
start "P-SETU Frontend" cmd /k "cd frontend && start.bat"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:8000/docs
echo.
echo Close the terminal windows to stop the servers.
echo ========================================
