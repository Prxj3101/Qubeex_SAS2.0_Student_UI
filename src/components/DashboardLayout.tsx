import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ClipboardList, 
  User, 
  LogOut,
  GraduationCap
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  batch: string;
  division: string;
  age: number;
  photo: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/batch-subjects', label: 'Your Batch & Subjects', icon: Users },
    { path: '/tests-examination', label: 'Tests & Examination', icon: FileText },
    { path: '/assignments-submissions', label: 'Assignments & Submissions', icon: ClipboardList },
    { path: '/profile', label: 'Your Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200/50 shadow-lg z-10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">QubeEx</h1>
              <p className="text-sm text-gray-500">An AI powered SAS platform</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50">
          {user && (
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.rollNo}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;