"use client";
import { DataTable } from "@/components/CommonTable";
import { createCustomer, fetchCustomers } from "./customer.api";
import { useAxios } from "@/services/axios/axios.hook";
import React from "react";
import { CustomerDataCol } from "./customers.constant";
import { CreateCustomerForm } from "./partials/create-cutomer-form";
import { toast } from "react-toastify";
import { CreateCustomerDto } from "./customer.schema";

export default function Customers() {
  const { axios } = useAxios();
  const [createEntryDialogOpen, setCreateEntryDialogOpen] =
    React.useState(false);

  function createCustomerDialog({
    refetch: refectTableData,
  }: {
    refetch: any;
  }) {
    async function handleAddCustomers(data: CreateCustomerDto) {
      try {
        const response = await createCustomer(axios, data);

        if (response) {
          toast.success("Customer Created successfully");
        }
      } catch (error: any) {
        toast.error(error.message ?? "Something went wrong");
      } finally {
        setCreateEntryDialogOpen(false);
        refectTableData();
      }
    }
    return (
      <CreateCustomerForm
        onSubmit={handleAddCustomers}
        title={"Create Customer"}
        submitLabel="Create"
      />
    );
  }

  return (
    <DataTable
      title="Customers"
      fetcher={async (page: number, pageSize: number, searchquery: string) => {
        return await fetchCustomers(axios, page, pageSize, searchquery);
      }}
      queryKey={["customers"]}
      getColumns={CustomerDataCol}
      CreateEntryComponent={createCustomerDialog}
      createEntryDialogOpen={createEntryDialogOpen}
      setCreateEntryDialogOpen={setCreateEntryDialogOpen}
    />
  );
}
