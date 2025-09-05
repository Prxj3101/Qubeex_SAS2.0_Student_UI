import React from 'react'; // Removed unused useState
import { Calendar, Trophy, Bell, TrendingUp } from 'lucide-react';
// Corrected paths for sibling components
import CalendarComponent from './dashboard/CalendarComponent';
import FeedSection from './dashboard/FeedSection'
import Leaderboard from './dashboard/Leaderboard';

// ... rest of your code remains the same

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

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50">
            <span className="text-sm text-gray-600">Batch: </span>
            <span className="font-semibold text-gray-800">{user?.batch}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Academic Calendar</h2>
            </div>
            <CalendarComponent />
          </div>
        </div>

        {/* Feed Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-800">Announcements & Feed</h2>
            </div>
            <FeedSection />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-800">Overall Leaderboard</h2>
          </div>
          <Leaderboard />
        </div>

        {/* Quick Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800">Quick Overview</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-blue-800">Overall Score</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-green-800">Tests Completed</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-purple-800">Pending Assignments</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">92%</div>
              <div className="text-sm text-yellow-800">Attendance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;