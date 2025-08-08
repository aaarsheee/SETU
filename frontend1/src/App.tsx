import { useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import DetectPage from "./pages/DetectPage";
import FeedPage from "./pages/FeedPage";
import DonatePage from "./pages/DonatePage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import Failure from "./components/Failure";
import Success from "./components/Success";
import PaymentForm from "./components/PaymentForm";
import Contact from "./pages/ContactPage";
import { HandDetectionUI } from "./hooks/HandDetectionUI";


const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/detect" element={<DetectPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="*" element={<NotFound />} />
                <Route path='/pay'element={<PaymentForm />} />
                <Route path="/payment-success" element={<Success />} />
                <Route path="/payment-failure" element={<Failure />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
