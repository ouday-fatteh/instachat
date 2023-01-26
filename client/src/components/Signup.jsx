import React from 'react';
import { useState } from 'react';
import ExcellentRV from '../assets/images/excellent-review.png'
import InputField from './InputField';
import { registerWithEmailAndPassword } from '../firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';



const Signup = () => {
    const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState({ type: '', desc: '', field: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState(undefined);



    useEffect(() => {
        const changeState = () => {
            if (firebaseError === 'Please use a stronger password.Use digits and letters for better security.') {
                setError({ type: 'passwordLength', desc: '', field: 'password' });
            }
            else if (firebaseError === 'This email is already associated with another account.Please sign in to your account or use another email.') {
                setError({ type: 'fieldsEmpty', desc: '', field: 'email' });
            }
            else if (firebaseError === 'Please use a valid email address.') {
                setError({ type: 'fieldsEmpty', desc: '', field: 'email' });
            }
            else { setError({ type: 'other', desc: '', field: 'other' }); }
        }
        return () => firebaseError && changeState();
    }, [firebaseError])


    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setData({ ...data, name: e.target.value });
                break;
            case 'email':
                setData({ ...data, email: e.target.value });
                break;
            case 'password':
                setData({ ...data, password: e.target.value });
                break;
            case 'confirmPassword':
                setData({ ...data, confirmPassword: e.target.value });
                break;
            default:
                break;
        }

    }

    const isVerified = () => {
        const { name, email, password, confirmPassword } = data;
        if (email && name && password && confirmPassword) {
            if (password !== confirmPassword) return setError({ type: 'passwordNoMatch', desc: 'Make sure the passwords match', fields: ['password', 'confirmedPassword'] });
            if (password.length < 6) return setError({ type: 'passwordLength', desc: 'Password length must be at least 6', fields: ['password', 'confirmPassword'] });
            return true;
        } else {
            if (name === '') return setError({ type: 'fieldsEmpty', desc: 'Fill all the fields.', field: 'name' })
            if (email === '') return setError({ type: 'fieldsEmpty', desc: 'Fill all the fields.', field: 'email' })
            if (password === '') return setError({ type: 'fieldsEmpty', desc: 'Fill all the fields.', field: 'password' })
            if (confirmPassword === '') return setError({ type: 'fieldsEmpty', desc: 'Fill all the fields.', field: 'confirmPassword' })
        }
    }

    const handleSubmit = async (e) => {
        setError({ type: '', desc: '', field: '' });
        e.preventDefault();
        const verify = isVerified();
        const { name, email, password } = data;
        if (verify) {
            //submit userData here
            setIsLoading(true);
            const res = await registerWithEmailAndPassword(name, email, password);
            setIsLoading(false);
            if (res) setFirebaseError(res);
        }
    }


    return (
        <div className='flex justify-center items-center w-full h-[100vh] bg-yellow-300'>

            <div className='flex px-8 py-8 w-8/12 bg-yellow-200 h-[80%] rounded-lg border-2 border-white'>
                <div className='w-[40%] h-full flex items-center justify-center rounded-lg bg-yellow-300'><img src={ExcellentRV} alt="chat" /></div>
                <div className='w-[60%] h-full flex pl-8 justify-start flex-col'>
                    <div className='flex justify-end items-center text-[#21211E] gap-2 font-medium text-sm h-12 w-full'><span>Already a member?</span><Link to='/auth?authtype=signin'><span>Sign In</span></Link></div>
                    <div className='w-full h-full  flex flex-col items-center  justify-around'>
                        <div className='flex flex-col justify-center items-center'>
                            <span className='text-[#21211E] font-semibold text-3xl'>Hello Hello!</span>
                            <span className='text-[#21211E] font-medium text-xl'>Welcome to our humble community</span>
                        </div>

                        <form className='flex flex-col w-[50%] gap-4'>
                            <InputField name='name' type='text' placeholder={'Full Name'} value={data.name} onChange={(e) => handleChange(e)} />
                            <InputField name='email' type='text' placeholder={'Email'} value={data.email} onChange={(e) => handleChange(e)} />
                            <InputField name='password' type='password' placeholder={'Password'} value={data.password} onChange={(e) => handleChange(e)} />
                            <InputField name='confirmPassword' type='password' placeholder={'Confirm password'} value={data.confirmPassword} onChange={(e) => handleChange(e)} />
                            {error.desc && (<div>
                                <span className='text-[rgb(255,0,0)] text-sm'>{error?.desc}</span >
                            </div>)}
                            {firebaseError && (<div>
                                <span className='text-[rgb(255,0,0)] text-sm'>{firebaseError?.slice(0, firebaseError.indexOf('.') + 1)}</span >
                                <><br /><span className='text-[rgb(255,0,0)] text-sm'>{firebaseError?.slice(firebaseError.indexOf('.') + 1)}</span ></>
                            </div>)}
                        </form>

                        <div className='w-[50%]'>
                            <button className='w-full h-12 rounded-lg text-white font-medium bg-slate-600' onClick={handleSubmit}>
                                {isLoading ? <div className='w-full animate-spin flex justify-center items-center h-6'><AiOutlineLoading size={18} /></div> : 'Sign Up'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup