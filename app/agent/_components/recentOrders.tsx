
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Badge } from "primereact/badge"
import { Orders } from "@/public/assets/data"

export function RecentOrders() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </div>
                <CardDescription>Latest orders placed by retailers</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Retailer</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-gray-200 dark:border-gray-700"
                                >
                                    <td className="py-3 px-4">{order.id}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <Avatar className="h-6 w-6 mr-2">
                                                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Avatar" />
                                                <AvatarFallback>{order.avatarFallback}</AvatarFallback>
                                            </Avatar>
                                            <span>{order.retailer}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{order.date}</td>
                                    <td className="py-3 px-4">{order.amount}</td>
                                    <td className="py-3 px-4">
                                        <Badge className={order.statusClass}>{order.status}</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Button variant="ghost" size="sm">
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </CardContent>
        </Card>

    )
}