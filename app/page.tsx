import { Card } from "@/components/ui/card";
import { ClockWidget } from "@/components/widgets/clock-widget";
import { WeatherWidget } from "@/components/widgets/weather-widget";

export default function Dashboard() {
  return (
    <main className="p-8 min-h-screen bg-background">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-6 md:grid-rows-3 gap-6 max-w-7xl mx-auto h-[800px]">
        {/* News (big) */}
        <Card className="md:col-span-2 md:row-span-2 p-6">News Widget (Static)</Card>
        {/* Clock (small) */}
        <Card className="md:col-span-1 md:row-span-1 p-6"><ClockWidget /></Card>
        {/* Weather (medium) */}
        <Card className="md:col-span-1 md:row-span-2 p-6"><WeatherWidget /></Card>
        {/* Calender / Events (long) */}
        <Card className="md:col-span-2 md:row-span-1 p-6">Calendar / Events Widget</Card>
        {/* Quick Links */}
        <Card className="md:col-span-1 md:row-span-1 p-6">Links</Card>
      </div>
    </main>
  );
}