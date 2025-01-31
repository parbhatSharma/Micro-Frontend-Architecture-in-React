import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './components/Layout';

const ChatApp = React.lazy(() => import('chatApp/App'));
const EmailApp = React.lazy(() => import('emailApp/App'));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Micro-Frontend Demo</h1>
                    <p className="text-lg text-gray-600">Choose an application from the navigation menu above</p>
                  </div>
                </div>
              } />
              <Route
                path="chat/*"
                element={
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  }>
                    <div className="p-4">
                      <ChatApp />
                    </div>
                  </Suspense>
                }
              />
              <Route
                path="email/*"
                element={
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  }>
                    <div className="p-4">
                      <EmailApp />
                    </div>
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;