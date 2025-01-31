import React, { useState } from 'react';
import { Mail, Search, Star, Trash, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const ComposeModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (to && subject && content) {
      dispatch({
        type: 'email/sendEmail',
        payload: { to, subject, content },
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Compose Email</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
            <input
              type="email"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmailApp = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state: any) => state.email.emails);
  const selectedFolder = useSelector((state: any) => state.email.selectedFolder);
  const isComposeOpen = useSelector((state: any) => state.email.isComposeOpen);

  
  const handleEmailClick = (id: string) => {
    dispatch({ type: 'email/markAsRead', payload: id });
  };

  const handleDeleteEmail = (id: string) => {
    dispatch({ type: 'email/deleteEmail', payload: id });
  };

  const openComposeModal = () => {
    dispatch({ type: 'email/setComposeOpen', payload: true });
  };

  const closeComposeModal = () => {
    dispatch({ type: 'email/setComposeOpen', payload: false });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center">
          <Mail className="mr-2 h-5 w-5 text-blue-600" />
          Email Application
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search emails..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex h-[600px]">
        <div className="w-64 border-r p-4">
          <button
            onClick={openComposeModal}
            className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Compose
          </button>
          <nav className="space-y-2">
           
           
          </nav>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {emails.map((email: any) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email.id)}
                className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                  !email.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{email.from}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{email.timestamp}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEmail(email.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Trash className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium mb-1">{email.subject}</h3>
                <p className="text-sm text-gray-600 truncate">{email.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isComposeOpen && <ComposeModal onClose={closeComposeModal} />}
    </div>
  );
};

export default EmailApp;