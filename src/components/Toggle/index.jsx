import clsx from 'clsx'
import React from 'react'

const Toggle = ({
  active,
  onChange,
  variation = 'green',
  auxLabel,
}) => {
  return (
    <label className={clsx(
      "inline-flex items-center cursor-pointer relative",
      {
        "mt-6": auxLabel,
      }
    )}>
      {auxLabel && <span className='absolute left-0 -top-6 text-sm text-gray-600'>{auxLabel}</span>}

      <input
        readOnly={!onChange}
        type="checkbox"
        value={active}
        className="sr-only peer"
        checked={active}
        onChange={onChange}
      />
      <div className={clsx(
        "transition duration-300 ease-in-out relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
        {
          "peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:border-gray-600 peer-checked:bg-blue-500 dark:peer-checked:bg-blue-500": variation === 'primary',
          "peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500": variation === 'green',
        }
      )}></div>
    </label>
  )
}

export default Toggle