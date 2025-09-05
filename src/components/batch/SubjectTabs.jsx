import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, FileText, Award, Download, ExternalLink } from 'lucide-react';

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

interface SubjectTabsProps {
  currentUser: User | null;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({ currentUser }) => {
  const [activeSubject, setActiveSubject] = useState('Mathematics');

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Computer Science',
    'English',
    'Environmental Science'
  ];

  const subjectData = {
    'Mathematics': {
      leaderboard: [
        { rank: 1, name: 'Aisha Patel', rollNo: 'CS2023005', marks: 480, total: 500, photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { rank: 2, name: 'Rahul Singh', rollNo: 'CS2023012', marks: 465, total: 500, photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { rank: 3, name: 'Rajesh Kumar', rollNo: 'CS2023001', marks: 445, total: 500, photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', isCurrentUser: true }
      ],
      performance: [
        { test: 'Test 1', marks: 85, maxMarks: 100 },
        { test: 'Test 2', marks: 78, maxMarks: 100 },
        { test: 'Test 3', marks: 92, maxMarks: 100 },
        { test: 'Test 4', marks: 88, maxMarks: 100 },
        { test: 'Test 5', marks: 90, maxMarks: 100 }
      ],
      materials: [
        { id: 1, title: 'Calculus Chapter 1-3 Notes', type: 'PDF', size: '2.4 MB', uploadDate: '2025-01-10' },
        { id: 2, title: 'Linear Algebra Practice Problems', type: 'PDF', size: '1.8 MB', uploadDate: '2025-01-08' },
        { id: 3, title: 'Differential Equations Guide', type: 'PDF', size: '3.2 MB', uploadDate: '2025-01-05' }
      ],
      results: [
        { id: 1, testName: 'Unit Test 1', date: '2025-01-15', marks: 85, total: 100, grade: 'A' },
        { id: 2, testName: 'Unit Test 2', date: '2025-01-08', marks: 78, total: 100, grade: 'B+' },
        { id: 3, testName: 'Unit Test 3', date: '2025-01-01', marks: 92, total: 100, grade: 'A+' }
      ]
    }
  };

  const currentSubjectData = subjectData['Mathematics']; // Using Mathematics data for all subjects in demo

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 2: return <Award className="w-4 h-4 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 text-amber-600" />;
      default: return <span className="text-sm font-semibold text-gray-600">#{rank}</span>;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Subject Tabs */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setActiveSubject(subject)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeSubject === subject
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Leaderboard */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-800">{activeSubject} Leaderboard</h3>
          </div>
          <div className="space-y-3">
            {currentSubjectData.leaderboard.map((student) => (
              <div
                key={student.rollNo}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  student.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6">
                  {getRankIcon(student.rank)}
                </div>
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{student.name}</span>
                    {student.isCurrentUser && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">You</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{student.rollNo}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{student.marks}/{student.total}</div>
                  <div className="text-xs text-gray-500">{((student.marks / student.total) * 100).toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Graph */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Your Performance</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentSubjectData.performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="test" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="marks"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts and Materials */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Posts & Materials</h3>
          </div>
          <div className="space-y-3">
            {currentSubjectData.materials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-800">{material.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>{material.type}</span>
                    <span>•</span>
                    <span>{material.size}</span>
                    <span>•</span>
                    <span>Uploaded {material.uploadDate}</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">Test Results</h3>
          </div>
          <div className="space-y-3">
            {currentSubjectData.results.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-800">{result.testName}</h4>
                  <p className="text-xs text-gray-500 mt-1">{result.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold text-sm">{result.marks}/{result.total}</div>
                    <div className="text-xs text-gray-500">{((result.marks / result.total) * 100).toFixed(1)}%</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectTabs;