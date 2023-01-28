import { auth, getAuthUser } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from 'react';
import { Navbar, Mainchat } from '../components';
import { AiOutlineLoading } from 'react-icons/ai';


const Chat = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuthUser(user.uid);
            setUserData(data);
        }
        return () => fetchData();
    }, [user.uid])

    if (!userData) {
        return (
            <div className='flex  justify-center items-center h-[100vh] w-full'>
                <AiOutlineLoading className='animate-spin' color='black' size={45} />
            </div>
        )
    }
    else {
        return (
            <div className='flex flex-col h-[100vh] w-full'>
                <Navbar user={userData} />
                <Mainchat user={user} />
            </div>
        )
    }
}

export default Chat