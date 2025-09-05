import React, { useState } from 'react';
import { User, Trophy, TrendingUp, Calendar, Flag, Award, Upload } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  batch: string;
  division: string;
  age: number;
  photo: string;
}

interface YourProfileProps {
  user: UserProfile | null;
}

const YourProfile: React.FC<YourProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'achievements'>('overview');

  const overallPerformanceData = [
    { subject: 'Math', marks: 89 },
    { subject: 'Physics', marks: 76 },
    { subject: 'Chemistry', marks: 84 },
    { subject: 'CS', marks: 92 },
    { subject: 'English', marks: 78 },
    { subject: 'Env. Sci', marks: 85 }
  ];

  const attendanceData = [
    { month: 'Sep', attendance: 95 },
    { month: 'Oct', attendance: 88 },
    { month: 'Nov', attendance: 92 },
    { month: 'Dec', attendance: 90 },
    { month: 'Jan', attendance: 94 }
  ];

  const flags = [
    {
      id: 1,
      type: 'warning',
      title: 'Late Submission',
      subject: 'Physics',
      date: '2025-01-15',
      description: 'Assignment submitted 2 days after deadline'
    },
    {
      id: 2,
      type: 'complaint',
      title: 'Behavior Issue',
      subject: 'General',
      date: '2025-01-10',
      description: 'Disruption during class discussion'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Top Performer',
      subject: 'Computer Science',
      description: 'Scored highest in Data Structures exam',
      date: '2025-01-12',
      badge: 'gold'
    },
    {
      id: 2,
      title: 'Perfect Attendance',
      subject: 'Overall',
      description: 'Maintained 100% attendance for September',
      date: '2024-09-30',
      badge: 'blue'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Web Application',
      description: 'Full-stack web application built with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB'],
      date: '2025-01-08',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Machine Learning Model',
      description: 'Predictive model for student performance analysis',
      tech: ['Python', 'Scikit-learn', 'Pandas'],
      date: '2024-12-15',
      status: 'ongoing'
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'blue': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFlagColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'complaint': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-600">View and manage your profile information</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={user?.photo}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Roll Number:</span>
                <span className="ml-2 font-semibold text-gray-800">{user?.rollNo}</span>
              </div>
              <div>
                <span className="text-gray-600">Batch:</span>
                <span className="ml-2 font-semibold text-gray-800">{user?.batch}</span>
              </div>
              <div>
                <span className="text-gray-600">Division:</span>
                <span className="ml-2 font-semibold text-gray-800">{user?.division}</span>
              </div>
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="ml-2 font-semibold text-gray-800">{user?.age} years</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-semibold text-gray-800">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'metrics', label: 'Profile Metrics', icon: TrendingUp },
          { id: 'achievements', label: 'Projects & Achievements', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">#4</div>
                  <div className="text-sm text-blue-800">Overall Ranking</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">88.5%</div>
                  <div className="text-sm text-green-800">Average Score</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-purple-800">Attendance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Test Completed</h4>
                    <p className="text-sm text-gray-600">Scored 92/100 in Mathematics Unit Test</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Assignment Submitted</h4>
                    <p className="text-sm text-gray-600">Physics Lab Report uploaded successfully</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Achievement Unlocked</h4>
                    <p className="text-sm text-gray-600">Top Performer in Computer Science</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Performance */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overallPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="marks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Trend */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Flags Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">Flags & Complaints</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flags.map((flag) => (
                <div key={flag.id} className={`p-4 rounded-lg border ${getFlagColor(flag.type)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{flag.title}</h4>
                    <span className="text-xs">{flag.date}</span>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{flag.description}</p>
                  <span className="text-xs font-medium">Subject: {flag.subject}</span>
                </div>
              ))}
            </div>
            {flags.length === 0 && (
              <p className="text-center text-gray-500 py-8">No flags or complaints recorded</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
              </div>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(achievement.badge)}`}>
                        {achievement.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Subject: {achievement.subject}</span>
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                Add Achievement
              </button>
            </div>

            {/* Projects */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{project.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">{project.date}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourProfile;