import { Avatar } from "./BlogCards";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const AppBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (name) setUsername(name);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("userId");
      setIsAuthenticated(!!token);
      if (name) setUsername(name);
    };
    
    checkAuth();
  }, [location]); // Re-run when location changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <div className=" border-b flex justify-between px-10 h-16 items-center fixed top-0 left-0 right-0 bg-white/75 backdrop-blur-sm z-50">
      <Link to={"/"}>
        <div className="text-2xl font-bold">DailyDose</div>
      </Link>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to={`/blogs`}>
              <button
                type="button"
                className="mt-3 text-slate-800  hover:bg-slate-400 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Show Blogs
              </button>
            </Link>
            <Link to={`/publish`}>
              <button
                type="button"
                className="mt-3 text-white  bg-slate-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                New
              </button>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Avatar name={userName} size="big" />
                {showDropdown && (
                  <div className="absolute right-0 top-12 w-48 bg-white border rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">{userName}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button className="font-semibold text-slate-800 hover:text-gray-600">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className=" bg-slate-600 hover:bg-green-800 text-white px-4 py-2 rounded-full">
                Get Started
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
