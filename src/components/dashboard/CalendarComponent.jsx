import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default selected as today

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventTypes = {
    holiday: { 
      dotColor: 'bg-gradient-to-r from-red-500 to-red-700', 
      boxColor: 'bg-red-100 border-red-300 text-red-700', 
      label: 'Holiday' 
    },
    test: { 
      dotColor: 'bg-gradient-to-r from-blue-500 to-blue-700', 
      boxColor: 'bg-blue-100 border-blue-300 text-blue-700', 
      label: 'Test' 
    },
    submission: { 
      dotColor: 'bg-gradient-to-r from-green-500 to-green-700', 
      boxColor: 'bg-green-100 border-green-300 text-green-700', 
      label: 'Submission' 
    },
    exam: { 
      dotColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600', 
      boxColor: 'bg-yellow-100 border-yellow-300 text-yellow-600', 
      label: 'Main Exam' 
    }
  };

  const events = {
    '2025-01-15': [{ type: 'holiday', title: 'Makar Sankranti' }],
    '2025-01-18': [
      { type: 'test', title: 'Mathematics Test' },
      { type: 'submission', title: 'Physics Assignment Due' }
    ],
    '2025-01-20': [{ type: 'submission', title: 'Physics Assignment Due' }],
    '2025-01-25': [{ type: 'exam', title: 'Semester Mid-Term' }],
    '2025-01-26': [{ type: 'holiday', title: 'Republic Day' }],
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  };

  const getEventsForDate = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return events[dateKey] || [];
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-1">
          <button onClick={() => navigateMonth('prev')} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={() => navigateMonth('next')} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-medium text-gray-500">
            {day}
          </div>
        ))}

        {days.map(day => {
          const dayEvents = getEventsForDate(day);
          const hasEvents = dayEvents.length > 0;

          // Check if day is selected or today
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const highlightClass = isSelected ? 'bg-purple-100 rounded-md' : '';

          return (
            <div
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={`p-2 text-center cursor-pointer hover:bg-purple-100 min-h-[36px] ${highlightClass}
                ${!isSameMonth(day, currentDate) ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <div className={`text-sm ${isSelected ? 'font-semibold text-purple-700' : ''}`}>
                {format(day, 'd')}
              </div>
              {hasEvents && (
                <div className="flex justify-center mt-1 space-x-1">
                  {dayEvents.map((event, idx) => (
                    <div key={idx} className={`w-3 h-3 rounded-full ${eventTypes[event.type].dotColor}`}></div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Events */}
      {selectedDate && getEventsForDate(selectedDate).length > 0 && (
        <div className="mt-4 space-y-2">
          {getEventsForDate(selectedDate).map((event, idx) => (
            <div key={idx} className={`px-3 py-2 rounded-md text-sm border ${eventTypes[event.type].boxColor}`}>
              <div className="font-medium">{event.title}</div>
              <div className="text-xs opacity-75">{eventTypes[event.type].label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(eventTypes).map(([key, type]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${type.dotColor}`}></div>
            <span className="text-gray-600">{type.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
