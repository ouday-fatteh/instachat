import React, { useState } from 'react'

const Invitation = () => {
    const [name, setName] = useState('')
    return (
        <div className='w-full h-screen flex justify-center items-center bg-yellow-300'>
            <div className='bg-yellow-500 w-1/3 h-1/3 rounded-3xl flex gap-4 flex-col justify-center items-center'>
                <div className='text-[#21211E] font-semibold text-xl'>{name || 'FRIEND_NAME'} invited you to his party</div>
                <div className='flex gap-8'>
                    <button className='px-4 py-2 rounded-xl bg-green-600 text-white'>Accept</button>
                    <button className='px-4 py-2 rounded-xl bg-red-600 text-white'>Decline</button>
                </div>
            </div>
        </div>
    )
}

export default Invitation