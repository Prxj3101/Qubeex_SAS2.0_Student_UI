import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: 'Aisha Patel',
      rollNo: 'CS2023005',
      totalMarks: 950,
      maxMarks: 1000,
      percentage: 95,
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      rank: 2,
      name: 'Rahul Singh',
      rollNo: 'CS2023012',
      totalMarks: 925,
      maxMarks: 1000,
      percentage: 92.5,
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      rank: 3,
      name: 'Priya Gupta',
      rollNo: 'CS2023008',
      totalMarks: 910,
      maxMarks: 1000,
      percentage: 91,
      photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      rank: 4,
      name: 'Prajwal Kotian',
      rollNo: '2591',
      totalMarks: 885,
      maxMarks: 1000,
      percentage: 88.5,
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isCurrentUser: true
    },
    {
      rank: 5,
      name: 'Sneha Sharma',
      rollNo: 'CS2023015',
      totalMarks: 875,
      maxMarks: 1000,
      percentage: 87.5,
      photo: 'https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const getRankIcon = (rank) => {
    const baseClasses = 'w-10 h-10 transition-transform duration-500 group-hover:scale-110';
    const hoverSpin = 'group-hover:animate-spin-y-slow'; // spin sirf hover pe

    switch (rank) {
      case 1:
        return <Trophy className={`text-yellow-400 ${baseClasses} ${hoverSpin}`} />;
      case 2:
        return <Medal className={`text-gray-300 ${baseClasses} ${hoverSpin}`} />;
      case 3:
        return <Award className={`text-orange-400 ${baseClasses} ${hoverSpin}`} />;
      default:
        return <span className="text-sm font-semibold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank, isCurrentUser) => {
    if (isCurrentUser) return 'bg-blue-50 border-blue-200';
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
    return 'bg-white border-gray-200';
  };

  return (
    <div className="space-y-3">
      {leaderboardData.map((student) => (
        <div
          key={student.rollNo}
          className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getRankBg(student.rank, student.isCurrentUser)}`}
        >
          <div className="flex items-center justify-center w-12 h-12">
            {getRankIcon(student.rank)}
          </div>

          <img
            src={student.photo}
            alt={student.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{student.name}</span>
              {student.isCurrentUser && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">You</span>
              )}
            </div>
            <span className="text-sm text-gray-500">{student.rollNo}</span>
          </div>

          <div className="text-right">
            <div className="font-semibold text-gray-800">{student.percentage}%</div>
            <div className="text-sm text-gray-500">{student.totalMarks}/{student.maxMarks}</div>
          </div>
        </div>
      ))}

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">Updated after every test • Next update in 2 days</p>
      </div>
    </div>
  );
};

export default Leaderboard;
