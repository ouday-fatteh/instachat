import { auth, getAuthUser } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navbar, Mainchat } from '../components';


const Chat = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState();
    console.log(userData)
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuthUser(user.uid);
            setUserData(data);
        }
        return () => fetchData();
    }, [user.uid])

    return (
        <div className='flex flex-col h-[100vh] w-full'>
            <Navbar />
            <Mainchat />
        </div>
    )
}

export default Chat