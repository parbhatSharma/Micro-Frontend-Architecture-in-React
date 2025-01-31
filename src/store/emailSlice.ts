import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Email {
  id: string;
  from: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface EmailState {
  emails: Email[];
  selectedFolder: 'inbox' | 'starred' | 'trash';
  isComposeOpen: boolean;
}

const initialState: EmailState = {
  emails: [
    {
      id: '1',
      from: 'parbhat sharma',
      subject: 'Reminder email',
      content: 'Hi, This is just a reminder email.',
      timestamp: '10:30 AM',
      read: false,
    },
  ],
  selectedFolder: 'inbox',
  isComposeOpen: false,
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setSelectedFolder: (state, action: PayloadAction<'inbox' | 'starred' | 'trash'>) => {
      state.selectedFolder = action.payload;
    },
   
    setComposeOpen: (state, action: PayloadAction<boolean>) => {
      state.isComposeOpen = action.payload;
    },
    sendEmail: (state, action: PayloadAction<{ to: string; subject: string; content: string }>) => {
      state.emails.unshift({
        id: Date.now().toString(),
        from: 'You',
        subject: action.payload.subject,
        content: action.payload.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        read: true,
      });
      state.isComposeOpen = false;
    },
  },
});

export const { setSelectedFolder, setComposeOpen, sendEmail } = emailSlice.actions;
export default emailSlice.reducer;