import React from 'react';
import { LandingNavBar, LandingBoard } from '../components'

const Home = () => {
    return (
        <div className=' flex items-center bg-hero-pattern h-[100vh] flex-col w-full '>
            <LandingNavBar />
            <div className='flex w-full justify-around items-center h-[calc(100vh-96px)] px-12'>
                <div className='w-1/3'>
                    <h1 className='font-semibold text-3xl text-[#21211E]'>The new blazing fast chat app</h1><br />
                    <p className='text-xl font-medium text-[#21211E]'>Experience the most secure chat app out there.
                        With an end-to-end encryption, all your data will be shown only to you not even us. </p><br />
                    <div className='w-full flex items-center justify-center'>
                        <button className='w-72 h-12 text-[#21211E] border font-medium hover:text-white rounded-md hover:bg-yellow-400 bg-white'>START YOUR JOURNEY</button>
                    </div>
                </div>
                <LandingBoard />
            </div>
        </div>
    )
}

export default Home