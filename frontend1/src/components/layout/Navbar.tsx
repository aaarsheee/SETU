import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hand, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { LanguageSwitcher } from "../ui/language-switcher";
import { useLanguage } from "../../contexts/LanguageContext";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ isAuthenticated = false, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.learn"), path: "/learn", protected: true },
    { name: t("nav.detect"), path: "/detect"},
    { name: t("nav.feed"), path: "/feed", protected: true },
    { name: t("nav.donate"), path: "/donate" },
    { name: t("nav.about"), path: "/about" },
    { name: t("Contact"), path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.requiresAuth && !isAuthenticated) {
      e.preventDefault();
      // Redirect to login
      window.location.href = "/login";
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              src="/images/logo.png"
              alt="P-SETU Logo"
              whileHover={{ rotate: 1, scale: 1.05 }}
              className="w-10 h-10 rounded-xl object-cover"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              P-SETU
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.protected && !isAuthenticated) return null;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  } ${item.requiresAuth && !isAuthenticated ? "cursor-pointer" : ""}`}
                >
                  {item.name}
                
                  {isActivePath(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{t("nav.profile")}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center space-x-2 text-destructive hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("nav.logout")}</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="btn-hero">
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => {
                if (item.protected && !isAuthenticated) return null;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={(e) => {
                      handleNavClick(item, e);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 text-base font-medium transition-colors ${
                      isActivePath(item.path)
                        ? "text-primary bg-accent rounded-lg"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.requiresAuth && !isAuthenticated && (
                      <span className="text-warning">🔒</span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 space-y-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                     <LanguageSwitcher />
                     <Link
                       to="/profile"
                       onClick={() => setIsOpen(false)}
                       className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                     >
                       <User className="w-4 h-4" />
                       <span>{t("nav.profile")}</span>
                     </Link>
                     <button
                       onClick={() => {
                         onLogout?.();
                         setIsOpen(false);
                       }}
                       className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-destructive hover:text-destructive/80 w-full"
                     >
                       <LogOut className="w-4 h-4" />
                       <span>{t("nav.logout")}</span>
                     </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <LanguageSwitcher />
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t("nav.login")}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full btn-hero">
                        {t("nav.register")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
