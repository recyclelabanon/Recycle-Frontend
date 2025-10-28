import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Recycle-Lebanon-Logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "About",
      fullName: "Founding Roots",
      description: "About Us & Team",
      submenu: [
        { name: "About Us", path: "/about" },
        { name: "Team", path: "/team" },
      ],
    },
    {
      name: "Programmes",
      fullName: "Ecological Programmes",
      description: "Initiatives",
      path: "/initiatives",
    },
    {
      name: "Media",
      fullName: "Whispering Winds",
      description: "News & Blogs",
      submenu: [
        { name: "News", path: "/news" },
        { name: "Blog", path: "/blog" },
      ],
    },
    { name: "Events", fullName: "Time Trail", description: "Calendar & Events", path: "/events" },
    { name: "Contact", fullName: "Sow a Connection", description: "Contact Us", path: "/contacts" },
    { name: "Donate", fullName: "Grow a Tree", description: "Donate", path: "/donate" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-sm transition-all duration-300">
      <div className="w-full px-4 sm:px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <div className="relative h-10 w-auto flex-shrink-0">
              <img src={logo} alt="Recycle Lebanon" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-xl">Recycle Lebanon</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {/* Main Button */}
                <button
                  onClick={() => !item.submenu && handleNavigation(item.path)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-1 relative
                    ${
                      isActive(item.path)
                        ? "text-[#2726CC] bg-[#2726CC]/10 font-medium"
                        : "text-gray-700 hover:text-[#2726CC] hover:bg-[#2726CC]/10"
                    }`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />}
                </button>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div
                    className={`absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-44 transform transition-all duration-300 origin-top
                      ${
                        openDropdown === item.name
                          ? "opacity-100 scale-100 translate-y-0 visible"
                          : "opacity-0 scale-95 -translate-y-2 invisible"
                      }`}
                  >
                    {item.submenu.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => handleNavigation(sub.path)}
                        className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#2726CC]/10 hover:text-[#2726CC] transition-colors duration-200 ${
                          isActive(sub.path) ? "text-[#2726CC]" : ""
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#2726CC] focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 w-full">
            {navItems.map((item, index) => (
              <div key={index}>
                <div
                  onClick={() =>
                    item.submenu
                      ? setOpenDropdown(openDropdown === item.name ? null : item.name)
                      : handleNavigation(item.path)
                  }
                  className={`flex justify-between items-center px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-[#2726CC]/10 text-[#2726CC]"
                      : "text-gray-700 hover:bg-[#2726CC]/10 hover:text-[#2726CC]"
                  }`}
                >
                  <div className="font-medium">{item.name}</div>
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.submenu && (
                  <div
                    className={`ml-6 border-l border-gray-200 pl-4 space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${
                      openDropdown === item.name ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.submenu.map((sub, i) => (
                      <div
                        key={i}
                        onClick={() => handleNavigation(sub.path)}
                        className={`block py-2 text-sm cursor-pointer transition-colors duration-300 ${
                          isActive(sub.path)
                            ? "text-[#2726CC]"
                            : "text-gray-600 hover:text-[#2726CC]"
                        }`}
                      >
                        {sub.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
