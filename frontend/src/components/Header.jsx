import React from "react";
import { Link } from "react-router";
import { Compass, Search, Bookmark, Plus } from "lucide-react";
import photo from "../../assets/photo.jpg";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto py-3">
        <div className="flex items-center px-4">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">Stride</span>
          </Link>

          {/* Navigation Links - /search should go to the big search one like the welcoming search bar then to the Result.jsx one*/}
          <div className="flex items-center space-x-6 ml-8">
            <Link
              to="/search"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Search className="w-4 h-4" />
              <span>Seach Jobs</span>
            </Link>
            <Link
              to="/jobs"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Bookmark className="w-4 h-4" />
              <span>My Jobs</span>
            </Link>
            <Link
              to="/add-job"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
              <span>Add Job</span>
            </Link>
          </div>

          {/* Profile Section */}
          <Link
            to="/profile"
            className="flex items-center space-x-3 ml-auto border-l pl-6 border-gray-200"
          >
            <div className="text-gray-700 hover:text-gray-900 text-sm">
              Volkan E.
            </div>
            <img
              src={photo}
              alt="Profile photo"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
