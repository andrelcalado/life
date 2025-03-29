import clsx from 'clsx'
import React from 'react'

const Badge = ({
  variation = 'error',
  visibility = true,
  className,
  children,
}) => {
  return (
    <div className={clsx(
      'text-xs px-3 py-1 rounded-sm',
      {
        'hidden': !visibility,
        'bg-red-100 text-red-600': variation === 'error',
      },
      className
    )}>
      {children}
    </div>
  )
}

export default Badge