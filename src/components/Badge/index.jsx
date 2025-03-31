import clsx from 'clsx'
import React from 'react'

const Badge = ({
  variation = 'error',
  size = 'xs',
  visibility = true,
  mode = 'solid',
  className,
  children,
}) => {
  return (
    <div className={clsx(
      'rounded-sm transition duration-300 ease-in-out z-999999',
      {
        'hidden': !visibility && mode === 'solid',
        'fixed bottom-4 right-4 opacity-100 pointer-events-auto': mode === 'fixed' && visibility,
        'fixed -bottom-2 right-4 opacity-0 pointer-events-none': mode === 'fixed' && !visibility,
        'bg-red-100 text-red-600': variation === 'error',
        'bg-green-100 text-green-600': variation === 'success',
        'text-xs px-3 py-1': size === 'xs',
        'text-sm px-4 py-2': size === 'sm',
        'text-base px-5 py-3': size === 'md',
        'text-lg px-6 py-4': size === 'lg',
      },
      className
    )}>
      {children}
    </div>
  )
}

export default Badge