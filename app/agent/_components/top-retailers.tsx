
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function TopRetailers(){
    return (
        <Card>
        <CardHeader>
          <CardTitle>Top Retailers</CardTitle>
          <CardDescription>Your most active retail partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="MediCare Pharmacy" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">MediCare Pharmacy</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₹42,500 this month</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="HealthPlus Medical" />
                  <AvatarFallback>HP</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">HealthPlus Medical</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₹38,200 this month</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="City Pharmacy" />
                  <AvatarFallback>CP</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">City Pharmacy</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₹29,750 this month</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Wellness Corner" />
                  <AvatarFallback>WC</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Wellness Corner</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₹24,800 this month</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="LifeMed Stores" />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">LifeMed Stores</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₹21,350 this month</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Retailers
          </Button>
        </CardFooter>
      </Card>
    )
}