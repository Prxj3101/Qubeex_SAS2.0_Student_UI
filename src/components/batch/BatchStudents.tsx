import React from 'react';
import { Mail, User } from 'lucide-react';

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

interface BatchStudentsProps {
  currentUser: User | null;
}

const BatchStudents: React.FC<BatchStudentsProps> = ({ currentUser }) => {
  const batchStudents = [
    {
      id: '1',
      name: 'Prajwal Kotian',
      rollNo: '2591',
      email: 'kotianprajwal.31@gmail.com',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      division: 'A'
    },
    {
      id: '2',
      name: 'Aisha Patel',
      rollNo: 'CS2023005',
      email: 'aisha.patel@college.edu',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      division: 'A'
    },
    {
      id: '3',
      name: 'Priya Gupta',
      rollNo: 'CS2023008',
      email: 'priya.gupta@college.edu',
      photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      division: 'A'
    },
    {
      id: '4',
      name: 'Rahul Singh',
      rollNo: 'CS2023012',
      email: 'rahul.singh@college.edu',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      division: 'A'
    },
    {
      id: '5',
      name: 'Sneha Sharma',
      rollNo: 'CS2023015',
      email: 'sneha.sharma@college.edu',
      photo: 'https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      division: 'A'
    },
    {
      id: '6',
      name: 'Arjun Mehta',
      rollNo: 'CS2023018',
      email: 'arjun.mehta@college.edu',
      photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      division: 'A'
    }
  ];

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-gray-700">
            Students in {currentUser?.batch} - Division {currentUser?.division}
          </h3>
          <span className="text-sm text-gray-500">{batchStudents.length} students</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {batchStudents.map((student) => (
          <div
            key={student.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              student.rollNo === currentUser?.rollNo
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={student.photo}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800">{student.name}</h4>
                  {student.rollNo === currentUser?.rollNo && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      You
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{student.rollNo}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-500">{student.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchStudents;