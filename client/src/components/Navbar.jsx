import React from 'react'
import { useState } from 'react'
import Logo from '../assets/images/instachat_logo.png'
import { logout } from '../firebase'

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className='h-12 items-center flex px-12 w-full justify-between bg-slate-700'>
            <img src={Logo} className='h-8' alt="Instachat" />
            <div className='flex gap-8 text-white items-center'>
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