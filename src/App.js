import React, { useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import './App.css';
import { BrowserRouter as Router,
          Route,
          Routes
} from 'react-router-dom';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useSelector } from 'react-redux';
import {  login, logout, selectUser } from './features/appSlice';
import { useDispatch } from 'react-redux';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ): (
          <>
            <img className='app__logo' src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg' alt='' />
            <div className='app__body'>
              <div className='app__bodyBackground'>
              <Routes>
                <Route exact path="/chats/view" element={<ChatView />} />
                <Route exact path="/chats" element={<Chats />} />
                <Route exact path="/preview" element={<Preview />} />
                <Route exact path="/" element={<WebcamCapture />} />
              </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
