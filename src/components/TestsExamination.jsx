import React, { useState } from 'react';
import { FileText, Clock, Play, Calendar, BookOpen } from 'lucide-react';

const TestsExamination = ({ user }) => {
  const [activeTab, setActiveTab] = useState('tests');

  const upcomingTests = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Calculus Unit Test',
      date: '2025-01-25',
      time: '10:00 AM',
      duration: '2 hours',
      totalMarks: 100,
      topics: ['Derivatives', 'Integration', 'Limits']
    },
    {
      id: 2,
      subject: 'Physics',
      title: 'Quantum Mechanics Quiz',
      date: '2025-01-28',
      time: '2:00 PM',
      duration: '1 hour',
      totalMarks: 50,
      topics: ['Wave Functions', 'Uncertainty Principle']
    },
    {
      id: 3,
      subject: 'Chemistry',
      title: 'Organic Chemistry Test',
      date: '2025-01-30',
      time: '11:00 AM',
      duration: '90 minutes',
      totalMarks: 75,
      topics: ['Alkanes', 'Alkenes', 'Aromatic Compounds']
    }
  ];

  const liveTests = [
    {
      id: 1,
      subject: 'Computer Science',
      title: 'Data Structures Assessment',
      timeRemaining: '45 minutes',
      totalMarks: 100,
      questionsCount: 25,
      isActive: true
    },
    {
      id: 2,
      subject: 'English',
      title: 'Literature Analysis',
      timeRemaining: 'Not started',
      totalMarks: 80,
      questionsCount: 20,
      isActive: false
    }
  ];

  const upcomingExams = [
    {
      id: 1,
      title: 'Mid-term Examination',
      date: '2025-02-15',
      time: '9:00 AM',
      duration: '3 hours',
      subjects: ['Mathematics', 'Physics', 'Chemistry'],
      venue: 'Main Hall A'
    },
    {
      id: 2,
      title: 'Semester Final Exam',
      date: '2025-05-10',
      time: '9:00 AM',
      duration: '4 hours',
      subjects: ['All Subjects'],
      venue: 'Examination Center'
    }
  ];

  const handleStartTest = (testId) => {
    alert(`Starting test ${testId}... This would redirect to the test interface.`);
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Physics': 'bg-green-100 text-green-800',
      'Chemistry': 'bg-yellow-100 text-yellow-800',
      'Computer Science': 'bg-purple-100 text-purple-800',
      'English': 'bg-pink-100 text-pink-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tests & Examination</h1>
          <p className="text-gray-600">Manage your tests and examinations</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'tests'
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                : 'bg-purple-100 text-black-700 hover:bg-purple-200'
          }`}
        >
          Tests
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'exams'
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md'
              : 'bg-purple-100 text-black-700 hover:bg-yellow-300'
          }`}
        >
          Examinations
        </button>
      </div>

      {activeTab === 'tests' && (
        <div className="space-y-6">
          {/* Upcoming Tests */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Tests</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {upcomingTests.map((test) => (
                <div key={test.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(test.subject)}`}>
                      {test.subject}
                    </span>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-800">{test.date}</div>
                      <div className="text-xs text-gray-500">{test.time}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{test.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{test.duration} • {test.totalMarks} marks</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Topics:</h4>
                    <div className="flex flex-wrap gap-1">
                      {test.topics.map((topic) => (
                        <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Tests */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Play className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Live Tests</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {liveTests.map((test) => (
                <div key={test.id} className={`rounded-lg border p-6 transition-all duration-200 ${
                  test.isActive ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(test.subject)}`}>
                      {test.subject}
                    </span>
                    {test.isActive && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full animate-pulse">
                        Live
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{test.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{test.questionsCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Marks:</span>
                      <span className="font-medium">{test.totalMarks}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time Remaining:</span>
                      <span className={`font-medium ${test.isActive ? 'text-orange-600' : 'text-gray-700'}`}>
                        {test.timeRemaining}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleStartTest(test.id)}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      test.isActive
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {test.isActive ? 'Resume Test' : 'Start Test'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'exams' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Main Examinations</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{exam.date} at {exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Duration: {exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Venue: {exam.venue}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects:</h4>
                  <div className="flex flex-wrap gap-1">
                    {exam.subjects.map((subject) => (
                      <span key={subject} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
                  View Exam Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsExamination;