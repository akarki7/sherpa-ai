"use client";

import ActiveTrekCard from "@/components/dashboard/ActiveTrekCard";
import AIStatusWidget from "@/components/dashboard/AIStatusWidget";
import QuickStats from "@/components/dashboard/QuickStats";
import ElevationChart from "@/components/dashboard/ElevationChart";
import RecentAlerts from "@/components/dashboard/RecentAlerts";
import UpcomingTrekCard from "@/components/dashboard/UpcomingTrekCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Row 1: Active Trek + AI Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <ActiveTrekCard />
        <AIStatusWidget />
      </div>

      {/* Row 2: Quick Stats */}
      <QuickStats />

      {/* Row 3: Elevation Chart */}
      <ElevationChart />

      {/* Row 4: Recent Alerts + Upcoming Trek */}
      <div className="grid md:grid-cols-2 gap-6">
        <RecentAlerts />
        <UpcomingTrekCard />
      </div>
    </div>
  );
}
