import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Share, Clock, Pin, Bookmark, Search, ThumbsUpIcon } from 'lucide-react';

// 🟢 Comment Modal
const CommentModal = ({ post, onClose, addComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAdd = () => {
    if (newComment.trim()) {
      addComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl p-5 shadow-lg animate-scale-in transition-transform">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">{post.title} - Comments</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">X</button>
        </div>
        <div className="max-h-60 overflow-y-auto mb-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {post.commentsList.map((c, i) => (
            <div key={i} className="text-sm text-gray-700">{c}</div>
          ))}
          {post.commentsList.length === 0 && <div className="text-sm text-gray-400">No comments yet.</div>}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// 🟢 FeedCard Component (updated with new post badge)
const FeedCard = ({ post, toggleLike, toggleBookmark, openComments }) => {
  const [expanded, setExpanded] = useState(false);

  const typeColors = {
    announcement: 'bg-gradient-to-r from-red-300 to-red-100 text-red-800',
    material: 'bg-gradient-to-r from-blue-300 to-blue-100 text-blue-800',
    notice: 'bg-gradient-to-r from-yellow-300 to-yellow-100 text-yellow-800',
  };

  const truncatedContent =
    post.content.length > 120 && !expanded
      ? post.content.slice(0, 120) + '...'
      : post.content;

  return (
    <div
      className={`bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 p-5 transition-all duration-300 relative ${
        post.isPinned ? 'border-l-4 border-gradient-to-b from-red-400 to-red-200 bg-red-50' : ''
      }`}
    >
      {/* Minimal New Post Badge */}
      {post.isNew && (
        <span className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      )}

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {post.teacher.split(' ').map((n) => n[0]).join('')}
        </div>

        {/* Post Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-gray-800">{post.teacher}</span>
            <span className="text-sm text-gray-500">• {post.subject}</span>
            {post.isPinned && <Pin className="w-4 h-4 text-red-500" />}
          </div>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[post.type] || 'bg-gray-200 text-gray-700'}`}
            >
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {post.timestamp}
            </div>
          </div>

          <h3 className="font-medium text-gray-800 mb-2">{post.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{truncatedContent}</p>

          {post.content.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-medium text-purple-600 hover:underline mb-3"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-1 transition-transform transform ${
                post.liked ? 'text-red-500 scale-110' : 'hover:text-red-500 hover:scale-105'
              }`}
            >
              <ThumbsUpIcon className="w-4 h-4" />
              {post.likes}
            </button>
            <button
              onClick={() => openComments(post.id)}
              className="flex items-center gap-1 hover:text-blue-500 hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              {post.commentsList.length}
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 hover:scale-105 transition-transform">
              <Share className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => toggleBookmark(post.id)}
              className={`ml-auto flex items-center gap-1 transition-transform transform ${
                post.bookmarked ? 'text-yellow-500 scale-110' : 'hover:text-yellow-500 hover:scale-105'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🟢 FeedSection Component (updated for new post logic)
const FeedSection = () => {
  const initialPosts = [
    {
      id: 1,
      teacher: 'Dr. Priya Sharma',
      subject: 'Mathematics',
      type: 'announcement',
      title: 'Important: Mid-term Exam Schedule',
      content:
        'The mid-term examinations for Mathematics will be held on January 25th, 2025. Please make sure to complete your revision and bring all necessary materials.',
      timestamp: '2 hours ago',
      isPinned: true,
      likes: 24,
      commentsList: ['Don’t forget the syllabus!', 'Thanks for the info.'],
      liked: false,
      bookmarked: false,
      isNew: false,
    },
    {
      id: 2,
      teacher: 'Prof. Rajesh Kumar',
      subject: 'Physics',
      type: 'material',
      title: 'New Study Material: Quantum Mechanics',
      content:
        'I have uploaded the latest notes on Quantum Mechanics. Please download and study chapters 1-3 for the upcoming test.',
      timestamp: '5 hours ago',
      isPinned: false,
      likes: 18,
      commentsList: ['Great notes!', 'Can you explain chapter 2?'],
      liked: false,
      bookmarked: false,
      isNew: false,
    },
    {
      id: 3,
      teacher: 'Dr. Anita Verma',
      subject: 'Chemistry',
      type: 'notice',
      title: 'Lab Session Rescheduled',
      content:
        "Tomorrow's chemistry lab session has been rescheduled to Friday 2 PM due to equipment maintenance.",
      timestamp: '1 day ago',
      isPinned: false,
      likes: 8,
      commentsList: [],
      liked: false,
      bookmarked: false,
      isNew: false,
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortOption, setSortOption] = useState('Latest');
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  // Simulate new post arrival
  // Simulate new post arrival only once
// Simulate new post arrival only once
useEffect(() => {
  let added = false;

  const timer = setTimeout(() => {
    if (!added) {
      setPosts((prev) => [
        {
          id: 4,
          teacher: 'Dr. Sunita Roy',
          subject: 'Biology',
          type: 'announcement',
          title: 'Guest Lecture Tomorrow',
          content: 'There will be a guest lecture on Genetics tomorrow at 3 PM in Lab 2.',
          timestamp: 'Just now',
          isPinned: false,
          likes: 0,
          commentsList: [],
          liked: false,
          bookmarked: false,
          isNew: true,
        },
        ...prev,
      ]);
      added = true;
    }
  }, 5000);

  return () => clearTimeout(timer);
}, []);


  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleBookmark = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  const openComments = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isNew: false } : p))
    );
    setActiveCommentPostId(id);
  };
  const closeComments = () => setActiveCommentPostId(null);

  const addComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentsList: [...p.commentsList, comment] } : p
      )
    );
  };

  const filteredPosts = posts
    .filter((p) => {
      const searchMatch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filterType === 'All' || p.type === filterType.toLowerCase();
      return searchMatch && typeMatch;
    })
    .sort((a, b) => {
      if (sortOption === 'Latest') return b.id - a.id;
      if (sortOption === 'Most Liked') return b.likes - a.likes;
      if (sortOption === 'Pinned First') return b.isPinned === a.isPinned ? 0 : b.isPinned ? -1 : 1;
      return 0;
    });

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto p-2">
      {/* Search + Filters */}
<div className="flex flex-col md:flex-row md:items-center md:gap-2 mb-4">
  <div className="flex items-center gap-2 mb-2 md:mb-0 w-full md:w-64">
    <Search className="w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search posts..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
    />
  </div>

  {/* Stylish Filter Dropdown */}
  <div className="relative w-40 md:w-48">
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="block w-full px-4 py-2 text-gray-700 bg-white border border-purple-400 rounded-full shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none appearance-none cursor-pointer"
    >
      <option className="text-gray-700">All</option>
      <option className="text-gray-700">Announcement</option>
      <option className="text-gray-700">Material</option>
      <option className="text-gray-700">Notice</option>
    </select>
    {/* Dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Stylish Sort Dropdown */}
  <div className="relative w-40 md:w-48">
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="block w-full px-4 py-2 text-gray-700 bg-white border border-purple-400 rounded-full shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none appearance-none cursor-pointer"
    >
      <option className="text-gray-700">Latest</option>
      <option className="text-gray-700">Most Liked</option>
      <option className="text-gray-700">Pinned First</option>
    </select>
    {/* Dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <FeedCard
            key={post.id}
            post={post}
            toggleLike={toggleLike}
            toggleBookmark={toggleBookmark}
            openComments={openComments}
          />
        ))}
      </div>

      {/* Comment Modal */}
      {activeCommentPostId && (
        <CommentModal
          post={posts.find((p) => p.id === activeCommentPostId)}
          onClose={closeComments}
          addComment={addComment}
        />
      )}
    </div>
  );
};

export default FeedSection;

