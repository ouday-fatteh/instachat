import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { getUserById } from '../firebase'

const Conversation = ({ Id }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            if (Id) {
                setLoading(true)
                const data = await getUserById(Id);
                setUser(data);
                setLoading(false)
            }
            return;
        }
        fetchUser();
    }, [Id])

    return (
        <div className='w-2/3 h-full flex flex-col'>
            <span className='bg-slate-500 w-full h-12 text-white font-semibold flex justify-center items-center'>{user?.displayName || "Click a friend to start talking"}</span>
            <div className='w-full h-full '>
                {loading && <div className='w-full h-full flex items-center justify-center'><AiOutlineLoading size={40} className='animate-spin' /></div>}
            </div>
        </div>
    )
}

export default Conversation