"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash, Save, Plus } from "lucide-react"

interface User {
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
}

interface Permission {
  module: string
  admin: string
  manager: string
  employee: string
}

// Mock API functions
const fetchUsers = async (): Promise<User[]> => {
  return [
    {
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2023-03-05 10:30 AM",
    },
    {
      name: "Manager User",
      email: "manager@example.com",
      role: "manager",
      status: "active",
      lastLogin: "2023-03-04 09:15 AM",
    },
    {
      name: "Employee One",
      email: "employee1@example.com",
      role: "employee",
      status: "active",
      lastLogin: "2023-03-05 08:45 AM",
    },
    {
      name: "Employee Two",
      email: "employee2@example.com",
      role: "employee",
      status: "inactive",
      lastLogin: "2023-02-28 11:20 AM",
    },
  ]
}

const fetchPermissions = async (): Promise<Permission[]> => {
  return [
    {
      module: "Customer Management",
      admin: "Full Access",
      manager: "Full Access",
      employee: "View Only",
    },
    {
      module: "Vehicle Management",
      admin: "Full Access",
      manager: "Full Access",
      employee: "View Only",
    },
    {
      module: "Rental Management",
      admin: "Full Access",
      manager: "Full Access",
      employee: "Create, View",
    },
    {
      module: "Document Verification",
      admin: "Full Access",
      manager: "Full Access",
      employee: "Upload, View",
    },
    {
      module: "Financial Management",
      admin: "Full Access",
      manager: "View Only",
      employee: "No Access",
    },
    {
      module: "User Management",
      admin: "Full Access",
      manager: "No Access",
      employee: "No Access",
    },
  ]
}

export function UserManagement() {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const { data: permissions = [] } = useQuery({
    queryKey: ["permissions"],
    queryFn: fetchPermissions,
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10">{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Employee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.module}</TableCell>
                    <TableCell>{permission.admin}</TableCell>
                    <TableCell>{permission.manager}</TableCell>
                    <TableCell>{permission.employee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button className="mt-4">
            <Save className="mr-2 h-4 w-4" />
            Save Permissions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
