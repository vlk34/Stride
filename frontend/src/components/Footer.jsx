import React from "react";
import { Link, useNavigate } from "react-router";
import { useClerk } from "@clerk/clerk-react";
import {
  Compass,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Globe,
  Settings,
  HelpCircle,
} from "lucide-react";

const FooterSection = ({ title, children }) => (
  <div className="mb-8 md:mb-0">
    <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">{title}</h3>
    {children}
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openUserProfile } = useClerk();
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Company Info */}
          <FooterSection title="About Stride">
            <div className="flex items-center space-x-2 mb-4">
              <Compass className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-semibold text-white">Stride</span>
            </div>
            <p className="text-sm mb-6">
              Empowering careers through innovative job matching and seamless
              application processes. Connect with opportunities that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </FooterSection>

          {/* For Job Seekers */}
          <FooterSection title="Help & Support">
            <ul>
              <li className="mb-2"><Link to="/profile" className="hover:text-blue-400 transition-colors">Create Profile</Link></li>
              <li className="mb-2"><Link to="/search" className="hover:text-blue-400 transition-colors">Browse Jobs</Link></li>
              <li className="mb-2"><Link to="/jobs" className="hover:text-blue-400 transition-colors">Saved Jobs</Link></li>
              <li className="mb-2"><Link to="/messages" className="hover:text-blue-400 transition-colors">Messages</Link></li>
            </ul>
          </FooterSection>

          {/* Settings & Privacy */}
          <FooterSection title="Settings & Privacy">
            <ul>
              <li className="mb-2">
                <button 
                  onClick={openUserProfile} 
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Account Settings
                </button>
              </li>
              <li className="mb-2"><Link to="/help" className="hover:text-blue-400 transition-colors">Help & FAQ</Link></li>
              <li className="mb-2"><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title="Contact Us">
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <span>support@stride.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                <span>+90 (212) 555-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                <span>Istanbul, Turkey</span>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                <span>www.stride.com</span>
              </li>
            </ul>
          </FooterSection>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © {currentYear} Stride. All rights reserved.
            </div>
            <div className="text-xs text-gray-500">
              Designed and developed with ❤️ in Istanbul
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
