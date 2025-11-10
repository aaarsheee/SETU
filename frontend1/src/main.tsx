import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);