import React from 'react'
import Button from '../Button'
import Image from 'next/image'
import useHeader from './useHeader'

const Header = () => {
  const { handleLogout } = useHeader();

  return (
    <header className='fixed top-0 left-1/2 -translate-x-1/2 w-full bg-sky-500 py-2 px-4 z-99'>
      <div className='w-full max-w-[1220px] mx-auto flex items-center justify-between'>
        <Image
          src="/assets/images/logo.png"
          alt="Life logo"
          width={60}
          height={60}
        />

        <Button
          onClick={handleLogout}
          variation='solid-secondary'
          text="Desconectar"
        />
      </div>
    </header>
  )
}

export default Header