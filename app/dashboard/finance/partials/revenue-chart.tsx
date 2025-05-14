import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { graphEntry } from "../finance.types";

interface chartProp {
  monthlyRevenue: graphEntry[];
}
export default function RevenueChart({ monthlyRevenue }: chartProp) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly revenue and expenses
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyRevenue}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => [`₹${value}`, ""]} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill="#0088FE" />
            <Bar dataKey="expenses" name="Expenses" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
