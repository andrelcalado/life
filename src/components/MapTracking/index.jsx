"use client";

import React from 'react'
import { IoMdClose } from "react-icons/io";
import clsx from 'clsx';
import useMaptracking from './useMapTracking';

const MapTracking = ({
  vehicleID,
  latitude,
  longitude,
  openModal,
  onClose,
}) => {
  const { mapRef } = useMaptracking(vehicleID, latitude, longitude);  
  
  return (
    <div className={clsx(
      "fixed inset-0 z-997 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center transition duration-300 ease-in-out",
      {
        "opacity-0 pointer-events-none": !openModal,
        "opacity-100 pointer-events-auto": openModal
      }
    )}>
      <div aria-hidden="true" onClick={onClose} className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-xs cursor-pointer">
      </div>

      <div className="w-full pt-2 bg-white cursor-default dark:bg-gray-800 relative rounded-xl overflow-hidden mx-auto max-w-[800px]">
        <button onClick={onClose} type="button" className="absolute top-4 right-4 rtl:right-auto rtl:left-2 cursor-pointer">
          <IoMdClose size={20} />
        </button>

        <div className="p-4 text-center dark:text-white">
          <h2 className="text-xl font-bold tracking-tight">
            Mapa de rastreamento
          </h2>

          <p className="text-gray-500">
            Acompanhe o veículo em tempo real em um mapa interativo.
          </p>
        </div>

        <div className='w-full h-[500px]' ref={mapRef}></div>
      </div>
    </div>
  )
}

export default MapTracking;