"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// const data = [
//   { name: "Available", value: 12, color: "#22c55e" },
//   { name: "Rented", value: 3, color: "#3b82f6" },
//   { name: "Maintenance", value: 2, color: "#f59e0b" },
//   { name: "Inactive", value: 1, color: "#ef4444" },
// ];
const data = [
  { vehicle_status: "AVAILABLE", count: 12 },
  { vehicle_status: "MAINTENANCE", count: 5 },
  { vehicle_status: "RENTAL", count: 10 },
  { vehicle_status: "INACTIVE", count: 2 },
];
function getColor(color: string) {
  switch (color) {
    case "AVAILABLE":
      return "#22c55e";
    case "RENTAL":
      return "#3b82f6";
    case "MAINTENANCE":
      return "#f59e0b";
    case "INACTIVE":
      return "#ef4444";
    default:
      break;
  }
}

interface props {
  vehicle_status: string;
  count: number;
}
export function VehicleStatus({ graphData }: { graphData: props[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Status</CardTitle>
        <p className="text-sm text-muted-foreground ">
          Current status of your vehicle fleet
        </p>
      </CardHeader>
      <CardContent>
        {graphData && graphData.length > 0 ? (
          <div className="h-[300px] w-full capitalize ">
            <ResponsiveContainer width="100%" height="100%" className="m-1">
              <PieChart>
                <Pie
                  data={graphData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  label={({ percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {graphData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColor(entry.vehicle_status)}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value} vehicles`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.map((item) => (
                <div
                  key={item.vehicle_status}
                  className="flex items-center gap-1"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: getColor(item.vehicle_status) }}
                  />
                  <span className="text-xs">{item.vehicle_status}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[300px] w-full capitalize">
            <p>No Data Found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
