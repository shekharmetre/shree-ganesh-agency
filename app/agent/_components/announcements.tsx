import {
  Bell,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Announcements(){
    return (
        <Card>
        <CardHeader>
          <CardTitle>Announcements & Offers</CardTitle>
          <CardDescription>Latest updates from the company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-4">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    New Product Launch: VitaPlus Multivitamins
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Introducing our new range of multivitamins with special launch discount of 15%. Valid until
                    June 30th.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-4">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    Bonus Scheme: Antibiotics Range
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Get 5% extra commission on all antibiotic orders above ₹10,000 this month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Announcements
          </Button>
        </CardFooter>
      </Card>
    )
}