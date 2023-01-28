import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { getUserById, sendMessage, getMessages } from '../firebase'
import InputEmoji from "react-input-emoji";
import moment from 'moment';

const Conversation = ({ Id, ownId }) => {
    const [text, setText] = useState("");
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            if (Id) {

                const data = await getUserById(Id);
                setUser(data);

            }
            return;
        }
        fetchUser();
    }, [Id])

    useEffect(() => {
        const fetchMessages = async () => {
            if (user !== undefined) {
                setLoading(true)
                const res = await getMessages(ownId, Id);
                setMessages(res)
                setLoading(false)
                console.log(res)
            } else return;
        }
        fetchMessages();
    }, [Id, ownId, user])

    function handleOnEnter(text) {
        if (text.length > 0) {
            messages.push({
                senderId: ownId,
                recipientId: Id,
                content: text,
                timestamp: Date.now()
            })
            sendMessage(ownId, Id, text)
        }
    }


    return (
        <div className='w-2/3 h-full flex flex-col'>
            <span className='bg-slate-500 w-full h-12 text-white font-semibold flex justify-center items-center'>{user?.displayName || "Click a friend to start talking"}</span>
            <div className='w-full h-full flex flex-col'>
                {loading ? <div className='w-full h-full flex items-center justify-center'><AiOutlineLoading size={40} className='animate-spin' /></div> : (
                    <>
                        <div className='h-[calc(100%-96px)] gap-2 w-full flex flex-col px-8 py-8 border-r'>
                            {messages.length > 0 ? messages.map((message, index) => {
                                return <div key={index} className={`w-full flex justify-start ${message.senderId === ownId && ' flex-row-reverse'}`}>
                                    <span className={`px-4 py-2 max-w-[50%] rounded-3xl ${message.senderId === ownId ? `bg-blue-400 text-white ${(message.senderId !== messages[messages.indexOf(message) - 1]?.senderId) && 'rounded-tr-none'}` : `bg-gray-200 text-black ${(message.senderId !== messages[messages.indexOf(message) - 1]?.senderId) && 'rounded-tl-none'}`}`}>{message.content}</span>
                                    <span className='text-[#21211E] text-sm flex items-center mx-4 '>{moment(message?.timestamp).fromNow()}</span>
                                </div>
                            }) : <div className='w-full h-full flex items-center justify-center'>{user !== undefined ? `Start a conversation with ${user?.displayName}` : 'Select a friend to start a conversation'}</div>}
                        </div>
                        <div className='w-full border h-24 flex items-center justify-center'>
                            <InputEmoji
                                value={text}
                                onChange={setText}
                                cleanOnEnter
                                onEnter={handleOnEnter}
                                placeholder="Type a message"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Conversation