"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  Phone,
  StarIcon,
  PhoneIcon as WhatsappIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useAxios } from "../../../../services/axios/axios.hook";
import { ViewEmployeeDialogSkeleton } from "./view-customer-skeleton";
import { CustomerDetail, RentalDetail } from "../customer.types";
import { DataTable } from "../../../../components/CommonTable";
import { getcustomerDetails } from "../customer.api";
import { CustomerRentalsCol } from "../customers.constant";

type EmployeeDrawerPropsType = {
  customerId: string;
};

export function ViewEmployeeDialog({ customerId }: EmployeeDrawerPropsType) {
  const { axios } = useAxios();
  const { data, isFetching } = useQuery<CustomerDetail>({
    queryKey: [`employee-${customerId}`],
    queryFn: async () => await getcustomerDetails(axios, customerId),
  });

  if (isFetching) return <ViewEmployeeDialogSkeleton />;

  return (
    <div className="px-8 space-y-10 h-[80vh] overflow-hidden">
      {/* Employee Name */}
      <h2 className="text-3xl font-semibold border-b pb-2">Customer Detail</h2>

      {/* Profile Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-6">
          <div className="relative ">
            <Avatar
              className="w-32 h-32 border-4  rounded-2xl"
              style={{ borderColor: "gray" }}
            >
              <AvatarImage
                src={
                  data?.profile ??
                  "https://cdn.hdsenterprise.com/static/profileImagePlaceholder.png"
                }
                alt="Employee"
              />
              <AvatarFallback className=" rounded-xl">
                {data?.full_name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-3 text-black font-semibold">
            <p className=" text-2xl font-bold"> {data?.full_name}</p>
            <p className=" text-lg">
              {new Date().getFullYear() -
                new Date(data?.date_of_birth ?? "").getFullYear()}
              yr, {data?.gender}
            </p>
            {/* <p className=" text-lg">DD/MM/YY- DD/MM/YY</p> */}
          </div>
        </div>
        <div className="space-y-3 text-right">
          <div className="grid gap-6 justify-end">
            <div className="flex items-center gap-2 text-lg  whitespace-nowrap">
              <span className="bg-black p-2 rounded-full">
                <Phone
                  size={15}
                  className="text-white text-xl fill-white    "
                />
              </span>
              <span>+91 {data?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-lg   whitespace-nowrap ">
              <span className="bg-black p-2 rounded-full">
                <MessageCircle
                  size={15}
                  className="text-white text-xl fill-white    "
                />
              </span>
              <span>+91 {data?.email}</span>
            </div>
          </div>
          <p className="text-black mt-4 text-lg flex items-center gap-2">
            Address:
            <span className="font-bold">{data?.address}</span>
          </p>
        </div>
      </div>

      {/* Employment History */}
      <div className="space-y-6 ">
        <h3
          className="text-2xl font-semibold border-b pb-2"
          style={{ borderColor: "gray" }}
        >
          Employment History
        </h3>

        <div className="overflow-y-scroll max-h-[50vh]">
          <DataTable
            title="Employee History"
            fetcher={async () => {
              if (data && data.rentals.length > 0) {
                return { rows: data.rentals, total: 0 };
              }
              return { rows: [], total: 0 };
            }}
            queryKey={["customerRental", customerId]}
            getColumns={CustomerRentalsCol}
          />
        </div>
      </div>
    </div>
  );
}
