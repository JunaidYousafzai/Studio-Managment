  import React, { useState } from "react";
  import { NavLink, useNavigate } from "react-router";
  import { motion, AnimatePresence } from "framer-motion";
  import { IconMenu2, IconX } from "@tabler/icons-react";
  import { useAuth } from "../context/AuthContextProvider";

  export const Navbar = ({ className }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const navItems = [
      { name: "Boards", link: "/boards", protected: true },
      { name: "Profile", link: "/profile", protected: true },
      { name: "About", link: "/about", protected: false },
      { name: "Contact", link: "/contact", protected: false },
    ];

    const filteredItems = navItems.filter(item => !item.protected || user?.email);

    return (
      <div className={`sticky text-white inset-x-0 top-0 z-40 w-full ${className}`}>
        <motion.div
          className="relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full  px-4 py-2 lg:flex backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NavLink
            to="/"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl font-medium text-white">Studio Managment</span>
          </NavLink>

          <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex lg:space-x-2">
            {filteredItems.map((item, idx) => (
              <NavLink
                key={`link-${idx}`}
                to={item.link}
                className="relative px-4 py-2 text-neutral-600"
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {hoveredItem === idx && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
                  />
                )}
                <span className="relative z-20">{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="ml-auto">
            {user?.email ? (
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 rounded-md bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              >
                Profile
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md  bg-gradient-to-r from-cyan-500 to-pink-600  text-white text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              >
                Sign In
              </button>
            )}
          </div>
        </motion.div>


        <div className="relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between  px-4 py-2 rounded-lg lg:hidden backdrop-blur-md">
          <div className="flex w-full flex-row items-center justify-between">
            <NavLink
              to="/"
              className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-10 h-10 text-white  p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </NavLink>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden "
              >
                <div className="flex flex-col items-start  gap-4 py-4">
                  {filteredItems.map((item, idx) => (
                    <NavLink
                      key={`mobile-link-${idx}`}
                      to={item.link}
                      className="w-full px-4 py-2 text-neutral-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <div className="w-full px-4 py-2">
                    {user?.email ? (
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full block px-4 py-2 rounded-md bg-black text-white text-sm font-bold text-center"
                      >
                        Profile
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          navigate("/login");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full block px-4 py-2 rounded-md  bg-gradient-to-r from-cyan-500 to-pink-600 text-white  text-sm font-bold text-center"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };