import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, PenToolIcon as Tool, Fuel, Users, Banknote, Gauge } from "lucide-react"
import Image from "next/image"

// Enum types from your DTO
export enum VEHICLE_STATUS {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  MAINTENANCE = "MAINTENANCE",
  INACTIVE = "INACTIVE",
}

export enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  CNG = "CNG",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

// Vehicle interface based on your DTO
interface VehicleInfo {
  vehicle_number?: string
  brand?: string
  model?: string
  manufacture_year?: number
  vehicle_status?: VEHICLE_STATUS
  fuel_type?: FuelType
  seating_capacity?: number
  rental_price_per_day?: number
  color?: string
  mileage?: number
  insurance_valid_till?: Date
  pollution_valid_date?: Date
  last_service_date?: Date
  vehicle_image?: string
  registration_doc?: string
}

// Function to format date to a readable format
const formatDate = (date?: Date) => {
  if (!date) return "N/A"
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Function to get status badge color
const getStatusColor = (status?: VEHICLE_STATUS) => {
  if (!status) return "bg-gray-200"

  switch (status) {
    case VEHICLE_STATUS.AVAILABLE:
      return "bg-green-500 hover:bg-green-600"
    case VEHICLE_STATUS.RENTED:
      return "bg-blue-500 hover:bg-blue-600"
    case VEHICLE_STATUS.MAINTENANCE:
      return "bg-yellow-500 hover:bg-yellow-600"
    case VEHICLE_STATUS.INACTIVE:
      return "bg-red-500 hover:bg-red-600"
    default:
      return "bg-gray-200"
  }
}

export function VehicleInfoDisplay({ vehicle }: { vehicle: VehicleInfo }) {
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Top Row: Brand, Model, Number and Status */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-xl font-semibold text-muted-foreground mt-1">{vehicle.vehicle_number}</p>
          </div>
          {vehicle.vehicle_status && (
            <Badge className={`${getStatusColor(vehicle.vehicle_status)} text-lg px-4 py-1`}>
              {vehicle.vehicle_status}
            </Badge>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Second Row: Vehicle Image and Registration Doc Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Vehicle Image</h2>
          <div className="relative w-full h-64 rounded-lg overflow-hidden border">
            <Image
              src={vehicle.vehicle_image || "/placeholder.svg?height=400&width=600"}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">Registration Document</h2>
          <div className="relative w-full h-64 rounded-lg overflow-hidden border">
            <Image
              src={vehicle.registration_doc || "/placeholder.svg?height=400&width=600"}
              alt="Registration Document"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Third Row: All Other Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Basic Information</h2>

          <div className="grid grid-cols-2 gap-y-4">
            <p className="text-lg font-bold">Color:</p>
            <p className="text-lg">{vehicle.color || "N/A"}</p>

            <p className="text-lg font-bold">Year:</p>
            <p className="text-lg">{vehicle.manufacture_year || "N/A"}</p>

            <p className="text-lg font-bold flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Fuel Type:
            </p>
            <p className="text-lg">{vehicle.fuel_type || "N/A"}</p>

            <p className="text-lg font-bold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Seating:
            </p>
            <p className="text-lg">{vehicle.seating_capacity || "N/A"}</p>

            <p className="text-lg font-bold flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Mileage:
            </p>
            <p className="text-lg">{vehicle.mileage ? `${vehicle.mileage} km/l` : "N/A"}</p>
          </div>
        </div>

        {/* Rental & Maintenance Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Rental & Maintenance</h2>

          <div className="grid grid-cols-2 gap-y-4">
            <p className="text-lg font-bold flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              Daily Rate:
            </p>
            <p className="text-lg">
              {vehicle.rental_price_per_day ? `₹${vehicle.rental_price_per_day.toLocaleString()}/day` : "N/A"}
            </p>

            <p className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Insurance Valid Till:
            </p>
            <p className="text-lg">{formatDate(vehicle.insurance_valid_till)}</p>

            <p className="text-lg font-bold flex items-center gap-2">
              <Tool className="h-5 w-5" />
              Pollution Valid Till:
            </p>
            <p className="text-lg">{formatDate(vehicle.pollution_valid_date)}</p>
            <p className="text-lg font-bold flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Last Service:
            </p>
            <p className="text-lg">{formatDate(vehicle.last_service_date)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
