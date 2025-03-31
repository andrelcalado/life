import { useState, useEffect } from 'react'
import { userStore } from '@/store/user';
import { useDashboardContext } from '@/app/useDashboard';

const VEHICLE_DATA_INITIAL_STATE = {
  codigo: '',
  user: '',
  placa: '',
  ultimo_rastreamento: '',
  ultima_data: '',
  ultima_latitude: '',
  ultima_longitude: '',
  is_active: false,
  is_online: false
}

const useVehicleModal = (openModal, vehicleToEdit, onClose) => {
  const user = userStore((state) => state.user);
  const { setScreenFeedback, loadVehicles } = useDashboardContext();
  const [submitError, setSubmitError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(VEHICLE_DATA_INITIAL_STATE);

  const handleChange = (field, value) => {
    setVehicleData({ ...vehicleData, [field]: value });
  };

  useEffect(() => {
    if (!vehicleToEdit) return;

    setVehicleData(vehicleToEdit);
  }, [vehicleToEdit]);
  

  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto';

    if (!openModal) {
      setVehicleData(VEHICLE_DATA_INITIAL_STATE);
    }
  }, [openModal]);

  const handleCreateVehicle = async () => {
    setSubmitLoading(true);
    setSubmitError("");
    
    try {
      const response = await fetch('/api/vehicles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`,
        },
        body: JSON.stringify(vehicleData),
      });

      const data = await response.json();

      if (response.ok) {
        loadVehicles();
        setVehicleData(VEHICLE_DATA_INITIAL_STATE);
        onClose();
        setScreenFeedback({ type: 'success',message: 'Veículo criado com sucesso!', visible: true });
        setTimeout(() => {
          setScreenFeedback({ message: '', visible: false });          
        }, 3000);
      } else {
        throw new Error('Erro ao criar veículo');
      }
    } catch (error) {
      console.error(error);
      setSubmitError(error.message);
    } finally {
      setSubmitLoading(false);
    }
  }

  const handleUpdateVehicle = async () => {
    setSubmitLoading(true);
    setSubmitError("");
    
    try {
      const response = await fetch('/api/vehicles/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`,
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        loadVehicles();
        setVehicleData(VEHICLE_DATA_INITIAL_STATE);
        setSubmitError("");
        onClose();
        setScreenFeedback({ type: 'success', message: 'Veículo editado com sucesso!', visible: true });
        setTimeout(() => {
          setScreenFeedback({ message: '', visible: false });          
        }, 3000);
      } else {
        throw new Error('Erro ao editar o veículo');
      }      
    } catch (error) {
      console.error(error);
      setSubmitError(error.message);
    } finally {
      setSubmitLoading(false);
    }
  }

  return {
    submitLoading,
    handleCreateVehicle,
    handleUpdateVehicle,
    vehicleData,
    handleChange,
    submitError,
  }
}

export default useVehicleModal