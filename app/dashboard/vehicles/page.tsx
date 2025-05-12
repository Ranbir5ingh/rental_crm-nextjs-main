"use client";
import { toast } from "react-toastify";
import { CreateVehicleDto } from "./vehicle.schema";
import { createVehicle, fetchVehicle } from "./vehicle.api";
import { useAxios } from "@/services/axios/axios.hook";
import { useState } from "react";
import { CreateVehicleForm } from "./partials/create-vehicle-form";
import { VehicleDataCol } from "./vehicle.constant";
import { DataTable } from "@/components/CommonTable";

export default function Vehicles() {
  const { axios } = useAxios();
  const [createVehicleDialogOpen, setCreateVehicleDialogOpen] = useState(false);

  function CreateVehicleComponent({
    refetch: refechVehicleData,
  }: {
    refetch: any;
  }) {
    async function submitVehicleHandler(data: CreateVehicleDto) {
      try {
        const response = await createVehicle(axios, data);
        if (response) toast.success("Vehicle Added Successfully");
      } catch (error: any) {
        toast.error(error.message + "something went wrong");
      } finally {
        setCreateVehicleDialogOpen(false);
        refechVehicleData();
      }
    }

    return (
      <CreateVehicleForm
        title="Create Vehicle"
        submitLabel="Submit"
        onSubmit={submitVehicleHandler}
      />
    );
  }
  return (
    <DataTable
      title="Vehicles"
      fetcher={async (page, pageSize, searchInput) => {
        return await fetchVehicle(axios, page, pageSize, searchInput);
      }}
      queryKey={["Vehicles"]}
      getColumns={VehicleDataCol}
      CreateEntryComponent={CreateVehicleComponent}
      createEntryDialogOpen={createVehicleDialogOpen}
      setCreateEntryDialogOpen={setCreateVehicleDialogOpen}
    />
  );
}
