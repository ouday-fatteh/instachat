import React from 'react'

const InputField = ({ type, name, placeholder, value, onChange }) => {
    return (
        <input
            className='h-12 w-full px-4 py-2 text-[#21211E] font-medium rounded-lg bg-white outline-none'
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}>

        </input>
    )
}

export default InputField