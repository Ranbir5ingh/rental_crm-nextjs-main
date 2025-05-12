"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Car,
  FileText,
  CreditCard,
  Settings,
  Map,
  CheckSquare,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
// import { useSupabase } from "@/components/providers/supabase-provider"
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useSupabase } from "@/services/supabase/supabase.hook";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const { logout } = useSupabase();

  const routes: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/customers", label: "Customers", icon: Users },
    { href: "/dashboard/vehicles", label: "Vehicles", icon: Car },
    { href: "/dashboard/rentals", label: "Rentals", icon: FileText },
    { href: "/dashboard/finance", label: "Finance", icon: CreditCard },
    // { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await logout();

      toast({
        title: "Signed out successfully",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again.",
      });
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VehicleCRM</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href} className="py-2 ">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === route.href}
                  tooltip={route.label}
                  className="bg-transparent"
                >
                  <Link
                    href={route.href}
                    className="flex items-center gap-2 text-2xl"
                  >
                    <route.icon className="mr-2 h-8 w-8" />
                    <span className="text-lg">{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Sign out</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Admin User</span>
                    <span className="text-xs text-muted-foreground">
                      admin@example.com
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="w-full overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2 px-4 py-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VehicleCRM</span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
