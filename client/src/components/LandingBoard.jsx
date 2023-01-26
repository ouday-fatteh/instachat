import React from 'react'

const LandingBoard = () => {
    return (
        <div className='w-1/3 h-full flex flex-col justify-center items-center gap-12'>
            <div className='h-2/3 w-2/3 rounded-md flex flex-col px-8 py-8 bg-yellow-400 gap-2 shadow-2xl'>
                <div className='w-full'><div className='font-semibold text-slate-800 px-4 py-2 w-20 rounded-full bg-white'>Hey ...</div></div>
                <div><div className='font-semibold text-slate-800 px-4 py-2 w-32 rounded-full bg-white'>What'up bro</div></div>
                <div className='w-full flex justify-end'><div className='font-semibold text-slate-800 px-4 py-2 w-40 rounded-full bg-white'>Yoo wassup man</div></div>
                <div><div className='font-semibold text-slate-800 px-4 py-2 w-40 rounded-full bg-white'>Wanna hangout?</div></div>
                <div className='w-full flex justify-end'><div className='font-semibold text-slate-800 px-4 py-2 w-36 rounded-full bg-white'>Pick a time ..</div></div>
                <div><div className='font-semibold text-slate-800 px-4 py-2 w-48 rounded-full bg-white'>How about 03:00 PM ?</div></div>
                <div className='w-full flex justify-end'><div className='font-semibold text-slate-800 px-4 py-2 w-52 rounded-full bg-white'>Sounds great, see ya ..</div></div>
                <div><div className='font-semibold text-slate-800 px-4 py-2 w-32 rounded-full bg-white'>See you man</div></div>
            </div>
            <div className='flex w-full items-center justify-center gap-12 '>
                <button className='px-8 py-2 rounded-full border bg-yellow-400 duration-75 shadow-2xl font-semibold text-[#21211E] hover:-translate-y-2'>SIGN IN</button>
                <button className='px-8 py-2 rounded-full border bg-yellow-400 duration-75 shadow-2xl font-semibold text-[#21211E] hover:-translate-y-2'>SIGN UP</button>
            </div>

        </div>
    )
}

export default LandingBoard