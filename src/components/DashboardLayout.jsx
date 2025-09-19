import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

// Example icons (replace/add as needed)
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  User,
} from "lucide-react";

const DashboardLayout = ({ children, user, role, onLogout }) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  // Navigation items (student specific)
  const navigationItems = [
    { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
    { path: "/batch-subjects", name: "Your Batch & Subjects", icon: Users },
    { path: "/tests-examination", name: "Tests & Examination", icon: FileText },
    {
      path: "/assignments-submissions",
      name: "Assignments & Submissions",
      icon: ClipboardList,
    },
    { path: "/profile", name: "Your Profile", icon: User },
  ];

  const handleConfirmLogout = () => {
    onLogout();
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        {/* Left Side - Logo + Name + Tagline */}
        <div className="flex items-center space-x-3">
          <img src="/QubeExlogo.png" alt="QubeEx Logo" className="w-12 h-12" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-qube font-extrabold text-gray-700">
              QubeEx
            </h1>
            <p
              className="text-lg font-medium mt-0
                         bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
                         bg-200 bg-clip-text text-transparent animate-shine-gradient"
            >
              An AI-Powered SAS Platform
            </p>
          </div>
        </div>

        {/* Right Side - Role Tag + Logout */}
<div className="flex items-center space-x-4">
  <span
    className="px-4 py-1 text-lg font-bold rounded-full
               bg-purple-100 shadow-lg flex items-center space-x-2"
  >
    <span>
      {role === "SuperAdmin" ? "👑" : role === "Admin" ? "🏛️" : "🎓"}
    </span>
    <span
      className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
                 bg-200 bg-clip-text text-transparent animate-shine-gradient"
    >
      {role === "SuperAdmin"
        ? "SuperAdmin"
        : role === "Admin"
        ? "Admin"
        : "Student"}
    </span>
  </span>

  <button
    onClick={() => setShowModal(true)}
    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
  >
    <LogOut className="w-6 h-6" />
  </button>
</div>

      </header>

      <div className="flex pt-">
        {/* ===== SIDEBAR ===== */}
        <aside className="h-[calc(100vh-5rem)] w-64 bg-white text-gray-800 shadow-xl flex flex-col fixed left-0 top-30">
          <nav className="mt-6 px-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-purple-100 text-purple-700 shadow-md scale-[1.02] font-semibold"
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                      }`
                    }
                  >
                    <item.icon
                      className={`w-6 h-6 transition-colors duration-200 ${
                        location.pathname.startsWith(item.path)
                          ? "text-purple-600"
                          : "text-gray-600 group-hover:text-purple-600"
                      }`}
                    />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom User Profile (student style) */}
          <div className="p-6 border-t border-gray-200">
            {user && (
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.rollNo}
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="ml-64 flex-1 p-6">{children}</main>
      </div>

      {/* ===== Logout Confirmation Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Sign Out
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to sign out?
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
