import { Card } from "@/components/ui/card";
import { ClockWidget } from "@/components/widgets/clock-widget";
import { WeatherWidget } from "@/components/widgets/weather-widget";
import { NewsWidget } from "@/components/widgets/news-widget";
import { CalendarWidget } from "@/components/widgets/calendar-widget";
import { LinksWidget } from "@/components/widgets/links-widget";
import { db } from "@/lib/db";

const widgetComponents: Record<string, React.ComponentType> = {
  clock: ClockWidget,
  weather: WeatherWidget,
  news: NewsWidget,
  calendar: CalendarWidget,
  links: LinksWidget,
}

export default async function Dashboard() {
  const widgets = await db.widget.findMany()

  return (
    <main className="p-8 min-h-screen bg-background">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-6 md:grid-rows-3 gap-6 max-w-7xl mx-auto h-[800px]">
        {widgets.map((widget) => {
          const SpecificWidget = widgetComponents[widget.type]

          const gridStyle = {
            gridColumn: `span ${widget.colspan} / span ${widget.colspan}`,
            gridRow: `span ${widget.rowspan} / span ${widget.rowspan}`,
          };

          return (
            <div key={widget.id} style={gridStyle}>
              {SpecificWidget ? (
                <SpecificWidget />
              ) : (
                <Card className="h-full w-full p-6 bg-neutral-900 border-neutral-800 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-sm text-neutral-500 uppercase tracking-widest">{widget.type}</span>
                    <h2 className="text-xl font-bold text-neutral-300 mt-2">{widget.title}</h2>
                  </div>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}