"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleBtn } from "@/components/partials/toggle-btn"
import { Save } from "lucide-react"

interface NotificationSetting {
  title: string
  description: string
  type: "select" | "toggle"
  defaultValue?: string
}

const documentExpirySettings: NotificationSetting[] = [
  {
    title: "Vehicle Insurance",
    description: "Notify before vehicle insurance expires",
    type: "select",
    defaultValue: "15",
  },
  {
    title: "Pollution Certificate",
    description: "Notify before pollution certificate expires",
    type: "select",
    defaultValue: "15",
  },
  {
    title: "Commercial Permit",
    description: "Notify before commercial permit expires",
    type: "select",
    defaultValue: "30",
  },
]

const rentalSettings: NotificationSetting[] = [
  {
    title: "Rental Start",
    description: "Notify when a rental period starts",
    type: "toggle",
  },
  {
    title: "Rental End",
    description: "Notify when a rental period is about to end",
    type: "toggle",
  },
  {
    title: "Rental Overdue",
    description: "Notify when a vehicle return is overdue",
    type: "toggle",
  },
]

const systemSettings: NotificationSetting[] = [
  {
    title: "New Customer",
    description: "Notify when a new customer is registered",
    type: "toggle",
  },
  {
    title: "Payment Received",
    description: "Notify when a payment is received",
    type: "toggle",
  },
  {
    title: "System Updates",
    description: "Notify when system updates are available",
    type: "toggle",
  },
]

export function Notifications() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Document Expiry Notifications</h3>
        <div className="space-y-4">
          {documentExpirySettings.map((setting, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <Select defaultValue={setting.defaultValue}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 Days Before</SelectItem>
                  <SelectItem value="30">30 Days Before</SelectItem>
                  <SelectItem value="60">60 Days Before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Rental Notifications</h3>
        <div className="space-y-4">
          {rentalSettings.map((setting, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <ToggleBtn />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">System Notifications</h3>
        <div className="space-y-4">
          {systemSettings.map((setting, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <ToggleBtn />
            </div>
          ))}
        </div>
      </div>

      <Button className="mt-6">
        <Save className="mr-2 h-4 w-4" />
        Save Notification Settings
      </Button>
    </div>
  )
}
