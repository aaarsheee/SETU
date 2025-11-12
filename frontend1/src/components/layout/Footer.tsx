import { Link } from "react-router-dom";
import { Hand, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
  <img 
    src="images/logo.png"  // place your logo file in public/logo.png
    alt="P-SETU Logo" 
    className="w-10 h-10 rounded-xl"
  />
  <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    P-SETU
  </span>
</Link>
            <p className="text-muted-foreground">
              Empowering the deaf and mute community through AI-powered sign language learning and detection.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground">
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/learn" className="text-muted-foreground hover:text-primary transition-colors">
                  Learn Signs
                </Link>
              </li>
              <li>
                <Link to="/detect" className="text-muted-foreground hover:text-primary transition-colors">
                  Detect Signs
                </Link>
              </li>
              <li>
                <Link to="/feed" className="text-muted-foreground hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info.psetu@gmail.com</span>
              </div>
              {["+977 9860201408", "+977 9812345678", "+977 9845678901"].map((num) => (
      <div key={num} className="flex items-center space-x-3">
        <Phone className="w-4 h-4" />
        <a href={`tel:${num}`} className="text-sm hover:text-primary transition-colors">
          {num}
        </a>
      </div>
    ))}
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 P-SETU. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.336-1.297C4.325 14.895 3.8 13.744 3.8 12.447c0-1.297.525-2.448 1.313-3.336.888-.807 2.039-1.297 3.336-1.297 1.297 0 2.448.49 3.336 1.297.807.888 1.297 2.039 1.297 3.336 0 1.297-.49 2.448-1.297 3.336-.888.807-2.039 1.297-3.336 1.297zm0-7.474c-.98 0-1.837.357-2.571 1.071-.714.714-1.071 1.592-1.071 2.571 0 .98.357 1.837 1.071 2.571.734.714 1.592 1.071 2.571 1.071.98 0 1.837-.357 2.571-1.071.714-.734 1.071-1.592 1.071-2.571 0-.98-.357-1.837-1.071-2.571-.734-.714-1.592-1.071-2.571-1.071zm7.474 0c-.98 0-1.837.357-2.571 1.071-.714.714-1.071 1.592-1.071 2.571 0 .98.357 1.837 1.071 2.571.734.714 1.592 1.071 2.571 1.071.98 0 1.837-.357 2.571-1.071.714-.734 1.071-1.592 1.071-2.571 0-.98-.357-1.837-1.071-2.571-.734-.714-1.592-1.071-2.571-1.071z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
