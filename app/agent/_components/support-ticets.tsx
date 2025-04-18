
import {
    Plus,
  } from "lucide-react"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Badge } from "primereact/badge"

export function SupporTickets(){
    return (
        <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Support Tickets</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Ticket
            </Button>
          </div>
          <CardDescription>Recent issues reported by you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <div className="flex justify-between">
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Order Delivery Delay</h4>
                <Badge
                
                  className="text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
                >
                  In ProgressBar
                </Badge>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Ticket #T-2345 - Opened 2 days ago
              </p>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
              <div className="flex justify-between">
                <h4 className="font-medium text-green-900 dark:text-green-100">Product Information Update</h4>
                <Badge
                  
                  className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-700"
                >
                  Resolved
                </Badge>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Ticket #T-2344 - Closed yesterday
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button  className="w-full">
            View All Tickets
          </Button>
        </CardFooter>
      </Card>
    )
}