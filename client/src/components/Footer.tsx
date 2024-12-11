import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">DailyDose</h3>
            <p className="text-gray-400 text-sm sm:text-base">Your daily source of inspiration and knowledge.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/blogs" className="text-gray-400 hover:text-white">All Blogs</Link></li>
              <li><Link to="/publish" className="text-gray-400 hover:text-white">Write Blog</Link></li>
              <li><Link to="/signin" className="text-gray-400 hover:text-white">Sign In</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Connect With Me</h4>
            <div className="flex justify-center md:justify-start space-x-6 sm:space-x-4">
              <a href="https://x.com/Rishabh79339764" target='_blank' className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://github.com/RishabhSkr" target='_blank' className="text-gray-400 hover:text-white">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/rishabh-sonkar" target='_blank' className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="https://portfolio-website-main-ten-iota.vercel.app" target='_blank' className="text-gray-400 hover:text-white">
                <i className="fas fa-briefcase text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-xs sm:text-sm text-gray-400">
            © 2024 DailyDose. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            Made with <span className="text-red-500">❤️</span> by Rishabh Sonkar
          </p>
        </div>
      </div>
    </footer>
  );
};
