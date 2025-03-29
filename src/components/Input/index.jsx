'use client'

import React, { useState } from 'react'
import { LuCalendarHeart } from "react-icons/lu";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillMail,
  AiFillLock,  
} from "react-icons/ai";
import clsx from 'clsx';

const Input = ({
  type,
  value,
  onChange,
  error,
  placeholder,
  onBlur,
  maxLength,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getTypeIcon = () => {
    switch (type) {
      case 'email':
        return <AiFillMail className='text-gray-500' size={18} />
      case 'password':
        return <AiFillLock className='text-gray-500' size={20} />
      case 'date':
        return (
          <InputIconFloating>
            <LuCalendarHeart />
          </InputIconFloating>
        )
      default:
        return <></>
    }
  }

  return (
    <label
      className={clsx(
        'flex px-3 items-center gap-2 rounded-md bg-gray-50 border',
        {
          'border-gray-300 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-blue-500': !(error),
          'border-red-500 focus-within:border-red-500 hover:border-red-500': error,
        },
        className,
      )}
      error={error}
      {...props}
    >
      {getTypeIcon()}

      <input
        className={clsx(
          'w-full py-2 text-sm text-gray-900 placeholder:text-gray-400 border-none outline-none',
        )}
        type={showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        maxLength={maxLength}
      />

      {type === 'password' && (
        <button onClick={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword)}
        }>
          {showPassword ? (
            <AiFillEye className='text-gray-500 hover:text-gray-700 cursor-pointer' size={20} />
            ) : (
            <AiFillEyeInvisible className='text-gray-500 hover:text-gray-700 cursor-pointer' size={20} />
          )}
        </button>
      )}
    </label>
  )
}

export default Input