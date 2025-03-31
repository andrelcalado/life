"use client";

import Image from "next/image";
import useDashboard from "./useDashboard";
import { IoMdAdd } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toggle from "@/components/Toggle";
import ConfirmDialog from "@/components/ConfirmDialog";
import VehicleModal from "@/components/VehicleModal";
import { Chart } from "@/components/Chart";
import BigNumberLabel from "@/components/BigNumberLabel";
import Badge from "@/components/Badge";
import { datetimeToString } from "@/utils/dateFormat";
import MapTracking from "@/components/MapTracking";

export default function Home() {
  const {
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
    handleCloseMapTracking,
  } = useDashboard();

  const vehiclesDataFiltered = vehiclesData?.filter((eachVehicle) =>
    String(eachVehicle.user).includes(search.toLowerCase())
    || eachVehicle.placa.toLowerCase().includes(search.toLowerCase())
    || eachVehicle.codigo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Loading fixed size="lg" loading={screenLoading} />
      <Header />

      <main className="w-full h-full bg-gray-100 pt-[76px] pb-10">
        <ConfirmDialog {...confirmDialog} />
        <VehicleModal
          vehicleToEdit={vehicleToEdit}
          openModal={vehicleModal}
          onClose={() => setVehicleModal(false)}
          loadVehicles={loadVehicles}
          setScreenFeedback={setScreenFeedback}
        />
        <MapTracking onClose={handleCloseMapTracking} {...mapTracking} />

        <section className="w-full max-w-[750px] mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Estatísticas dos Veículos
          </h2>

          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 pr-10 border-r mr-4 border-gray-200">
              <div className="p-6 border-r border-b border-gray-200">
                <BigNumberLabel
                  label="Total"
                  bigNumber={vehiclesData?.length}
                />
              </div>
              <div className="p-6 border-b border-gray-200">
                <BigNumberLabel
                  label="Sem status"
                  bigNumber={vehiclesData?.filter((eachVehicle) => !eachVehicle.is_active && !eachVehicle.is_online).length}
                />
              </div>
              <div className="p-6 border-r border-gray-200">
                <BigNumberLabel
                  label="Ativos"
                  bigNumber={vehiclesData?.filter((eachVehicle) => eachVehicle.is_active).length}
                />
              </div>
              <div className="p-6">
                <BigNumberLabel
                  label="Online"
                  bigNumber={vehiclesData?.filter((eachVehicle) => eachVehicle.is_online).length}
                />
              </div>
            </div>
            <Chart options={firstChart.options} series={firstChart.series} type="donut" width={380} height={380} />
          </div>
        </section>

        <section className="w-full max-w-[1220px] mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
          <Badge variation={screenFeedback.type} size="md" mode="fixed" visibility={screenFeedback.visible}>
            {screenFeedback.message}
          </Badge>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold">Veículos</h2>

            <ul className="flex gap-2 items-center">
              <li>
                <Button
                  onClick={() => {
                    setVehicleToEdit(undefined);
                    setVehicleModal(true);
                  }}
                  prefix={<IoMdAdd size={15} />}
                />
              </li>
              <li>
                <Button className="max-h-[31px]" variation="border" prefix={<GrUpdate size={15} />} />
              </li>
            </ul>
          </div>

          <div className="mb-8 flex items-center justify-between gap-4">
            <Input
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              placeholder="Pesquise pela placa, motorista ou código"
              className="w-full"
            />

            <p className="shrink-0 text-sm text-gray-700 h-fit">
              Total <strong>({vehiclesDataFiltered.length})</strong>
            </p>
          </div>

          {vehiclesDataFiltered.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-sm font-medium text-gray-800 rounded-lg overflow-hidden">
                  <td className="py-3 px-2">Código</td>
                  <td>Motorista</td>
                  <td>Placa</td>
                  <td>Último rastreamento</td>
                  <td>Última data</td>
                  <td>Última latitude</td>
                  <td>Última longitude</td>
                  <td>Ativo</td>
                  <td>Online</td>
                  <td>Ações</td>
                </tr>
              </thead>

              <tbody>
                {vehiclesDataFiltered.map((vehicle, key) => (
                  <tr key={key} className="text-sm pb-2 border-b border-gray-200 text-gray-700">
                    <td className="py-4 px-4">{vehicle.codigo}</td>
                    <td>{vehicle.user}</td>
                    <td>{vehicle.placa}</td>
                    <td>{vehicle.ultimo_rastreamento && datetimeToString(vehicle.ultimo_rastreamento)}</td>
                    <td>{vehicle.ultima_data && datetimeToString(vehicle.ultima_data)}</td>
                    <td>{vehicle.ultima_latitude}</td>
                    <td>{vehicle.ultima_longitude}</td>
                    <td>
                      <Toggle active={vehicle.is_active} variation="primary" />
                    </td>
                    <td>
                      <Toggle active={vehicle.is_online} />
                    </td>
                    <td className="flex gap-1 py-2">
                      <Button
                        size="xs"
                        prefix={<MdEdit size={15} />}
                        onClick={() => {
                          setVehicleToEdit(vehicle);
                          setVehicleModal(true);
                        }}
                      />
                      <Button
                        size="xs"
                        variation="border"
                        prefix={<FaEye size={15} />}
                        onClick={() => handleOpenMapTracking(vehicle)}
                        disabled={!vehicle.ultima_latitude || !vehicle.ultima_longitude}
                      />
                      <Button
                        size="xs"
                        variation="solid-dangerous"
                        prefix={<MdDelete size={15} />}
                        onClick={() => {
                          setConfirmDialog((prev) => ({
                            ...prev,
                            openDialog: true,
                            confirmButton: { onClick: () => handleDeleteVehicle(vehicle.id), loading: false, text: 'Confirmar' },
                            title: 'Excluir veículo',
                            desc: `Tem certeza que deseja excluir o veículo ${vehicle.codigo}?`
                          }));
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex flex-col items-center justify-center bg-gray-50 py-4 rounded-lg border-dashed border-2 pt-0 border-gray-300">
              <Image
                src={search.length > 0 ? "/assets/images/not-found.svg" : "/assets/images/empty-data.svg"}
                alt="Dados vazios"
                width={300}
                height={300}
              />
              <h3 className="text-lg font-semibold text-gray-700">{search.length > 0 ? "Nenhum veículo encontrado" : "Nenhum veículo cadastrado"}</h3>
              <p className="max-w-[300px] text-sm text-center">{search.length > 0 ? "Verifique os dados informados ou cadastre um novo veículo" : 'Clique em "Cadastrar" para cadastrar um veículo'}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
