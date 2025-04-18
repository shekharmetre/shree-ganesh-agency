
import { ProgressBar } from "primereact/progressbar"
import { Card, CardContent} from "@/components/ui/card"
import {
    ClipboardList,
    DollarSign,
    ShoppingBag,
    Store,
    Target,
  } from "lucide-react"
export function QuickStats(){
    return (
        <div className="flex gap-4 overflow-x-auto px-4 scroll-snap-x snap-x snap-mandatory">
        <div className="flex gap-4 w-max my-3">
          <Card className="snap-start shrink-0 w-[75vw] md:w-[20vw]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Orders Today</p>
                  <h3 className="text-2xl font-bold mt-1">24</h3>
                  <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="snap-start shrink-0 w-[75vw] md:w-[20vw]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sales Value</p>
                  <h3 className="text-2xl font-bold mt-1">₹42,500</h3>
                  <p className="text-xs text-green-600 mt-1">+8% from last week</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="snap-start shrink-0 w-[75vw] md:w-[20vw]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Retailers Added</p>
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                  <p className="text-xs text-green-600 mt-1">+2 this month</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <Store className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="snap-start shrink-0 w-[75vw] md:w-[20vw]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Target</p>
                  <h3 className="text-2xl font-bold mt-1">78%</h3>
                  <div className="mt-2">
                    <ProgressBar value={78} className="h-2" />
                  </div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <Target className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="snap-start shrink-0 w-[75vw] md:w-[20vw]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Payments</p>
                  <h3 className="text-2xl font-bold mt-1">₹12,800</h3>
                  <p className="text-xs text-red-600 mt-1">4 retailers</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                  <ClipboardList className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}