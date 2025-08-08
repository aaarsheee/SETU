# Running P-SETU Application

## Quick Start (Easiest Method)

**Double-click `start-app.bat`** in the main project folder to start both frontend and backend automatically.

## Manual Start (Step by Step)

### Method 1: Using Batch Scripts

1. **Start Backend:**
   - Navigate to `backend` folder
   - Double-click `start.bat`
   - Wait for "Application startup complete" message

2. **Start Frontend:**
   - Navigate to `frontend` folder  
   - Double-click `start.bat`
   - Wait for server to start

### Method 2: Using Command Line

#### Terminal 1 - Backend (FastAPI)
```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal 2 - Frontend (React)
```bash
cd frontend
npm run dev
```

## Access Your Application

Once both servers are running:

- **Frontend (Web App)**: http://localhost:5173
- **Backend API Documentation**: http://localhost:8000/docs
- **Backend API**: http://localhost:8000

## Application Features

### Available Pages:
1. **Home** (`/`) - Project introduction and demo
2. **Detect** (`/detect`) - Real-time sign language detection
3. **Learn** (`/learn`) - Video lessons by difficulty level
4. **About** (`/about`) - Project mission and team
5. **Profile** (`/profile`) - User dashboard and progress
6. **Share** (`/share`) - Community posts and sharing

### API Endpoints:
- `GET /api/lessons` - Get all lessons
- `POST /api/detect/predict` - Predict sign from image
- `GET /api/user/progress` - Get user progress
- `GET /api/model/info` - Get ML model information

## Troubleshooting

### Backend Issues:
- **Port 8000 in use**: Change port in `main.py` or kill existing process
- **Virtual environment not activated**: Run `venv\Scripts\activate` first
- **Missing dependencies**: Run `pip install -r requirements.txt`

### Frontend Issues:
- **Port 5173 in use**: Vite will automatically suggest another port
- **Missing dependencies**: Run `npm install` in frontend folder
- **Build errors**: Check console for specific error messages

### Common Solutions:
1. **Restart servers**: Close terminal windows and restart
2. **Clear cache**: Delete `node_modules` and run `npm install` again
3. **Check ports**: Ensure 5173 and 8000 are available

## Development Workflow

1. **Make changes** to code
2. **Servers auto-reload** (no restart needed)
3. **Frontend**: Changes appear immediately
4. **Backend**: FastAPI auto-reloads on file changes

## Stopping the Application

- Close both terminal windows
- Or press `Ctrl+C` in each terminal

## Next Steps

1. **Test the app** by opening http://localhost:5173
2. **Try the detection page** to test webcam functionality  
3. **Check API docs** at http://localhost:8000/docs
4. **Add ML model integration** in the `ml-model` folder

## Need Help?

- Check browser console for frontend errors
- Check terminal output for backend errors
- API documentation: http://localhost:8000/docs
