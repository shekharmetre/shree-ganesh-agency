
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
export function TrainingResources(){
    return (
        <Card>
                <CardHeader>
                  <CardTitle>Training Resources</CardTitle>
                  <CardDescription>Educational materials for agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">New Retailer Onboarding</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PDF Guide - 10 min read</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Product Catalog Training</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Video - 15 min</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Sales Techniques</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Interactive Course - 30 min</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Browse All Resources
                  </Button>
                </CardFooter>
              </Card>
    )
}