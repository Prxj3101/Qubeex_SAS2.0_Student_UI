import React from 'react';
import { Users, BookOpen } from 'lucide-react';
import BatchStudents from './batch/BatchStudents';
import SubjectTabs from './batch/SubjectTabs';

const BatchSubjects = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Batch & Subjects</h1>
          <p className="text-gray-600">View your batch details and subject-wise performance</p>
        </div>
      </div>

      {/* Batch Students Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Batch: {user?.batch}</h2>
        </div>
        <BatchStudents currentUser={user} />
      </div>

      {/* Subjects Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-800">Subjects</h2>
        </div>
        <SubjectTabs currentUser={user} />
      </div>
    </div>
  );
};

export default BatchSubjects;