import StopRoundedIcon  from '@material-ui/icons/StopRounded';
import { Avatar } from '@material-ui/core';
import React from 'react';
import ReactTimeago from 'react-timeago';
import './chat.css';
import { selectedImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
function Chat(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = () => {
        if(!props.read) {
            dispatch(selectedImage(props.imageUrl));
            db.collection('posts').doc(props.id).set(
                {
                    read: true,
                },
                { merge: true}
            );
            navigate('/chats/view');
        }
    };

  return (
    <>
        <div  className='chat'>
            <Avatar className='chat__avatar' src={props.profilePic} />
            <div onClick={open} className='chat__info'>
                <h4>{props.username}</h4>
                <p>{!props.read && "Tap to view - "}{" "}
                <ReactTimeago date={new Date(props.timestamp?.toDate()).toUTCString()} /></p>
            </div>
            {!props.read && <StopRoundedIcon className='chat__readIcon' />}
        </div>
    </>
  )
}

export default Chat;