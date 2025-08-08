# P-SETU: Sign Language Learning Platform

A complete web application that helps users learn and practice sign language using real-time hand detection and machine learning.

## 🚀 Features

- **Real-time Hand Detection**: Uses MediaPipe for accurate hand tracking
- **Sign Recognition**: Custom ML model for gesture classification
- **Interactive Learning**: Video lessons categorized by difficulty
- **Community Features**: Share posts and learn together
- **Privacy-First**: All video processing happens locally

## 🏗️ Architecture

```
p-setu-app/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # FastAPI + Python
├── ml-model/          # MediaPipe + Custom ML model
└── docs/              # Documentation
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: FastAPI, Python 3.9+, Uvicorn
- **ML/AI**: MediaPipe, TensorFlow/PyTorch, OpenCV
- **Database**: SQLite (development), PostgreSQL (production)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Git

### Setup Instructions

1. **Clone and Setup**
   ```bash
   git clone <your-repo>
   cd p-setu-app
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **ML Model Setup**
   ```bash
   cd ml-model
   pip install -r requirements.txt
   python train_model.py
   ```

## 📁 Project Structure

### Frontend (`/frontend`)
- React components for all pages
- Real-time webcam integration
- Responsive Tailwind CSS styling
- API integration with backend

### Backend (`/backend`)
- FastAPI REST API
- Sign prediction endpoints
- Lesson management
- User authentication (optional)

### ML Model (`/ml-model`)
- MediaPipe hand detection
- Custom gesture classification
- Model training scripts
- Preprocessing utilities

## 🎯 Pages/Modules

1. **Homepage** - Project intro and demo
2. **Detect Page** - Real-time sign detection
3. **Learn Page** - Video lessons by difficulty
4. **About Page** - Mission and team info
5. **Profile Page** - User dashboard (optional)
6. **Share Page** - Community posts (optional)

## 🔧 Development

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:8000`
- API documentation at `http://localhost:8000/docs`

## 📦 Deployment

- Frontend: Vercel/Netlify
- Backend: Railway/Render/AWS
- Database: PostgreSQL on cloud

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details
