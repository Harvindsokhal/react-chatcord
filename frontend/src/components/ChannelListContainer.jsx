import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import LogoutIcon from '../assets/logout.png';
import MainIcon from '../assets/hospital.png';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={MainIcon} alt='Chat' width='30'/>
            </div>
        </div>

        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <img src={LogoutIcon} alt='Logout' width='30'/>
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Chat</p>
    </div>
);

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setIsEditing, setCreateType, setToggleContainer }) => {

    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('AvatarURL');
        cookies.remove('hashedPassword');

        window.location.reload();
    };

    const filters = { members: { $in: [ client.userID ] } };

    return (
        <>
            <SideBar logout={logout} />
            <div className='channel-list__list__wrapper'>
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"              
                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing} 
                    setCreateType={setCreateType}
                />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%": "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                    <ChannelListContent
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing} 
                        setCreateType={setCreateType}
                        setToggleContainer={setToggleContainer}
                    />
                </div>
            </div>
        </>
    );
}

export default ChannelListContainer;

