import React, { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { getUserById } from '../firebase'

const Nametag = ({ userId, handleChangeConversation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserById(userId)
            if (data) setUser(data);
        }

        return () => fetchData();
    }, [userId])

    const handleName = () => {
        handleChangeConversation(user)
    }

    return (
        <div onClick={handleName} className='h-12 w-full flex items-center justify-between cursor-pointer hover:bg-slate-400 px-8'>
            <div>
                <img src="" alt="" />
                <span>{user ? user?.displayName : 'Loading ...'}</span>
            </div>
            <AiOutlineMessage size={20} />
        </div>
    )
}

export default Nametag