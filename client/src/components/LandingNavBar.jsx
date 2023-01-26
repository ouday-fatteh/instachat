import React from 'react'
import Logo from '../assets/images/instachat_logo.png';

const LandingNavBar = () => {
    return (
        <div className='w-full h-24 bg-transparent px-64 flex justify-between items-center'>
            <img src={Logo} className='h-12' alt="Instachat" />
            <ul className='flex gap-2 text-[#21211E] font-medium'>
                <li className='w-24 py-2 rounded-md cursor-pointer border-b-2 border-transparent text-center hover:bg-yellow-300 hover:border-orange-400'>DOWNLOAD</li>
                <li className='w-24 py-2 rounded-md cursor-pointer border-b-2 border-transparent text-center hover:bg-yellow-300 hover:border-orange-400'>API</li>
                <li className='w-24 py-2 rounded-md cursor-pointer border-b-2 border-transparent text-center hover:bg-yellow-300 hover:border-orange-400'>ABOUT</li>
                <li className='w-24 py-2 rounded-md cursor-pointer border-b-2 border-transparent text-center hover:bg-yellow-300 hover:border-orange-400'>DOCS</li>
                <li className='w-24 py-2 rounded-md cursor-pointer border-b-2 border-transparent text-center hover:bg-yellow-300 hover:border-orange-400'>JOIN</li>
            </ul>
        </div>
    )
}

export default LandingNavBar