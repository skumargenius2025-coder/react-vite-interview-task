import React, { useState } from 'react';
import { FaArrowLeft, FaBookmark, FaTrash, FaEdit, FaSave, FaTimes, FaRegBookmark } from 'react-icons/fa';

const Bookmarks = ({ bookmarks, onBack, onUpdateBookmark, onDeleteBookmark }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (bookmark) => {
    setEditingId(bookmark.id);
    setEditText(bookmark.notes || bookmark.answer || '');
  };

  const handleSave = (bookmark) => {
    const updatedBookmark = {
      ...bookmark,
      notes: editText,
      answer: bookmark.answer // Preserve original answer
    };
    onUpdateBookmark(bookmark.id, updatedBookmark);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this bookmark?')) {
      onDeleteBookmark(id);
    }
  };

  // Group by subject
  const groupedBookmarks = bookmarks.reduce((groups, bookmark) => {
    const subject = bookmark.subject || 'General';
    if (!groups[subject]) groups[subject] = [];
    groups[subject].push(bookmark);
    return groups;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookmarks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {bookmarks?.length || 0} saved {bookmarks?.length === 1 ? 'question' : 'questions'}
          </p>
        </div>
      </div>

      {/* Bookmarks List */}
      {bookmarks?.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedBookmarks).map(([subject, subjectBookmarks]) => (
            <div key={subject} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {subject}
              </h2>
              <div className="space-y-4">
                {subjectBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <FaBookmark className="text-yellow-500 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white mb-2">
                            Q: {bookmark.question}
                          </p>
                          
                          {editingId === bookmark.id ? (
                            <div className="mt-2 space-y-3">
                              <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"
                                rows="6"
                              />
                              <div className="flex gap-2">
                                <button onClick={() => handleSave(bookmark)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                  <FaSave /> Save Changes
                                </button>
                                <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                  <FaTimes /> Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border">
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {bookmark.notes || bookmark.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {editingId !== bookmark.id && (
                        <div className="flex gap-2 ml-4">
                          <button onClick={() => handleEdit(bookmark)} className="p-2 text-gray-500 hover:text-primary rounded-lg">
                            <FaEdit size={16} />
                          </button>
                          <button onClick={() => handleDelete(bookmark.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-lg">
                            <FaTrash size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <FaRegBookmark className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No bookmarks yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Start bookmarking questions while practicing</p>
          <button onClick={onBack} className="mt-6 bg-primary text-white px-6 py-3 rounded-lg">
            Go to Learn
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;