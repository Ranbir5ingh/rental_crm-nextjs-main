"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Trash,
  Ban,
  Copy,
  FileText,
  User,
  Phone,
  MapPin,
  Calendar,
  Car,
  Palette,
  Hash,
  Users,
  DollarSign,
  Clock,
  Tag,
  FileTextIcon as FileText2,
  CreditCard,
  CheckCircle2,
  PlayCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import ViewRentalSkeleton from "./skeleton";
import { RentalDto, statusDto } from "../../../rental.dto";

type viewRentalProps = {
  rentalData: RentalDto | null;
  isLoading: boolean;
  isPending: boolean;
  changeStatusHandler: (status: statusDto) => void;
};

export default function RentalsDetailView({
  rentalData,
  isLoading,
  changeStatusHandler,
  isPending,
}: viewRentalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CREATED":
        return "bg-blue-100 text-blue-800 border-blue-800";
      case "INPROGRESS":
        return "bg-green-100 text-green-800 border-green-700";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800 border-purple-600";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-800";
      case "DELETED":
        return "bg-red-100 text-red-800 border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  };

  if (isLoading) return <ViewRentalSkeleton />;

  console.log({ rentalData });
  return (
    <div className="p-10 grid grid-cols-1 gap-6 w-full max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Rental Details</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="flex items-center text-xl border-2 border-gray-700 gap-1"
            disabled={isPending}
          >
            <FileText className="w-4 h-4" /> Invoice
          </Button>

          {rentalData?.status !== "COMPLETED" &&
            rentalData?.status !== "CANCELLED" &&
            rentalData?.status !== "DELETED" && (
              <>
                <Button
                  variant="destructive"
                  className="flex items-center text-xl gap-1"
                  disabled={isPending}
                  onClick={() => changeStatusHandler("CANCELLED")}
                >
                  <Ban className="w-4 h-4" /> Cancel
                </Button>

                {rentalData && (
                  <Button
                    variant="destructive"
                    className="flex items-center text-xl gap-1"
                    disabled={isPending}
                    onClick={() => changeStatusHandler("DELETED")}
                  >
                    <Trash className="w-4 h-4" /> Delete
                  </Button>
                )}
              </>
            )}
        </div>
      </div>

      {/* Status Badge */}
      {rentalData ? (
        <>
          <div className="flex items-center gap-2">
            {rentalData?.status && (
              <p
                className={`text-[16px] font-bold border-2 px-3 py-1 rounded-sm ${getStatusColor(
                  rentalData.status
                )}`}
              >
                {rentalData.status}
              </p>
            )}
            <span className="text-sm text-gray-500">
              ID: {rentalData?.id?.substring(0, 8)}...
            </span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* customers Details */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" /> Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {/* vehicles Image */}
                  {rentalData?.customers.profile ? (
                    <div className="relative h-72 w-72 rounded-full  overflow-hidden bg-gray-200">
                      <Image
                        src={rentalData.customers.profile || "/placeholder.svg"}
                        alt="vehicles"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}

                  {/* customers Info */}
                  <div className="mt-8">
                    <div className="flex items-center gap-2 p-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Full Name:</p>
                      <p className="font-medium">
                        {rentalData?.customers?.full_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Phone:</p>
                      <p className="font-medium">
                        {rentalData?.customers?.phone}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Address:</p>
                      <p className="font-medium">
                        {rentalData?.customers?.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">DOB</p>
                      <p className="font-medium">
                        {rentalData?.customers?.date_of_birth}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* vehicles Details */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Car className="w-5 h-5 text-gray-500" /> Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {/* vehicles Image */}
                  {rentalData?.vehicles?.vehicle_image && (
                    <div className="relative w-full h-70 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={
                          rentalData.vehicles.vehicle_image ||
                          "/placeholder.svg"
                        }
                        alt="vehicles"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 p-2">
                      <Car className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Brand:</p>
                      <p className="font-medium">
                        {rentalData?.vehicles?.brand}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Model:</p>
                      <p className="font-medium">
                        {rentalData?.vehicles?.model}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Palette className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Color:</p>
                      <p className="font-medium">
                        {rentalData?.vehicles?.color}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Vehicle Number:</p>
                      <p className="font-medium">
                        {rentalData?.vehicles?.vehicle_number}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">Seating Capacity:</p>
                      <p className="font-medium">
                        {rentalData?.vehicles?.seating_capacity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-500 text-xl">
                        Rental Price per Day:
                      </p>
                      <p className="font-medium text-red-500">
                        ₹{rentalData?.vehicles?.rental_price_per_day}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rental Details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <FileText2 className="w-5 h-5 text-gray-500" /> Rental
                Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Title:</p>
                  <p className="font-medium">{rentalData?.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Description:</p>
                  <p className="font-medium">{rentalData?.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Created At:</p>
                  <p className="font-medium">
                    {rentalData?.created_at
                      ? formatDate(rentalData.created_at)
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Start Date:</p>
                  <p className="font-medium">
                    {rentalData?.startDate
                      ? formatDate(rentalData.startDate)
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">End Date:</p>
                  <p className="font-medium">
                    {rentalData?.endDate ? formatDate(rentalData.endDate) : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Total Amount:</p>
                  <p className="font-medium">₹{rentalData?.totalAmount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Advance Payment:</p>
                  <p className="font-medium">₹{rentalData?.advance}</p>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Balance Due:</p>
                  <p className="font-medium text-red-500">
                    ₹
                    {rentalData.status == "CREATED" ||
                    rentalData.status == "INPROGRESS"
                      ? rentalData?.totalAmount - rentalData?.advance
                      : "____"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-sm">Duration:</p>
                  <p className="font-medium">
                    {rentalData?.endDate && rentalData?.startDate
                      ? Math.ceil(
                          (new Date(rentalData.endDate).getTime() -
                            new Date(rentalData.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : " "}{" "}
                    days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg md:static md:shadow-none md:border-0 md:bg-transparent md:p-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-3 max-w-full mx-auto">
              {rentalData?.status === "CREATED" && (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  onClick={() => changeStatusHandler("INPROGRESS")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      {"Updating"}
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      {"Start"}
                    </>
                  )}
                </Button>
              )}

              {rentalData?.status === "INPROGRESS" && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                  onClick={() => changeStatusHandler("COMPLETED")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      {"Updating"}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> {"COMPLETE"}
                    </>
                  )}
                </Button>
              )}

              {/* <Button variant="outline" className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Generate Receipt
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Report Issue
              </Button> */}
            </div>
          </div>
        </>
      ) : (
        <h2>NO data found</h2>
      )}
    </div>
  );
}
