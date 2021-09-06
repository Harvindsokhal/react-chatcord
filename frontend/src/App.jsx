import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

import './App.css';

const cookies = new Cookies();

const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken ) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullname: cookies.get('fullName'),
        image: cookies.get('AvatarURL'),
        hashedPassword: cookies.get('hashedPassword')
    }, authToken);

};

const App = () => {

    if (!authToken) return <Auth/>
    
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme="messaging dark">
                <ChannelListContainer/>
                <ChannelContainer/>

            </Chat>
        </div>
    );
};

export default App
