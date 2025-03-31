import React from 'react'
import { IoMdClose } from "react-icons/io";
import Button from '../Button';
import useVehicleModal from './useVehicleModal';
import Input from '../Input';
import clsx from 'clsx';
import Toggle from '../Toggle';
import Badge from '../Badge';
import { datetimeToDate } from '@/utils/dateFormat';

const VehicleModal = ({
  vehicleToEdit,
  openModal,
  onClose,
  loadVehicles,
  setScreenFeedback,
}) => {
  const {
    handleCreateVehicle,
    handleUpdateVehicle,
    submitLoading,
    vehicleData,
    handleChange,
    submitError,
  } = useVehicleModal(openModal, vehicleToEdit, onClose, loadVehicles, setScreenFeedback);
  
  return (
    <div className={clsx(
      "fixed inset-0 z-997 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center transition duration-300 ease-in-out p-5 md:p-10",
      {
        "opacity-0 pointer-events-none": !openModal,
        "opacity-100 pointer-events-auto": openModal
      }
    )}>
      <div aria-hidden="true" onClick={onClose} className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-xs cursor-pointer">
      </div>

      <div className="w-full py-2 bg-white cursor-default relative rounded-xl mx-auto max-w-[800px]">
        <button onClick={onClose} type="button" className="absolute top-4 right-4 rtl:right-auto rtl:left-2 cursor-pointer">
          <IoMdClose size={20} />
        </button>

        <div className="p-2 text-center md:p-4">
          <h2 className="text-lg font-bold tracking-tight md:text-xl">
            {vehicleToEdit ? "Editar Veículo" : "Criar Veículo"}
          </h2>

          <p className="text-gray-500 text-sm max-w-[240px] mx-auto md:text-base">
            Preencha os campos abaixo para {vehicleToEdit ? "editar" : "criar"} o veículo.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-2 px-6 md:grid-cols-2'>
          <Input
            auxLabel="Código"
            placeholder="Código"
            value={vehicleData.codigo}
            onChange={({ target }) => handleChange('codigo', target.value)}
          />
          <Input
            auxLabel="Placa"
            placeholder="Placa"
            value={vehicleData.placa}
            onChange={({ target }) => handleChange('placa', target.value)}
          />
          <Input
            auxLabel="Usuário"
            placeholder="Usuário"
            value={vehicleData.user}
            onChange={({ target }) => handleChange('user', target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              auxLabel="Última Latitude"
              placeholder="Última Latitude"
              value={vehicleData.ultima_latitude}
              onChange={({ target }) => handleChange('ultima_latitude', target.value)}
            />
            <Input
              auxLabel="Última Longitude"
              placeholder="Última Longitude"
              value={vehicleData.ultima_longitude}
              onChange={({ target }) => handleChange('ultima_longitude', target.value)}
            />
          </div>
          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <Input
              auxLabel="Última Data"
              type="date"
              placeholder="Última Data"
              value={vehicleData.ultima_data}
              onChange={({ target }) => handleChange('ultima_data', target.value)}
            />
            <div className='flex gap-4'>
              <Toggle
                auxLabel="Ativo"
                active={vehicleData.is_active}
                onChange={() => handleChange('is_active', !vehicleData.is_active)}
                variation="primary"
              />
              <Toggle
                auxLabel="Online"
                active={vehicleData.is_online}
                onChange={() => handleChange('is_online', !vehicleData.is_online)}
              />
            </div>              
          </div>
          <Input
            auxLabel="Último Rastreamento"
            type="date"
            placeholder="Último Rastreamento"
            value={vehicleData.ultimo_rastreamento ? datetimeToDate(vehicleData.ultimo_rastreamento) : ''}
            onChange={({ target }) => handleChange('ultimo_rastreamento', target.value)}
          />
        </div>

        <div className="px-6 my-2 text-center">
          <Badge visibility={submitError}><p>{submitError}</p></Badge>
        </div>

        <div aria-hidden="true" className="border-t border-gray-300 px-2 my-2 mt-4"></div>

        <div className="px-6 py-2 flex gap-2 justify-end">
          <Button variation="border" text="Cancelar" onClick={onClose} />
          <Button
            disabled={!vehicleData.codigo || !vehicleData.placa}
            text={vehicleToEdit ? "Editar" : "Criar"}
            onClick={vehicleToEdit ? handleUpdateVehicle : handleCreateVehicle}
            loading={submitLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default VehicleModal;