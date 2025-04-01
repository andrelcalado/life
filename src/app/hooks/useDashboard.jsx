import { useEffect, useState, useContext, createContext } from 'react'
import { redirect } from 'next/navigation';
import useAuthStore from '@/store/user'

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

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [screenFeedback, setScreenFeedback] = useState(INITIAL_SCREEN_FEEDBACK);
  const [screenLoading, setScreenLoading] = useState(true);
  const [vehiclesData, setVehiclesData] = useState([]);
  const { checkAuth, accessToken } = useAuthStore();

  const loadVehicles = async () => {
    setScreenLoading(true);

    await checkAuth();
    
    try {
      const response = await fetch('/api/vehicles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
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

  const value = {
    screenFeedback,
    setScreenFeedback,
    loadVehicles,
    vehiclesData,
    screenLoading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);

export const useDashboard = () => {
  const { accessToken } = useAuthStore();
  const {
    setScreenFeedback,
    vehiclesData,
    loadVehicles,
  } = useDashboardContext();
  const [mapTracking, setMapTracking] = useState(INITIAL_MAP_TRACKING);
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
        breakpoint: 800,
        options: {
          chart: {
            width: 300,
            height: 300,
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
          'Authorization': `Bearer ${accessToken}`,
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
    loadVehicles();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);  

  return {
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
    mapTracking,
    handleOpenMapTracking,
    handleCloseMapTracking
  }
}
