import React, { useEffect } from 'react'
import Nametag from './Nametag'
import SearchField from './SearchField'
import Conversation from './Conversation';
import { getFriends } from '../firebase';
import { useState } from 'react';

const Mainchat = ({ user }) => {
    const [friendsList, setFriendsList] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    useEffect(() => {
        const fetchFriends = async () => {
            const friends = await getFriends(user?.uid)
            if (friends) setFriendsList(friends);
        }
        return () => {
            fetchFriends();
        }
    }, [user?.uid]);

    const handleChangeConversation = (user) => {
        setConversationId(user?.uid)
    }

    return (
        <div className='px-12 sm:px-48 h-[calc(100vh-48px)] flex w-full'>
            <div className='w-1/3 h-full flex flex-col  bg-slate-300'>
                <span className='bg-slate-500 w-full h-14 text-white font-semibold flex justify-center items-center'>FRIENDS</span>
                <div className='w-full h-16 flex flex-col justify-center items-center border-b-2'>
                    <SearchField />
                </div>
                <div className='h-full w-full  py-2'>
                    <span className='px-4 flex items-center justify-center'>Friends - {friendsList?.length}</span>
                    {friendsList?.map((user, index) => {
                        return <Nametag userId={user} key={index} handleChangeConversation={handleChangeConversation} />
                    })}
                </div>
            </div>

            <Conversation Id={conversationId && conversationId} ownId={user?.uid} />
        </div>
    )
}

export default Mainchat