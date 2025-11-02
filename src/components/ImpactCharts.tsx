import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
import { useState } from "react";

// Mock data for different time ranges
const monthlyData3M = [
  { month: "Apr", sold: 378, donated: 124 },
  { month: "May", sold: 425, donated: 156 },
  { month: "Jun", sold: 398, donated: 142 },
];

const monthlyData6M = [
  { month: "Jan", sold: 245, donated: 89 },
  { month: "Feb", sold: 312, donated: 102 },
  { month: "Mar", sold: 289, donated: 95 },
  { month: "Apr", sold: 378, donated: 124 },
  { month: "May", sold: 425, donated: 156 },
  { month: "Jun", sold: 398, donated: 142 },
];

const monthlyData1Y = [
  { month: "Jul", sold: 189, donated: 67 },
  { month: "Aug", sold: 223, donated: 78 },
  { month: "Sep", sold: 267, donated: 84 },
  { month: "Oct", sold: 312, donated: 98 },
  { month: "Nov", sold: 278, donated: 91 },
  { month: "Dec", sold: 298, donated: 103 },
  { month: "Jan", sold: 245, donated: 89 },
  { month: "Feb", sold: 312, donated: 102 },
  { month: "Mar", sold: 289, donated: 95 },
  { month: "Apr", sold: 378, donated: 124 },
  { month: "May", sold: 425, donated: 156 },
  { month: "Jun", sold: 398, donated: 142 },
];

const co2Data = [
  { month: "Jan", co2Saved: 0.4 },
  { month: "Feb", co2Saved: 0.9 },
  { month: "Mar", co2Saved: 1.4 },
  { month: "Apr", co2Saved: 2.0 },
  { month: "May", co2Saved: 2.7 },
  { month: "Jun", co2Saved: 3.2 },
];

const tierData = [
  { name: "Tier A", value: 1205, color: "hsl(var(--tier-a))" },
  { name: "Tier B", value: 1642, color: "hsl(var(--tier-b))" },
];

const regionData = [
  { region: "Mumbai", waste: 420 },
  { region: "Delhi", waste: 380 },
  { region: "Bangalore", waste: 290 },
  { region: "Chennai", waste: 195 },
  { region: "Kolkata", waste: 135 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name.includes("CO2") ? "T" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function MonthlyItemsChart() {
  const [timeRange, setTimeRange] = useState<"3m" | "6m" | "1y">("6m");

  // Select data based on time range
  const getChartData = () => {
    switch (timeRange) {
      case "3m":
        return monthlyData3M;
      case "6m":
        return monthlyData6M;
      case "1y":
        return monthlyData1Y;
      default:
        return monthlyData6M;
    }
  };

  // Calculate totals for the selected period
  const chartData = getChartData();
  const totalSold = chartData.reduce((sum, item) => sum + item.sold, 0);
  const totalDonated = chartData.reduce((sum, item) => sum + item.donated, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Monthly Items Flow</h3>
          <p className="text-sm text-muted-foreground">
            Tracking clothes sold and donated each month
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === "3m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("3m")}
            className="transition-all duration-200"
          >
            3M
          </Button>
          <Button
            variant={timeRange === "6m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("6m")}
            className="transition-all duration-200"
          >
            6M
          </Button>
          <Button
            variant={timeRange === "1y" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("1y")}
            className="transition-all duration-200"
          >
            1Y
          </Button>
        </div>
      </div>
      
      {/* Period Summary */}
      <div className="flex gap-6 mb-6 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm font-medium">Total Sold: {totalSold}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-secondary" />
          <span className="text-sm font-medium">Total Donated: {totalDonated}</span>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {timeRange === "3m" && "Last 3 Months"}
          {timeRange === "6m" && "Last 6 Months"}
          {timeRange === "1y" && "Last 12 Months"}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} key={timeRange}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="sold"
            name="Sold"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            animationDuration={500}
          />
          <Bar
            dataKey="donated"
            name="Donated"
            fill="hsl(var(--secondary))"
            radius={[4, 4, 0, 0]}
            animationDuration={500}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function CO2SavingsChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">CO₂ Emissions Saved</h3>
        <p className="text-sm text-muted-foreground">
          Cumulative carbon footprint reduction over time
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={co2Data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{ value: "Tonnes", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="co2Saved"
            name="CO₂ Saved"
            stroke="hsl(var(--impact-green))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--impact-green))", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function TierDistributionChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Items by Tier</h3>
        <p className="text-sm text-muted-foreground">
          Distribution of clothing quality tiers
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={tierData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {tierData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function RegionalHeatmapChart() {
  const maxWaste = Math.max(...regionData.map((r) => r.waste));

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Regional Impact</h3>
        <p className="text-sm text-muted-foreground">
          Textile waste diverted by city (in kg)
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            dataKey="region"
            type="category"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="waste"
            name="Waste Diverted (kg)"
            radius={[0, 4, 4, 0]}
          >
            {regionData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(var(--impact-orange) / ${
                  0.4 + (entry.waste / maxWaste) * 0.6
                })`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
