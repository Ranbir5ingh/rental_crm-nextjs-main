"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  createVehicleSchema,
  CreateVehicleDto,
  fuelTypeEnum,
  vehicleStatusEnum,
} from "../vehicle.schema";
import { useState, useTransition } from "react";
import FileUploadPlaceholder from "@/components/file-upload-placeholder";
import Image from "next/image";

interface AddCustomerDialogBoxProps {
  initialData?: CreateVehicleDto & { image: string };
  onSubmit: (data: CreateVehicleDto) => Promise<void>;
  submitLabel: string;
  title: string;
}

export function CreateVehicleForm({
  initialData,
  onSubmit,
  submitLabel,
  title,
}: AddCustomerDialogBoxProps) {
  const today = new Date();
  const insuranceMinDate = new Date(today.setFullYear(today.getFullYear() - 2));
  const lastServiceMinDate = new Date(
    today.setFullYear(today.getFullYear() - 1)
  );

  const [isPending, startTransition] = useTransition();
  const [vehicle_image, setVehicle_image] = useState<File | null>(null);
  const [registration_doc, setRegistration_doc] = useState<File | null>(null);

  const form = useForm<CreateVehicleDto>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          vehicle_image: undefined,
          registration_doc: undefined,
        }
      : {
          vehicle_number: "",
          brand: "",
          model: "",
          manufacture_year: 0,
          seating_capacity: 0,
          rental_price_per_day: 0,
          mileage: 0,
          color: "",
          insurance_valid_till: insuranceMinDate.toISOString(),
          last_service_date: lastServiceMinDate.toISOString(),
        },
    mode: "onChange",
  });

  async function handleSubmit(data: CreateVehicleDto) {
    startTransition(async () => {
      if (vehicle_image) data.vehicle_image = vehicle_image;
      if (registration_doc) data.registration_doc = registration_doc;
      await onSubmit(data);
    });
  }

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div className="w-full  mx-auto p-10 bg-white text-black rounded-lg ">
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {title}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, onError)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-11 lg:gap-40">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="vehicle_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold  text-lg">
                      Vehicle number
                    </FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder="eg: HRO8AG7598"
                          {...field}
                          className="pl-8 bg-gray-100 uppercase"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">Brand</FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder="eg: Toyota"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">Modal</FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder="eg: Fortuner"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manufacture_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Manufacture Year
                    </FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          type="number"
                          placeholder="eg: 2003"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">Color</FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder="eg: White, Black"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rental_price_per_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Rental Price / day
                    </FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          type="number"
                          placeholder="eg: 2500"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="fuel_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Fuel Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-gray-100">
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fuelTypeEnum.options.map((type, index) => (
                            <SelectItem
                              value={type}
                              key={index}
                              className="capitalize"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicle_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Vehicle Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-gray-100">
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleStatusEnum.options.map((type, index) => (
                            <SelectItem
                              value={type}
                              key={index}
                              className="capitalize"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="seating_capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Seating Capacity
                      </FormLabel>
                      <FormControl className="relative">
                        <div>
                          <Input
                            type="number"
                            placeholder="eg: 7"
                            {...field}
                            className="pl-8 bg-gray-100"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Mileage
                      </FormLabel>
                      <FormControl className="relative">
                        <div>
                          <Input
                            type="number"
                            placeholder="eg: 50"
                            {...field}
                            className="pl-8 bg-gray-100"
                          />
                          <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-col-1  gap-4 items-center">
                <FormField
                  control={form.control}
                  name="insurance_valid_till"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="font-bold text-lg">
                          Insuraance Valid date
                        </p>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : insuranceMinDate.toISOString().split("T")[0]
                            }
                            className="bg-gray-300 grid"
                            onInput={(e: any) => {
                              const inputValue = e.target.value;
                              const selectedDate = new Date(inputValue);
                              field.onChange(selectedDate?.toISOString());
                            }}
                          />
                        </FormControl>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pollution_valid_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="font-bold text-lg">
                          Pollution Valid date
                        </p>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : insuranceMinDate.toISOString().split("T")[0]
                            }
                            className="bg-gray-300 grid"
                            onInput={(e: any) => {
                              const inputValue = e.target.value;
                              const selectedDate = new Date(inputValue);
                              field.onChange(selectedDate?.toISOString());
                            }}
                          />
                        </FormControl>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_service_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="font-bold text-base sm:text-lg">Last Service date</p>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : lastServiceMinDate.toISOString().split("T")[0]
                            }
                            className="bg-gray-300 grid"
                            onInput={(e: any) => {
                              const inputValue = e.target.value;
                              const selectedDate = new Date(inputValue);
                              field.onChange(selectedDate?.toISOString());
                            }}
                          />
                        </FormControl>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="vehicle_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-base sm:text-lg">
                        Upload Car Photo
                      </FormLabel>

                      <FormControl>
                        <label className=" block h-[180px]">
                          <div className="border-2 border-dashed w-full rounded-lg text-center cursor-pointe h-full aspect-[3/4]  transition-colors flex justify-center items-center">
                            {initialData?.vehicle_image || vehicle_image ? (
                              <div className="relative w-full  m-auto aspect-video ">
                                <img
                                  src={
                                    (vehicle_image &&
                                      URL.createObjectURL(vehicle_image)) ??
                                    initialData?.vehicle_image ??
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="rounded-md object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <FileUploadPlaceholder />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setVehicle_image(file);
                                }
                              }}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registration_doc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-base sm:text-lg">
                        Upload Registration Photo
                      </FormLabel>

                      <FormControl>
                        <label className=" block h-[180px]">
                          <div className="border-2 border-dashed w-full rounded-lg text-center cursor-pointe h-full aspect-[3/4]  transition-colors flex justify-center items-center">
                            {initialData?.registration_doc ||
                            registration_doc ? (
                              <div className="relative w-full  m-auto aspect-video ">
                                <img
                                  src={
                                    (registration_doc &&
                                      URL.createObjectURL(registration_doc)) ??
                                    initialData?.registration_doc ??
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="rounded-md object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <FileUploadPlaceholder />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setRegistration_doc(file);
                                }
                              }}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              // onClick={() => form.handleSubmit(onSubmit)}
              className="w-80 bg-black text-white hover:bg-gray-700 font-bold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  {submitLabel == "Update" ? "Updating" : "Submitting"}
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}