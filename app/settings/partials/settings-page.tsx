"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { General } from "./general"
import { UserManagement } from "./user-management"
import { Notifications } from "./notifications"
import { Security } from "./security"

export function SettingsPage() {
  return (
    <div className="flex flex-col p-4 md:p-10 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <General />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Notifications />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
      </Tabs>
    </div>
  )
}
