import { useState, useEffect } from 'react'

const useVehicleModal = (openModal, vehicleToEdit) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    id: '',
    codigo: '',
    user: '',
    placa: '',
    ultimo_rastreamento: '',
    ultima_data: '',
    ultima_latitude: '',
    ultima_longitude: '',
    is_active: false,
    is_online: false
  });

  const handleChange = (field, value) => {
    setVehicleData({ ...vehicleData, [field]: value });
  };

  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto';
  }, [openModal]);

  const handleCreateVehicle = () => {
    setSubmitLoading(true);
  }

  return {
    submitLoading,
    handleCreateVehicle,
    vehicleData,
    handleChange,
  }
}

export default useVehicleModal