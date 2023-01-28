import React from 'react'
import { useState } from 'react';
import { AiOutlineLoading, AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai';
import { getUserById, addFriend, auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
const SearchField = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [noUser, setNoUser] = useState(false);
    const [userData, setUserData] = useState(null);
    const [user] = useAuthState(auth)
    const [sent, setSent] = useState(false);

    const onSubmit = async () => {
        setUserData(null);
        setNoUser(false);
        setSubmitted(true);
        setLoading(true);
        if (searchQuery.length > 0) {
            const data = await getUserById(searchQuery);
            if (data) setUserData(data);
            else setNoUser(true);
        }
        setLoading(false)

    }

    const handleSearchQueryInput = (query) => {
        setNoUser(false); setSubmitted(false)
        setSearchQuery(query);
    }

    const handleAddFriend = () => {
        if (!sent) {
            addFriend(user.uid, userData.uid);
            setSent(true)
        }
    }


    return (
        <div className='rounded-3xl relative h-8 bg-white  w-[75%] flex px-4 justify-center items-center '>
            <input type="text" onChange={(e) => handleSearchQueryInput(e.target.value)} value={searchQuery} className='w-full bg-white z-50 outline-none' placeholder='Search for friends with ID...' />
            <AiOutlineSearch color='black' onClick={onSubmit} size={20} className='cursor-pointer z-50 ' />
            {(searchQuery.length > 0 && submitted) && (
                <div className=' absolute border border-t-0 w-full top-4 left-0 z-40 bg-white pt-8 pb-6 rounded-b-2xl flex items-center justify-center'>
                    {loading && <AiOutlineLoading className='animate-spin duration-100' />}
                    {noUser && <span>No user was found by that ID.</span>}
                    {userData && <div className='flex justify-between px-4 items-center hover:bg-slate-200 w-full cursor-pointer h-12'>
                        <div className='flex gap-2 items-center'>
                            <div className='bg-gray-400 rounded-full w-8 h-8 border'></div>
                            <span>{userData.displayName}</span>
                        </div>
                        <div onClick={handleAddFriend} className='flex h-8 w-8 hover:bg-gray-400 hover:text-white cursor-pointer rounded-full items-center justify-center'><AiOutlineUserAdd size={18} /></div>
                    </div>}
                </div>
            )}
        </div>

    )
}

export default SearchField