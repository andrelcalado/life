import clsx from 'clsx'
import React from 'react'
import Loading from '../Loading'

const Button = ({
  prefix,
  variation = 'solid',
  loading = false,
  size = 'sm',
  disabled = false,
  text,
  onClick,
  className = "",
  ...props
}) => {
  const getPrefix = () => {
    if (loading) {
      return <Loading loading={loading} />
    } else {
      return prefix ? prefix : <></>
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex items-center justify-center cursor-pointer rounded-md transition duration-300 ease-in-out',
        {
          'px-3 py-2 gap-2 text-xs': size === 'xs',
          'px-4 py-2 gap-2 text-sm': size === 'sm',
          'px-5 py-3 gap-2 text-base': size === 'md',
          'px-6 py-4 gap-2 text-lg': size === 'lg',
        },
        {
          'bg-sky-500 text-white hover:bg-sky-600': variation === 'solid' && !(loading || disabled),
          'bg-sky-300 text-gray-100 pointer-events-none': variation === 'solid' && (loading || disabled),
          'bg-sky-800 text-white hover:bg-sky-900': variation === 'solid-secondary' && !(loading || disabled),
          'bg-sky-600 text-gray-200 pointer-events-none': variation === 'solid-secondary' && (loading || disabled),
          'bg-transparent border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white': variation === 'border',
          'bg-red-500 text-white hover:bg-red-700': variation === 'solid-dangerous' && !(loading || disabled),
          'bg-red-400 text-gray-100 pointer-events-none hover:bg-red-400': variation === 'solid-dangerous' && (loading || disabled),
        },
        className
      )}
      role="status"
      {...props}
    >
      {getPrefix()}
      {text && <span className='transition duration-300 ease-in-out'>{text}</span>}
    </button>
  );
}

export default Button;
