import { redirect } from 'next/navigation';
import { userStore } from '@/store/user'
import { useEffect, useState } from 'react'

const useDashboard = () => {
  const user = userStore((state) => state.user);
  const [screenLoading, setScreenLoading] = useState(true);
  const [vehiclesData, setVehiclesData] = useState([
    {
      codigo: "001",
      user: "João Silva",
      placa: "ABC-1234",
      ultimo_rastreamento: "2025-03-29 14:30",
      ultima_data: "2025-03-29",
      ultima_latitude: "-23.5505",
      ultima_longitude: "-46.6333",
      is_active: true,
      is_online: true,
    },
    {
      codigo: "002",
      user: "Maria Oliveira",
      placa: "XYZ-5678",
      ultimo_rastreamento: "2025-03-29 14:45",
      ultima_data: "2025-03-29",
      ultima_latitude: "-22.9068",
      ultima_longitude: "-43.1729",
      is_active: true,
      is_online: false,
    },
    {
      codigo: "003",
      user: "Carlos Santos",
      placa: "DEF-9101",
      ultimo_rastreamento: "2025-03-29 13:20",
      ultima_data: "2025-03-29",
      ultima_latitude: "-19.9167",
      ultima_longitude: "-43.9345",
      is_active: false,
      is_online: false,
    },
    {
      codigo: "004",
      user: "Ana Souza",
      placa: "GHI-2345",
      ultimo_rastreamento: "2025-03-29 12:10",
      ultima_data: "2025-03-29",
      ultima_latitude: "-30.0346",
      ultima_longitude: "-51.2177",
      is_active: true,
      is_online: true,
    },
    {
      codigo: "005",
      user: "Ricardo Mendes",
      placa: "JKL-6789",
      ultimo_rastreamento: "2025-03-29 15:00",
      ultima_data: "2025-03-29",
      ultima_latitude: "-15.7801",
      ultima_longitude: "-47.9292",
      is_active: false,
      is_online: true,
    },
    {
      codigo: "006",
      user: "Paula Lima",
      placa: "MNO-3456",
      ultimo_rastreamento: "2025-03-29 11:30",
      ultima_data: "2025-03-29",
      ultima_latitude: "-3.1190",
      ultima_longitude: "-60.0217",
      is_active: true,
      is_online: false,
    },
    {
      codigo: "007",
      user: "Eduardo Pereira",
      placa: "PQR-7890",
      ultimo_rastreamento: "2025-03-29 16:10",
      ultima_data: "2025-03-29",
      ultima_latitude: "-25.4284",
      ultima_longitude: "-49.2733",
      is_active: false,
      is_online: false,
    },
    {
      codigo: "008",
      user: "Fernanda Costa",
      placa: "STU-1234",
      ultimo_rastreamento: "2025-03-29 17:25",
      ultima_data: "2025-03-29",
      ultima_latitude: "-8.0476",
      ultima_longitude: "-34.8770",
      is_active: true,
      is_online: true,
    },
    {
      codigo: "009",
      user: "Gustavo Nunes",
      placa: "VWX-5678",
      ultimo_rastreamento: "2025-03-29 18:00",
      ultima_data: "2025-03-29",
      ultima_latitude: "-1.4558",
      ultima_longitude: "-48.4902",
      is_active: false,
      is_online: true,
    },
    {
      codigo: "010",
      user: "Larissa Martins",
      placa: "YZA-9101",
      ultimo_rastreamento: "2025-03-29 19:15",
      ultima_data: "2025-03-29",
      ultima_latitude: "-22.8146",
      ultima_longitude: "-47.0696",
      is_active: true,
      is_online: false,
    }
  ]);
  const [search, setSearch] = useState("");
  const [vehicleModal, setVehicleModal] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState();
  const firstChart = {
    series: [vehiclesData.filter((vehicle) => vehicle.is_active).length, vehiclesData.filter((vehicle) => vehicle.is_online).length],
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
  const secondChart = {
    series: [vehiclesData.length, vehiclesData.filter((vehicle) => vehicle.is_active).length, vehiclesData.filter((vehicle) => vehicle.is_online).length],
    options: {
      chart: {
        width: 480,
        type: 'pie',
      },
      labels: ['Total', 'Ativos', 'Online'],
      colors: ['#596a81', '#0060E6', '#31cd67'],
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

  const handleDeleteVehicle = (vehicleID) => {
    setConfirmDialog((prev) => ({
      ...prev,
      confirmButton: { ...prev.confirmButton, loading: true },
    }));

    setVehiclesData(vehiclesData.filter((vehicle) => vehicle.id !== vehicleID));
    // setConfirmDialog((prev) => ({...prev, openDialog: false}));
  }

  const handleCancelDeleteVehicle = () => {
    setConfirmDialog((prev) => ({...prev, openDialog: false}));
  }

  const [confirmDialog, setConfirmDialog] = useState({
    openDialog: false,
    vehicleID: null,
    confirmButton: { onClick: () => handleDeleteVehicle(), loading: false, text: 'Confirmar' },
    cancelButton: { onClick: handleCancelDeleteVehicle, loading: false, text: 'Cancelar' },
    onClose: handleCancelDeleteVehicle,
  });

  useEffect(() => {
    if (!user) {
      redirect('/login');
    } else {
      setScreenLoading(false);
    }
  }, []);  

  return {
    screenLoading,
    user,
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
    secondChart,
  }    
}

export default useDashboard