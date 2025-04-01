import React from 'react'

const BigNumberLabel = ({
  className,
  bigNumber,
  label,
  ...props
}) => {
  return (
    <div
      className={className}
      {...props}
    >
      <h5 className="font-semibold text-2xl mb-1 text-gray-800">{bigNumber}</h5>
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  )
}

export default BigNumberLabel