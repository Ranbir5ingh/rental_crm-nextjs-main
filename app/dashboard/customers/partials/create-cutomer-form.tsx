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

import { CreateCustomerDto, CreateCustomerSchema } from "../customer.schema";
import { useState, useTransition } from "react";
import FileUploadPlaceholder from "@/components/file-upload-placeholder";
import Image from "next/image";

interface AddCustomerDialogBoxProps {
  initialData?: CreateCustomerDto & { image: string };
  onSubmit: (data: CreateCustomerDto) => Promise<void>;
  submitLabel: string;
  title: string;
}

export function CreateCustomerForm({
  initialData,
  onSubmit,
  submitLabel,
  title,
}: AddCustomerDialogBoxProps) {
  const today = new Date();
  const minDate = new Date(today.setFullYear(today.getFullYear() - 18));
  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState<File | null>(null);
  const [aadharFront, setAadharFront] = useState<File | null>(null);
  const [aadharBack, setAadharBack] = useState<File | null>(null);
  const [drivingLic, setDrivingLic] = useState<File | null>(null);
  const form = useForm<CreateCustomerDto>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          aadharFront: undefined,
          aadharBack: undefined,
          drivingLic: undefined,
          profile: undefined,
        }
      : {
          full_name: "",
          email: "",
          phone: "",
          address: "",
          date_of_birth: minDate.toISOString(),
        },
    mode: "onChange",
  });

  async function handleSubmit(data: CreateCustomerDto) {
    startTransition(async () => {
      if (profile) data.profile = profile;
      if (aadharFront) data.aadharFront = aadharFront;
      if (aadharBack) data.aadharBack = aadharBack;
      if (drivingLic) data.drivingLic = drivingLic;

      await onSubmit(data);
    });
  }


  return (
    <div className="w-full  mx-auto p-10 bg-white text-black rounded-lg ">
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {title}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-11 lg:gap-40">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Upload Customer Photo
                    </FormLabel>

                    <FormControl>
                      <label className=" w-1/2 flex flex-col justify-center items-center h-1/2 py-4 rounded-full ">
                        {initialData?.profile || profile ? (
                          <img
                            src={
                              (profile && URL.createObjectURL(profile)) ??
                              initialData?.profile ??
                              "/placeholder.svg"
                            }
                            alt="Preview"
                            className=" h-36 w-36 aspect-square object-cover rounded-full border-2"
                          />
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
                              setProfile(file);
                            }
                          }}
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold  text-lg">
                      Full Name
                    </FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder="Enter name"
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
                key="phone"
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold  text-lg">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          disabled
                          value="+91"
                          className="w-16 bg-gray-100"
                        />
                        <Input
                          {...field}
                          key="phone"
                          placeholder="Enter phone no."
                          type="tel"
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold  text-lg">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          key="email"
                          placeholder="Enter Email"
                          type="email"
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Address"
                        className="resize-none bg-gray-100"
                        {...field}
                      />
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Gender
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
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Status
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
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="BLACKLISTED">
                            Blacklisted
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="font-bold text-lg">Date of Birth</p>
                        <FormControl>
                          {/* <Popover>
												<PopoverTrigger asChild>
													<FormConrol>
														<Button
															variant="outline"
															className={cn(
																"w-full pl-3 text-left font-normal",
																!field.value &&
																	"text-muted-foreground",
															)}
														>
															{field.value ? (
																format(new Date(field.value), "PPP")
															) : (
																<span>DD/MM/YYYY</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto p-0"
													align="start"
												>
													<Calendar
														mode="single"
														selected={
															field.value
																? new Date(field.value)
																: minDate
														}
														onSelect={(date) => {
															alert("clicked");
															field.onChange(date?.toISOString());
														}}
														disabled={(date: Date) => {
															return (
																date > new Date() || date > minDate
															);
														}}
														initialFocus
														defaultMonth={minDate}
													/>
												</PopoverContent>
											</Popover> */}

                          <Input
                            type="date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : minDate.toISOString().split("T")[0]
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
                  name="aadharFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Upload Addhar Front photo
                      </FormLabel>

                      <FormControl>
                        <label className=" block h-[180px]">
                          <div className="border-2 border-dashed w-full rounded-lg text-center cursor-pointe h-full aspect-[3/4]  transition-colors flex justify-center items-center">
                            {initialData?.aadharFront || aadharFront ? (
                              <div className="relative w-full  m-auto aspect-video ">
                                <img
                                  src={
                                    (aadharFront &&
                                      URL.createObjectURL(aadharFront)) ??
                                    initialData?.aadharFront ??
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
                                  setAadharFront(file);
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
                  name="aadharBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Upload Addhar Back photo
                      </FormLabel>

                      <FormControl>
                        <label className=" block h-[180px]">
                          <div className="border-2 border-dashed w-full rounded-lg text-center cursor-pointe h-full aspect-[3/4]  transition-colors flex justify-center items-center">
                            {initialData?.aadharBack || aadharBack ? (
                              <div className="relative w-full  m-auto aspect-video ">
                                <img
                                  src={
                                    (aadharBack &&
                                      URL.createObjectURL(aadharBack)) ??
                                    initialData?.aadharBack ??
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
                                  setAadharBack(file);
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
              <FormField
                control={form.control}
                name="drivingLic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Upload driving Licence photo
                    </FormLabel>

                    <FormControl>
                      <label className=" block h-[200px]">
                        <div className="relative border-2 border-dashed w-full rounded-lg text-center cursor-pointe h-full overflow-hidden  aspect-[3/4]  transition-colors flex justify-center items-center">
                          {initialData?.drivingLic || drivingLic ? (
                            <div className="relative w-full  m-auto aspect-video  ">
                              <img
                                src={
                                  (drivingLic &&
                                    URL.createObjectURL(drivingLic)) ??
                                  initialData?.drivingLic ??
                                  "/placeholder.svg"
                                }
                                alt="Preview"
                                className="rounded-md aspect-square object-cover"
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
                                setDrivingLic(file);
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

          <div className="flex justify-center mb-10">
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
