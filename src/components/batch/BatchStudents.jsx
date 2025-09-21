import React from 'react';
import { Mail } from 'lucide-react';

const BatchStudents = ({ currentUser }) => {
  // 50 demo students
  const batchStudents = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    rollNo: `CS2023${String(i + 1).padStart(3, '0')}`,
    email: `student${i + 1}@college.edu`,
    photo: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`,
    division: 'A',
  }));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-800">
          Students in {currentUser?.batch} - Division {currentUser?.division}
        </h3>
        <span className="text-xs text-gray-500">{batchStudents.length} students</span>
      </div>

      {/* Scrollable compact grid */}
      <div className="max-h-[18rem] overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {batchStudents.map((student) => (
            <div
              key={student.id}
              className={`flex items-center gap-2 p-1.5 rounded-lg border text-xs
                ${student.rollNo === currentUser?.rollNo
                  ? 'bg-blue-50 border-blue-300 shadow'
                  : 'bg-white border-gray-200'
                }`}
            >
              <img
                src={student.photo}
                alt={student.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <div className="flex-1 truncate">
                <div className="flex items-center gap-1">
                  <h4 className="font-semibold truncate">{student.name}</h4>
                  {student.rollNo === currentUser?.rollNo && (
                    <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[0.55rem]">You</span>
                  )}
                </div>
                <p className="text-gray-600 truncate">{student.rollNo}</p>
                <div className="flex items-center gap-1 text-gray-500 truncate">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{student.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BatchStudents;
