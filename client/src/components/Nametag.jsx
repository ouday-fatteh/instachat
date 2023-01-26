import React from 'react'
import { AiOutlineMessage } from 'react-icons/ai'

const Nametag = () => {
    return (
        <div className='h-12 w-full flex items-center justify-between cursor-pointer hover:bg-slate-400 px-8'>
            <div>
                <img src="" alt="" />
                <span>Friend name</span>
            </div>
            <AiOutlineMessage size={20} />
        </div>
    )
}

export default Nametag