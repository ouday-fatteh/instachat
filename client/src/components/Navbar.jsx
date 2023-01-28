import React from 'react'
import { useState } from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'
import Logo from '../assets/images/instachat_logo.png'
import { logout } from '../firebase'

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [toolTipOpened, setToolTipOpened] = useState(false);

    const handleToolTip = () => {
        setToolTipOpened(prev => !prev)
    }
    const handleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className='h-12 items-center flex px-12 w-full justify-between bg-slate-700'>
            <img src={Logo} className='h-8' alt="Instachat" />
            <div className='flex gap-8 text-white items-center'>
                <span className='flex gap-2 items-center'>ID: {user?.uid}<span onClick={handleToolTip} className='relative'><AiFillQuestionCircle size={16} />
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
    )
}

export default Navbar