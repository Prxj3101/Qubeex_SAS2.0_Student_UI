import React from 'react';
import { MessageCircle, Heart, Share, Clock, Pin } from 'lucide-react';

const FeedSection: React.FC = () => {
  const feedPosts = [
    {
      id: 1,
      teacher: 'Dr. Priya Sharma',
      subject: 'Mathematics',
      type: 'announcement',
      title: 'Important: Mid-term Exam Schedule',
      content: 'The mid-term examinations for Mathematics will be held on January 25th, 2025. Please make sure to complete your revision and bring all necessary materials.',
      timestamp: '2 hours ago',
      isPinned: true,
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      teacher: 'Prof. Rajesh Kumar',
      subject: 'Physics',
      type: 'material',
      title: 'New Study Material: Quantum Mechanics',
      content: 'I have uploaded the latest notes on Quantum Mechanics. Please download and study chapters 1-3 for the upcoming test.',
      timestamp: '5 hours ago',
      isPinned: false,
      likes: 18,
      comments: 12
    },
    {
      id: 3,
      teacher: 'Dr. Anita Verma',
      subject: 'Chemistry',
      type: 'notice',
      title: 'Lab Session Rescheduled',
      content: 'Tomorrow\'s chemistry lab session has been rescheduled to Friday 2 PM due to equipment maintenance.',
      timestamp: '1 day ago',
      isPinned: false,
      likes: 8,
      comments: 3
    }
  ];

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-red-100 text-red-800';
      case 'material': return 'bg-blue-100 text-blue-800';
      case 'notice': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {feedPosts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {post.teacher.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{post.teacher}</span>
                <span className="text-sm text-gray-500">• {post.subject}</span>
                {post.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {post.timestamp}
                </div>
              </div>
              
              <h3 className="font-medium text-gray-800 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{post.content}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Share className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSection;