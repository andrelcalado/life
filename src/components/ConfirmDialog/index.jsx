import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import Button from '../Button';
import clsx from 'clsx';

const ConfirmDialog = ({
  openDialog,
  onClose,
  title,
  desc,
  confirmButton = { onClick: () => null, loading: false, text: 'Confirmar' },
  cancelButton = { onClick: () => null, loading: false, text: 'Cancelar' },
}) => {
  useEffect(() => {
    document.body.style.overflow = openDialog ? 'hidden' : 'auto';
  }, [openDialog])
  
  return (
    <div className={clsx(
      "fixed inset-0 z-999 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center transition duration-300 ease-in-out p-5 md:p-10",
      {
        "opacity-0 pointer-events-none": !openDialog,
        "opacity-100 pointer-events-auto": openDialog
      }
    )}>
      <div aria-hidden="true" onClick={onClose} className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-xs cursor-pointer">
      </div>

      <div className="w-full py-2 bg-white cursor-default dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
        <button onClick={onClose} type="button" className="absolute top-4 right-4 rtl:right-auto rtl:left-2 cursor-pointer">
          <IoMdClose size={20} />
        </button>

        <div className="space-y-2 p-2">
          <div className="p-4 space-y-2 text-center dark:text-white">
            <h2 className="text-xl font-bold tracking-tight">
              {title}
            </h2>

            <p className="text-gray-500">
              {desc}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div aria-hidden="true" className="border-t border-gray-300 px-2"></div>

          <div className="px-6 py-2">
            <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              <Button variation="border" {...cancelButton} />
              <Button variation="solid-dangerous" {...confirmButton} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog