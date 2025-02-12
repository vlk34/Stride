import React from "react";
import { Link } from "react-router";
import photo from "../../assets/photo.jpg";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </div>

          <Link to="/profile" className="flex items-center space-x-3">
            <div className="text-gray-700 hover:text-gray-900">
              Volkan Erdoğan
            </div>
            <img
              src={photo}
              alt="Profile photo"
              className="w-8 h-8 rounded-full object-cover"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
