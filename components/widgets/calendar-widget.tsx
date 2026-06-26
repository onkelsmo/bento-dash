import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Video, MapPin } from "lucide-react";

const upcomingEvents = [
    {
        id: 1,
        title: "Daily Standup",
        time: "10:00",
        date: "Heute",
        type: "online",
    },
    {
        id: 2,
        title: "MS Teams Interview: Enorin",
        time: "11:00",
        date: "14. Juli",
        type: "online",
    },
    {
        id: 3,
        title: "Zahnarzt",
        time: "08:30",
        date: "16. Juli",
        type: "offline",
    },
]

export function CalendarWidget() {
    return (
        <Card className="h-full flex flex-col p-6 bg-neutral-900 text-white border-neutral-800 shadow-lg overflow-hidden">
            <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0 mb-4 shrink-0">
                <CardTitle className="text-sm font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Termine
                </CardTitle>
                <span className="text-xs font-semibold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">
                    Demnächst
                </span>
            </CardHeader>

            <CardContent className="p-0 flex-grow flex flex-col gap-3 overflow-y-auto">
                {upcomingEvents.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-start justify-between p-3 rounded-lg bg-neutral-950/50 border border-neutral-800/50 hover:bg-neutral-800 transition-colors"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-neutral-200">
                                {event.title}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                <span className="text-blue-400 font-medium">{event.date}</span>
                                <span>•</span>
                                <span>{event.time} Uhr</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 shrink-0">
                            {event.type === 'online' ? (
                                <Video className="w-3.5 h-3.5 text-neutral-400" />
                            ) : (
                                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                            )}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}