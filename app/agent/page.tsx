
import { Announcements } from "./_components/announcements"
import { PerformanceOverviewCard } from "./_components/export-overview"
import { QuickStats } from "./_components/quick-stats"
import { RecentOrders } from "./_components/recentOrders"
import { SupporTickets } from "./_components/support-ticets"
import { TopRetailers } from "./_components/top-retailers"
import { TrainingResources } from "./_components/training-resources"
import { VisitPlanner } from "./_components/visit-planner"
export default function Agent() {
    return (
         <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
           {/* Main Content */}
           <div className="flex-1 overflow-auto">
             {/* Main Content */}
             <main className="px-4 sm:px-6 lg:px-8 py-6">
               {/* Quick Stats */}
               <QuickStats />
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Left Column */}
                 <div className="lg:col-span-2 space-y-6">
                   {/* Recent Orders */}
                   <RecentOrders />
                   {/* Performance Graph */}
                   <PerformanceOverviewCard />
     
                   {/* Announcements / Offers */}
                   <Announcements />
                 </div>
     
                 {/* Right Column */}
                 <div className="space-y-6">
                   {/* Visit Planner */}
     
                   {/* <VisitPlanner /> */}
     
                   {/* Top Retailers */}
                   <TopRetailers />
     
                   {/* Support Tickets */}
                   <SupporTickets />
     
                   {/* Training Resources */}
                   <TrainingResources />
                 </div>
               </div>
             </main>
           </div>
         </div>
    )
}