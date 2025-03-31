import { redirect } from 'next/navigation';
import { userStore } from '@/store/user'
import { useEffect, useState } from 'react'

const INITIAL_SCREEN_FEEDBACK = {
  type: 'success',
  message: '',
  visible: false,
}

const INITIAL_MAP_TRACKING = {
  openModal: false,
  vehicleID: '',
  latitude: -23.5505,
  longitude: -46.6333,
}

const useDashboard = () => {
  const user = userStore((state) => state.user);
  const [mapTracking, setMapTracking] = useState(INITIAL_MAP_TRACKING);
  const [screenLoading, setScreenLoading] = useState(false);
  const [screenFeedback, setScreenFeedback] = useState(INITIAL_SCREEN_FEEDBACK);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [search, setSearch] = useState("");
  const [vehicleModal, setVehicleModal] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState();
  const firstChart = {
    series: [vehiclesData?.filter((vehicle) => vehicle.is_active).length, vehiclesData?.filter((vehicle) => vehicle.is_online).length],
    options: {
      chart: {
        width: 480,
        type: 'pie',
      },
      labels: ['Ativos', 'Online'],
      colors: ['#0060E6', '#31cd67'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  const handleCancelDeleteVehicle = () => {
    setConfirmDialog((prev) => ({...prev, openDialog: false}));
  }

  const handleCloseMapTracking = () => {
    setMapTracking(INITIAL_MAP_TRACKING);
  }

  const handleOpenMapTracking = (vehicle) => {
    setMapTracking({
      openModal: true,
      vehicleID: vehicle.id,
      latitude: vehicle.ultima_latitude,
      longitude: vehicle.ultima_longitude
    });
  }

  const [confirmDialog, setConfirmDialog] = useState({
    openDialog: false,
    vehicleID: null,
    confirmButton: { onClick: () => handleDeleteVehicle(), loading: false, text: 'Confirmar' },
    cancelButton: { onClick: handleCancelDeleteVehicle, loading: false, text: 'Cancelar' },
    onClose: handleCancelDeleteVehicle,
  });

  const loadVehicles = async () => {
    setScreenLoading(true);
    
    try {
      const response = await fetch('/api/vehicles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVehiclesData(data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    } finally {
      setScreenLoading(false);
    }
  }

  const handleDeleteVehicle = async (vehicleID) => {
    setConfirmDialog((prev) => ({
      ...prev,
      confirmButton: { ...prev.confirmButton, loading: true },
    }));

    try {
      const response = await fetch('/api/vehicles', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`,
        },
        body: JSON.stringify({ id: vehicleID }),
      });

      if (response.ok) {
        await loadVehicles();
        setScreenFeedback({ type: 'success', message: 'Veículo deletado com sucesso!', visible: true });
        setTimeout(() => {
          setScreenFeedback({ message: '', visible: false });
        }, 3000);
      } else {
        throw new Error('Erro ao deletar veículo');
      }
    } catch (error) {
      console.error(error);
      setScreenFeedback({ type: 'error',message: 'Erro ao deletar veículo', visible: true });
      setTimeout(() => {
        setScreenFeedback({ message: '', visible: false });
      }, 3000);
    } finally {
      setConfirmDialog((prev) => ({
        ...prev,
        openDialog: false,
        confirmButton: { ...prev.confirmButton, loading: false },
      }));
    }
  }

  useEffect(() => {
    if (!user) {
      redirect('/login');
    }

    loadVehicles();
  }, []);  

  return {
    screenLoading,
    vehiclesData,
    search,
    setSearch,
    confirmDialog,
    setConfirmDialog,
    handleDeleteVehicle,
    vehicleModal,
    setVehicleModal,
    vehicleToEdit,
    setVehicleToEdit,
    firstChart,
    loadVehicles,
    screenFeedback,
    setScreenFeedback,
    mapTracking,
    handleOpenMapTracking,
    handleCloseMapTracking
  }
}

export default useDashboard