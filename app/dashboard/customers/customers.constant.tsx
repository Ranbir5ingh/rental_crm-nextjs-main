import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { Edit, Eye, Mail, Phone, User, UserRoundPen } from "lucide-react";

import { CreateCustomerForm } from "./partials/create-cutomer-form";
import { CreateCustomerDto } from "./customer.schema";
=======
import { Eye, Mail, Phone, User, UserRoundPen } from "lucide-react";
import  CreateCustomerForm  from "./partials/create-cutomer-form";
>>>>>>> parent of 3b560b4 (Revert "performance update")
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateCustomer } from "./customer.api";
import { useAxios } from "@/services/axios/axios.hook";
import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";
import { ViewEmployeeDialog } from "./partials/view-customer-dialog";

export const CustomerDataCol = (refect: any): ColumnDef<any>[] => {
  return [
    {
      header: "S/N",
      accessorFn: (_, index) => index + 1,
      size: 4,
    },
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              {" "}
              {/* 👈 smaller avatar */}
              {row.original.profile ? (
                <AvatarImage
                  src={row.original.profile}
                  alt={row.original.full_name}
                />
              ) : (
                <AvatarFallback className="bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{row.original.full_name}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className="flex items-center text-sm">
              <Phone className="mr-2 h-3 w-3" />
              {row.original.phone}
            </div>
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-3 w-3" />
              {row.original.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "dob",
      header: "DOB",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              {row.original.date_of_birth}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        return (
          <div>
            <div className="font-medium"> {row.original.address}</div>
            <div className="text-sm text-muted-foreground"></div>
          </div>
        );
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        return (
          <div>
            <div className="font-medium"> {row.original.gender}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div>
            <div
              className={`font-bold ${
                row.original.status == "ACTIVE"
                  ? "text-green-500"
                  : row.original.status == "UNACTIVE"
                  ? "text-gray-500"
                  : "text-red-500"
              }`}
            >
              {row.original.status}
            </div>
          </div>
        );
      },
    },
    {
      header: "Actions",
      accessorFn: (row) => row,
      cell: ({ row }) => {
        const { axios } = useAxios();
        const [updateDialog, setupdateDialog] = useState(false);
        async function handleEditCustomers(data: CreateCustomerDto) {
          try {
            const res = await updateCustomer(axios, data, row.original.id);
            if (res) toast.success("Customer Updated Successfully");
          } catch (error: any) {
            toast.error(error?.message + "something went wrong");
          } finally {
            setupdateDialog(false);
            refect();
          }
        }
        return (
          <div className="flex gap-3 justify-center  ">
            <Dialog>
              <DialogTrigger className="flex items-center p-1.5 text-black bg-white rounded-sm">
                <Eye className=" h-4 w-4" />
              </DialogTrigger>
              <DialogContent className="w-full min-w-[70vw] bg-white text-black">
                <DialogTitle className="hidden"></DialogTitle>
                <ViewEmployeeDialog customerId={row.original.id} />
              </DialogContent>
            </Dialog>
            <Dialog
              modal={false}
              open={updateDialog}
              onOpenChange={setupdateDialog}
            >
              <DialogTrigger
                asChild
                className="flex items-center p-1.5 bg-gray-200 text-black rounded-sm"
              >
                <UserRoundPen
                  className="h-8 w-8"
                  onClick={() => setupdateDialog(true)}
                />
              </DialogTrigger>
              <DialogContent className="w-full min-w-[70vw] bg-white text-black">
                <DialogTitle className="hidden"></DialogTitle>

                <CreateCustomerForm
                  title="Update Customer"
                  submitLabel="Update"
                  onSubmit={handleEditCustomers}
                  initialData={row.original}
                />
              </DialogContent>
            </Dialog>
          </div>
        );
      },
      size: 10,
    },
  ];
};

export const CustomerRentalsCol = (refect: any): ColumnDef<any>[] => {
  return [
    {
      header: "S/N",
      accessorFn: (_, index) => index + 1,
      size: 4,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className=" items-center text-sm">{row.original.title}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className="flex items-center text-sm">
              {row.original.vehicles.brand}{" ("}{row.original.vehicles.vehicle_number}{")"}
            </div>
            <div className="flex items-center text-sm">
              {row.original.vehicles.model}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className=" items-center text-sm">
              {row.original.startDate} {"-"}
            </div>
            <div className=" items-center text-sm">{row.original.endDate}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "total amount",
      header: "Total Amount",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 text-center">
            <div className="items-center text-sm">
              {row.original.totalAmount}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "advance",
      header: "Advance",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className=" items-center text-sm">{row.original.advance}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "Due Amount",
      header: "due amount",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className=" items-center text-sm">
              {parseInt(row.original.totalAmount) -
                parseInt(row.original.advance)}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div>
            <div
              className={`font-bold ${
                row.original.status == "CREATED"
                  ? "text-orange-500"
                  : row.original.status == "COMPLETED"
                  ? "text-green-500"
                  : row.original.status == "INPROGRESS"
                  ? "text-blue-600"
                  : "text-red-500"
              }`}
            >
              {row.original.status}
            </div>
          </div>
        );
      },
    },
  ];
};
