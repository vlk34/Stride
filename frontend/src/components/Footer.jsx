import React from "react";
import { Link } from "react-router";
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
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-semibold text-white">Stride</span>
            </div>
            <p className="text-sm">
              Empowering careers through innovative job matching and seamless
              application processes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden sm:block">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search"
                  className="hover:text-blue-500 transition-colors"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="hover:text-blue-500 transition-colors"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-blue-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div className="hidden lg:block">
            <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/profile"
                  className="hover:text-blue-500 transition-colors"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="hover:text-blue-500 transition-colors"
                >
                  My Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/career-resources"
                  className="hover:text-blue-500 transition-colors"
                >
                  Career Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-blue-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>support@stride.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>San Francisco, CA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-500" />
                <span>www.stride.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-center md:text-left">
              © {currentYear} Stride. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link
                to="/terms"
                className="hover:text-blue-500 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="hover:text-blue-500 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/cookies"
                className="hover:text-blue-500 transition-colors"
              >
                Cookies
              </Link>
              <Link
                to="/accessibility"
                className="hover:text-blue-500 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
