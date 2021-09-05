import React from 'react';
import { StreamChat } from 'stream-chat';
import { ChannelList, Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, TeamChannelList } from './components';

import './App.css';

const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;

const client = StreamChat.getInstance(apiKey);

const App = () => {
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme="messaging dark">
                <ChannelListContainer/>
                <ChannelContainer/>
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                        />
                    )}
                />
            </Chat>
        </div>
    );
};

export default App
