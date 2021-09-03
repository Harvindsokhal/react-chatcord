import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;

const client = StreamChat.getInstance(apiKey);

const App = () => {
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme="messaging dark">

            </Chat>
        </div>
    );
};

export default App
