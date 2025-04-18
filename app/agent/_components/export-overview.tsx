'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

export function PerformanceOverviewCard() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Performance Overview</CardTitle>
                    <Tabs defaultValue="weekly">
                        <TabsList className="grid w-[200px] grid-cols-3">
                            <TabsTrigger value="daily">Daily</TabsTrigger>
                            <TabsTrigger value="weekly">Weekly</TabsTrigger>
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <CardDescription>Sales performance and order count</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={[
                                { name: "Week 1", sales: 24000, orders: 35 },
                                { name: "Week 2", sales: 32000, orders: 42 },
                                { name: "Week 3", sales: 28000, orders: 38 },
                                { name: "Week 4", sales: 42000, orders: 55 },
                            ]}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#3b82f6"
                                fill="#93c5fd"
                                yAxisId="left"
                                name="Sales (₹)"
                            />
                            <Area
                                type="monotone"
                                dataKey="orders"
                                stroke="#10b981"
                                fill="#6ee7b7"
                                yAxisId="right"
                                name="Orders"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}