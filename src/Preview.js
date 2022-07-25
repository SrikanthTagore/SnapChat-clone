import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import CloseIcon  from '@material-ui/icons/Close';
import './Preview.css';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { db, storage } from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/appSlice';

function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if(!cameraImage) {
            navigate('/', {replace: true });
        }
    }, [cameraImage, navigate]);

    const closePreview = () => {
        dispatch(resetCameraImage());
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(cameraImage, "data_url");

        uploadTask.on(
            'state_changed', 
             null, 
             (error) => {
                //Error function
                console.log(error);
            },
            () => {
                //Complete function
                storage
                    .ref('posts')
                    .child(id)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('posts').add({
                            imageUrl: url,
                            username: 'PAPA React',
                            read: false,
                            profilePic: user.profilePic,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                        // const colRef = collection(db, 'posts')
                        // addDoc(colRef, {
                        //     imageUrl: url,
                        //     username: 'PAPA React',
                        //     read: false,
                        //     //ProfilePic,
                        //     timestamp: serverTimestamp(),
                        // });
                navigate('/chats', {replace: true });
            });
        }
        );
    }

  return (
    <>
        <div className='preview'>
            <CloseIcon onClick={closePreview} className='preview__close'/>
            <div className='preview__toolbarRight'>
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className='preview__footer'>
                <h2>Send To</h2>
                <SendIcon fontSize='small' className='preview__sendIcon'/>
            </div>
        </div>
    </>
  )
}

export default Preview;