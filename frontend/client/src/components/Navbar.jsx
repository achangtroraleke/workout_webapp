import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { user, logoutUser } = useContext(AuthContext)
  

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#f2f2f2]/70 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="text-xl font-semibold text-gray-900">
            IronLad
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to={'/home'} className="text-gray-600 hover:text-black transition">
              Home
            </Link>
   
            <Link to={'/workout/'} className="text-gray-600 hover:text-black transition">
              Workouts
            </Link>
            {user?
            <button onClick={logoutUser} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-300 transition">
                        Logout
            </button>:<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-300 transition">
                        Login
            </button>}
            
          
          </div>

          {/* Mobile Button X Button*/}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer md:hidden relative w-8 h-8 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span
              className={`absolute h-0.5 w-8 bg-black transform transition duration-300 ${
                isOpen ? "rotate-45 top-4" : "top-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-8 bg-black transition-all duration-300 ${
                isOpen ? "opacity-0" : "top-4"
              }`}
            />
            <span
              className={`absolute h-0.5 w-8 bg-black transform transition duration-300 ${
                isOpen ? "-rotate-45 top-4" : "top-6"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 space-y-4 bg-white border-t border-gray-200">
          <a href="#" className="block text-gray-600 hover:text-black">
            Home
          </a>
          <a href="#" className="block text-gray-600 hover:text-black">
            Features
          </a>
          <a href="#" className="block text-gray-600 hover:text-black">
            Pricing
          </a>
          <Link to={'/workout/'} className="block text-gray-600 hover:text-black">
            Workouts
          </Link>
          {user?
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
            Logout
          </button>
          :
         
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
            Get Started
          </button> 
          }
        </div>
      </div>
    </nav>
  );
}
