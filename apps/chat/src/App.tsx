import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const ChatApp = () => {
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.chat.messages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      dispatch({
        type: 'chat/sendMessage',
        payload: {
          sender: 'Parbhat',
          content: newMessage.trim(),
        },
      });
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
          Chat Application
        </h2>
      </div>
      <div className="h-[500px] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message: any) => (
              <div key={message.id} className="flex items-start gap-2.5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900">{message.sender}</span>
                    <span className="text-sm font-normal text-gray-500">{message.timestamp}</span>
                  </div>
                  <div className={`flex flex-col leading-1.5 p-4 border-gray-200 ${
                    message.sender === 'You' ? 'bg-blue-100 rounded-s-xl rounded-ee-xl' : 'bg-gray-100 rounded-e-xl rounded-es-xl'
                  }`}>
                    <p className="text-sm font-normal text-gray-900">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;