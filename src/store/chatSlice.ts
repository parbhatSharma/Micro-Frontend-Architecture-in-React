import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  
}

const initialState: ChatState = {
  messages: [
    {
      id: '1',
      sender: 'Parbhat Sharma',
      content: 'Hello! How can I help you today?',
      timestamp: '11:46',
    },
  ],
  
};
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Omit<Message, 'id' | 'timestamp'>>) => {
      // Add user's message
      state.messages.push({
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...action.payload,
      });

      state.messages.push({
        id: (Date.now() + 1).toString(),
        sender: 'Rahul',
        content: 'Everything is working fine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    },
  },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
