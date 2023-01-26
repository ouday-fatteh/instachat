import React from 'react';
import { useState } from 'react';
import ExcellentRV from '../assets/images/love-chat.png'
import InputField from './InputField';
import { AiOutlineLoading } from 'react-icons/ai';
import { useEffect } from 'react';
import { logInWithEmailAndPassword } from '../firebase';
import { Link } from 'react-router-dom';


const Signin = () => {
    const [data, setData] = useState({ email: '', password: '' });

    const [isLoading, setIsLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState(undefined);
    const [errorCustom, setErrorCustom] = useState({ type: '', desc: '', field: '' });


    useEffect(() => {
        const changeState = () => {
            if (firebaseError === 'Sorry, your password was incorrect. Please double-check your password.') { setErrorCustom({ type: 'passwordLength', desc: '', field: 'password' }); }
            else if (firebaseError === "The email you entered doesn't belong to an account.Please check your email and try again.") {
                setErrorCustom({ type: 'fieldsEmpty', desc: '', field: 'username' });
            }
            else { setErrorCustom({ type: 'other', desc: '', field: 'other' }); }
        }
        return () => firebaseError && changeState();
    }, [firebaseError])

    const handleError = () => {
        let { email, password } = data;
        if (email && password) {
            if (password.length < 6) return setErrorCustom({ type: 'passwordLength', desc: 'Password length must be at least 6', field: 'password' });
            return true;
        } else {
            if (email === '') return setErrorCustom({ type: 'fieldsEmpty', desc: 'Fill all the fields.', field: 'username' })
            if (password === '') return setErrorCustom({ type: 'fieldsEmpty', desc: 'Fill all the fields.', field: 'password' })
            return true;
        }
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                setData({ ...data, email: e.target.value });
                break;
            case 'password':
                setData({ ...data, password: e.target.value });
                break;
            default:
                break;
        }

    }

    const handleSubmit = async () => {
        setErrorCustom({ type: '', desc: '', field: '' })
        const verify = handleError();
        const { email, password } = data;
        if (verify) {
            setIsLoading(true);
            const res = await logInWithEmailAndPassword(email, password);
            setIsLoading(false);
            if (res) setFirebaseError(res);
        }
        return;
    }

    return (
        <div className='flex justify-center items-center w-full h-[100vh] bg-yellow-300'>

            <div className='flex px-8 py-8 w-8/12 bg-yellow-200 h-[80%] rounded-lg border-2 border-white'>
                <div className='w-[40%] h-full flex items-center justify-center rounded-lg bg-yellow-300'><img src={ExcellentRV} alt="chat" /></div>
                <div className='w-[60%] h-full flex pl-8 justify-start flex-col'>
                    <div className='flex justify-end items-center text-[#21211E] gap-2 font-medium text-sm h-12 w-full'><span>not a member yet?</span><Link to='/auth?authtype=signup'><span>Sign Up</span></Link></div>
                    <div className='w-full h-full  flex flex-col items-center  justify-center gap-12'>
                        <div className='flex flex-col justify-center items-center'>
                            <span className='text-[#21211E] font-semibold text-3xl'>Hello Again</span>
                            <span className='text-[#21211E] font-medium text-xl'>Welcome back you've been missed!</span>
                        </div>

                        <form className='flex flex-col w-[50%] gap-4'>
                            <InputField name='email' type='text' placeholder={'Email'} value={data.email} onChange={(e) => handleChange(e)} />
                            <InputField name='password' type='password' placeholder={'Password'} value={data.password} onChange={(e) => handleChange(e)} />
                            {errorCustom.desc && (<div>
                                <span className='text-[rgb(255,0,0)] text-sm'>{errorCustom?.desc?.slice(0, errorCustom.desc.indexOf('.') + 1)}</span >
                                <><br /><span className='text-[rgb(255,0,0)] text-sm'>{errorCustom?.desc?.slice(errorCustom.desc.indexOf('.') + 1)}</span ></>
                            </div>)}
                            {firebaseError && (<div>
                                <span className='text-[rgb(255,0,0)] text-sm'>{firebaseError?.slice(0, firebaseError.indexOf('.') + 1)}</span >
                                <><br /><span className='text-[rgb(255,0,0)] text-sm'>{firebaseError?.slice(firebaseError.indexOf('.') + 1)}</span ></>
                            </div>)}
                        </form>

                        <div className='w-[50%]'>
                            <button className='w-full h-12 rounded-lg text-white font-medium bg-slate-600' onClick={handleSubmit}>
                                {isLoading ? <div className='w-full animate-spin flex justify-center items-center h-6'><AiOutlineLoading size={18} /></div> : 'Sign In'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signin