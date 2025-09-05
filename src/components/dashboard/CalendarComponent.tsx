import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventTypes = {
    holiday: { color: 'bg-red-100 border-red-300 text-red-700', label: 'Holiday' },
    test: { color: 'bg-blue-100 border-blue-300 text-blue-700', label: 'Test' },
    submission: { color: 'bg-purple-100 border-purple-300 text-purple-700', label: 'Submission' },
    exam: { color: 'bg-yellow-100 border-yellow-300 text-yellow-700', label: 'Main Exam' }
  };

  const events: Record<string, { type: keyof typeof eventTypes; title: string }[]> = {
    '2025-01-15': [{ type: 'holiday', title: 'Makar Sankranti' }],
    '2025-01-18': [{ type: 'test', title: 'Mathematics Quiz' }],
    '2025-01-20': [{ type: 'submission', title: 'Physics Assignment Due' }],
    '2025-01-25': [{ type: 'exam', title: 'Semester Mid-Term' }],
    '2025-01-26': [{ type: 'holiday', title: 'Republic Day' }],
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
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
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
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
          
          return (
            <div
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={`p-2 text-center cursor-pointer hover:bg-gray-50 rounded-md transition-colors min-h-[36px] ${
                isToday(day) ? 'bg-blue-50 text-blue-700 font-semibold' : ''
              } ${!isSameMonth(day, currentDate) ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <div className="text-sm">{format(day, 'd')}</div>
              {hasEvents && (
                <div className="flex justify-center mt-1">
                  <div className={`w-2 h-2 rounded-full ${eventTypes[dayEvents[0].type].color.split(' ')[0]}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Events */}
      {selectedDate && getEventsForDate(selectedDate).length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h4>
          <div className="space-y-2">
            {getEventsForDate(selectedDate).map((event, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-md text-sm border ${eventTypes[event.type].color}`}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-xs opacity-75">{eventTypes[event.type].label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(eventTypes).map(([key, type]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${type.color.split(' ')[0]}`}></div>
            <span className="text-gray-600">{type.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;