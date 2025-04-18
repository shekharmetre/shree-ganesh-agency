
import {
  Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "primereact/badge"
import { Checkbox } from "primereact/checkbox"
import { CheckboxItem } from "@radix-ui/react-dropdown-menu"


export function VisitPlanner(){
    return (
        <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Today's Visits</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Visit
            </Button>
          </div>
          <CardDescription>Your scheduled retailer visits for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <CheckboxItem id="visit1" className="mr-3" />
                <div>
                  <label htmlFor="visit1" className="font-medium">
                    MediCare Pharmacy
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">10:30 AM - Stock Check</p>
                </div>
              </div>
              <Badge>Upcoming</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <CheckboxItem id="visit2" className="mr-3" checked />
                <div>
                  <label htmlFor="visit2" className="font-medium line-through text-gray-500">
                    HealthPlus Medical
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">9:00 AM - New Order</p>
                </div>
              </div>
              <Badge>Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <CheckboxItem id="visit3" className="mr-3" />
                <div>
                  <label htmlFor="visit3" className="font-medium">
                    City Pharmacy
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2:00 PM - Payment Collection</p>
                </div>
              </div>
              <Badge>Upcoming</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <CheckboxItem id="visit4" className="mr-3" />
                <div>
                  <label htmlFor="visit4" className="font-medium">
                    Wellness Corner
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">4:30 PM - Product Demo</p>
                </div>
              </div>
              <Badge>Upcoming</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Full Schedule
          </Button>
        </CardFooter>
      </Card>
    )
}