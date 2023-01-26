import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Nametag from './Nametag'

const Mainchat = ({ user }) => {
    return (
        <div className='px-12 sm:px-48 h-[calc(100vh-48px)] flex w-full'>
            <div className='w-1/3 h-full flex flex-col  bg-slate-300'>
                <span className='bg-slate-500 w-full h-12 text-white font-semibold flex justify-center items-center'>FRIENDS</span>
                <div className='w-full h-12 flex justify-center items-center border-b-2'>
                    <div className='rounded-3xl h-8 bg-white w-[75%] flex px-4 justify-center items-center'>
                        <input type="text" className='w-full bg-white outline-none' placeholder='Search for friends ...' />
                        <AiOutlineSearch color='black' size={20} className='cursor-pointer' />
                    </div>
                </div>
                <div className='h-full w-full  py-4'>
                    <Nametag />
                    <Nametag /> <Nametag /> <Nametag />
                </div>
            </div>

            <div className='w-2/3 h-full'>
                <span className='bg-slate-500 w-full h-12 text-white font-semibold flex justify-center items-center'>{user?.friend.name || "FRIEND'S NAME"}</span>
            </div>
        </div>
    )
}

export default Mainchat