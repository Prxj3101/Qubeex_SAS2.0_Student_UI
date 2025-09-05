import React, { useState } from 'react';
import { ClipboardList, Upload, Clock, CheckCircle, AlertCircle, File } from 'lucide-react';

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

interface AssignmentsSubmissionsProps {
  user: User | null;
}

const AssignmentsSubmissions: React.FC<AssignmentsSubmissionsProps> = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const liveAssignments = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Differential Equations Problem Set',
      description: 'Solve the given differential equations using various methods. Include step-by-step solutions and verify your answers.',
      dueDate: '2025-01-28',
      dueTime: '11:59 PM',
      totalMarks: 50,
      status: 'pending',
      questions: [
        'Solve: dy/dx = x²y',
        'Find the general solution of: y" - 4y\' + 4y = 0',
        'Solve the initial value problem: y\' + 2y = e^x, y(0) = 1'
      ]
    },
    {
      id: 2,
      subject: 'Physics',
      title: 'Quantum Mechanics Report',
      description: 'Write a detailed report on the applications of quantum mechanics in modern technology.',
      dueDate: '2025-01-30',
      dueTime: '5:00 PM',
      totalMarks: 75,
      status: 'submitted',
      questions: [
        'Explain the wave-particle duality',
        'Discuss quantum entanglement and its applications',
        'Analyze the role of quantum mechanics in computing'
      ]
    },
    {
      id: 3,
      subject: 'Chemistry',
      title: 'Organic Synthesis Lab Report',
      description: 'Prepare a comprehensive lab report on the organic synthesis experiment conducted in class.',
      dueDate: '2025-01-26',
      dueTime: '2:00 PM',
      totalMarks: 40,
      status: 'overdue',
      questions: [
        'Describe the synthesis procedure',
        'Analyze the reaction mechanism',
        'Calculate the yield and purity'
      ]
    }
  ];

  const submissions = [
    {
      id: 1,
      title: 'Project Presentation - Data Structures',
      subject: 'Computer Science',
      description: 'Present your implementation of advanced data structures with complexity analysis.',
      dueDate: '2025-02-05',
      dueTime: '3:00 PM',
      requirements: [
        'PowerPoint presentation (10-15 slides)',
        'Source code with documentation',
        'Complexity analysis report'
      ]
    },
    {
      id: 2,
      title: 'Research Paper - Environmental Impact',
      subject: 'Environmental Science',
      description: 'Submit a research paper on the environmental impact of renewable energy sources.',
      dueDate: '2025-02-10',
      dueTime: '11:59 PM',
      requirements: [
        'Minimum 2000 words',
        'At least 10 academic references',
        'Proper citation format (APA)'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Physics': 'bg-green-100 text-green-800',
      'Chemistry': 'bg-yellow-100 text-yellow-800',
      'Computer Science': 'bg-purple-100 text-purple-800',
      'Environmental Science': 'bg-teal-100 text-teal-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  const handleFileUpload = (assignmentId: number) => {
    if (selectedFile) {
      alert(`Uploading ${selectedFile.name} for assignment ${assignmentId}...`);
      setSelectedFile(null);
    } else {
      alert('Please select a file first.');
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardList className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assignments & Submissions</h1>
          <p className="text-gray-600">Manage your assignments and project submissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Assignments */}
        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <ClipboardList className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Live Assignments</h2>
            </div>

            <div className="space-y-4">
              {liveAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(assignment.subject)}`}>
                      {assignment.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Questions:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      {assignment.questions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Due: {assignment.dueDate} at {assignment.dueTime}</span>
                      <span className={`font-medium ${
                        getDaysRemaining(assignment.dueDate) === 'Overdue' ? 'text-red-600' :
                        getDaysRemaining(assignment.dueDate).includes('1 day') ? 'text-orange-600' :
                        'text-gray-700'
                      }`}>
                        {getDaysRemaining(assignment.dueDate)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{assignment.totalMarks} marks</span>
                  </div>

                  {assignment.status !== 'submitted' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id={`file-${assignment.id}`}
                        />
                        <label
                          htmlFor={`file-${assignment.id}`}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                        >
                          <File className="w-4 h-4" />
                          Choose File
                        </label>
                        {selectedFile && <span className="text-sm text-gray-600">{selectedFile.name}</span>}
                      </div>
                      <button
                        onClick={() => handleFileUpload(assignment.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        <Upload className="w-4 h-4" />
                        Submit Assignment
                      </button>
                    </div>
                  )}

                  {assignment.status === 'submitted' && (
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      Assignment Submitted Successfully
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submissions */}
        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Upload className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Project Submissions</h2>
            </div>

            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(submission.subject)}`}>
                      {submission.subject}
                    </span>
                    <span className="text-sm text-gray-500">{getDaysRemaining(submission.dueDate)}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{submission.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{submission.description}</p>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-blue-800 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                      {submission.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Due:</strong> {submission.dueDate} at {submission.dueTime}
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <Upload className="w-4 h-4" />
                    Submit Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsSubmissions;