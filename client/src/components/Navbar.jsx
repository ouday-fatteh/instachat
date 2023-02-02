import React from 'react'
import { useState } from 'react'
import { AiFillQuestionCircle, AiOutlineQrcode, AiOutlineClose } from 'react-icons/ai'
import Logo from '../assets/images/instachat_logo.png'
import { logout } from '../firebase'
import QRCode from "react-qr-code";

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [toolTipOpened, setToolTipOpened] = useState(false);

    const handleToolTip = () => {
        setToolTipOpened(prev => !prev)
    }
    const handleDropdown = () => {
        setIsOpen(prev => !prev)
    }
    const handleShowQr = () => {
        setShowQR(prev => !prev)
    }

    return (
        <>
            <div className='h-12 items-center flex px-12 w-full justify-between bg-slate-700'>
                <img src={Logo} className='h-8' alt="Instachat" />
                <div className='flex gap-8 text-white items-center'>
                    <span className='flex gap-2 items-center'><AiOutlineQrcode size={20} onClick={handleShowQr} />ID: {user?.uid}<span onClick={handleToolTip} className='relative'><AiFillQuestionCircle size={16} />
                        {toolTipOpened && <div className='absolute px-4 right-0 bg-white border text-black w-96'><p>This is your Identification Number, give it your friends so they will be able to search you up.</p></div>}
                    </span></span>
                    <span>{user?.displayName}</span>
                    <div className='h-8 w-8 rounded-full bg-white cursor-pointer relative' onClick={handleDropdown}>
                        {isOpen && (
                            <div className='absolute text-black right-0 top-10 w-48 bg-white border rounded-lg flex flex-col py-2'>
                                <span className='hover:bg-slate-200 px-4' onClick={logout}>Log out</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showQR && (
                <div className='absolute w-full h-full flex justify-center items-center z-[900] bg-[rgba(255,255,255,0.3)]'>
                    <div className='  w-1/2 h-1/2 bg-white z-[999] flex flex-col border'>
                        <span className='w-full flex justify-between px-4 py-4'>
                            <p>Scan the Qr code below using your phone to get a friend invitation.</p>
                            <AiOutlineClose className='cursor-pointer' onClick={handleShowQr} size={25} color="black" />
                        </span>
                        <div className='w-full h-full flex justify-center items-center '>
                            <QRCode
                                size={56}
                                style={{ height: "auto", maxWidth: "30%", width: "27%" }}
                                value={`http://localhost:3000/invitation?token=${user?.uid}`}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Navbar