import React, { useEffect } from 'react'
import Nametag from './Nametag'
import SearchField from './SearchField'
import Conversation from './Conversation';
import { getFriends } from '../firebase';
import { useState } from 'react';
import socketIO from "socket.io-client";

const Mainchat = ({ user }) => {
    const [friendsList, setFriendsList] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [socket, setSocket] = useState(null)


    useEffect(() => {
        const fetchFriends = async () => {
            const friends = await getFriends(user?.uid)
            if (friends) {
                setFriendsList(friends);
                setSocket(socketIO.connect("http://localhost:8000"))
            }
            else { setSocket(socketIO.connect("http://localhost:8000")) }
        }
        return () => {
            fetchFriends();
        }
    }, [user?.uid]);

    useEffect(() => {
        socket?.emit('newUser', user?.uid)
    }, [socket, user?.uid])

    useEffect(() => {
        socket?.on('newUserResponse', data => console.log(data))
    }, [socket])

    const handleChangeConversation = (user) => {
        setConversationId(user?.uid)
    }

    return (
        <div className='main-chat__wrapper'>
            <div className='main-chat__friends--main bg-slate-300'>
                <span className='bg-slate-500 w-full h-12 text-white font-semibold flex justify-center items-center '>FRIENDS</span>
                <div className='w-full h-16 flex flex-col justify-center items-center border-b-2'>
                    <SearchField />
                </div>
                <div className=' w-full '>
                    <span className='px-4 flex items-center justify-center'>Friends - {friendsList?.length}</span>
                    {friendsList?.map((user, index) => {
                        return <Nametag userId={user} key={index} handleChangeConversation={handleChangeConversation} />
                    })}
                </div>
            </div>

            <Conversation Id={conversationId && conversationId} ownId={user?.uid} socket={socket} />
        </div>
    )
}

export default Mainchat