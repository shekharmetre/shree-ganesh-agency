import { prisma } from "@/utils/prisma";
import { Announcements } from "./_components/announcements";
import { PerformanceOverviewCard } from "./_components/export-overview";
import { QuickStats } from "./_components/quick-stats";
import { RecentOrders } from "./_components/recentOrders";
import { SupporTickets } from "./_components/support-ticets";
import { TopRetailers } from "./_components/top-retailers";
import { TrainingResources } from "./_components/training-resources";
import { createClient } from "@/utils/supabase/server";
import { Prisma } from "@prisma/client";
import { AgentWithLatestRetailerOrdersType } from "@/types/schema.types";
import { GetLatestOreders } from "../actions/getRecentOrders";
// import type { Prisma } from "@prisma/client";

export default async function Agent() {
  const supabase = createClient();
  const response = (await supabase).auth.getUser();
  const user = await (await response).data.user?.id

  if (!user) {
    return <div>User not found or not logged in</div>;
  }
  const agentWithLatestRetailerOrders = await GetLatestOreders(user);
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-auto">
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          <QuickStats />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentOrders initialData={agentWithLatestRetailerOrders} />
              <PerformanceOverviewCard />
              <Announcements />
            </div>
            <div className="space-y-6">
              <TopRetailers />
              <SupporTickets />
              <TrainingResources />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}