import React, { useRef, useState, useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { getUserById, sendMessage, getMessages } from '../firebase'
import InputEmoji from "react-input-emoji";
import moment from 'moment';
import NotificationMessage from "../assets/audio/incoming-message.mp3"

const Conversation = ({ Id, ownId, socket }) => {
    const [text, setText] = useState("");
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const audioPlayer = useRef(null);
    const messagesEndRef = useRef(null)

    const playNotification = () => {
        audioPlayer?.current?.play();
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' })
    }
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
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (user !== undefined) {
                setLoading(true)
                const res = await getMessages(ownId, Id);
                setMessages(res)
                setLoading(false)
            } else return;
        }
        fetchMessages();
    }, [Id, ownId, user])

    useEffect(() => {
        socket?.on('messageResponse', (data) => {
            setMessages([...messages, data])
            playNotification();
        });

    }, [socket, messages]);


    function handleOnEnter(text) {
        if (text.length > 0) {
            messages.push({
                senderId: ownId,
                recipientId: Id,
                content: text,
                timestamp: Date.now()
            })
            socket.emit('message', {
                senderId: ownId,
                recipientId: Id,
                content: text,
                timestamp: Date.now(),
                socketID: socket.id,
            });
            sendMessage(ownId, Id, text)
        }
    }



    return (
        <>
            <audio ref={audioPlayer} src={NotificationMessage} />
            <div className='conversation__main--wrapper'>
                <span className='bg-slate-500 w-full h-12 text-white font-semibold flex justify-center items-center'>{user?.displayName || "Click a friend to start talking"}</span>
                <div className='w-full h-full flex flex-col'>
                    {loading ? <div className='w-full h-full flex items-center justify-center'><AiOutlineLoading size={40} className='animate-spin' /></div> : (
                        <>
                            <div className='conversation__chat--area'>
                                {messages.length > 0 ? messages.map((message, index) => {
                                    return <div ref={messagesEndRef} key={index} className={`w-full flex justify-start ${message.senderId === ownId && ' flex-row-reverse'}`}>
                                        <span className={`px-4 py-2 max-w-[50%]  ${message.senderId === ownId ? `bg-blue-400 text-white ${(message.senderId !== messages[messages.indexOf(message) - 1]?.senderId) ? 'rounded-3xl rounded-br-none' : 'rounded-3xl rounded-tr-none'}` : `bg-gray-200 text-black ${(message.senderId !== messages[messages.indexOf(message) - 1]?.senderId) ? 'rounded-3xl rounded-bl-none' : 'rounded-3xl rounded-tl-none'}`}`}>{message.content}</span>
                                        <span className='text-[#21211E] text-sm flex items-center mx-4 '>{moment(message?.timestamp).fromNow()}</span>
                                    </div>
                                }) : <div className='w-full h-full flex items-center justify-center'>{user !== undefined ? `Start a conversation with ${user?.displayName}` : 'Select a friend to start a conversation'}</div>}
                            </div>
                            <div className='w-full border h-24 flex items-center justify-center bg-white'>
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
            </div >
        </>
    )
}

export default Conversation