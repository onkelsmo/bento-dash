import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Droplets, Wind, CloudRain, Sun } from "lucide-react";

export async function WeatherWidget() {
    const weatherData = {
        temp: 19,
        condition: "Partly Cloudy",
        location: "Schneverdingen",
        humidity: 65,
        wind: 14,
        forecast: [
            { day: "Morgen", temp: 21, icon: Sun },
            { day: "Donnerstag", temp: 18, icon: CloudRain },
            { day: "Freitag", temp: 22, icon: CloudSun },
        ]
    }

    return (
        <Card className="h-full flex flex-col justify-between p-6 bg-linear-to-br from-blue-950 via-slate-900 to-slate-900 text-white border-none shadow-lg">
            <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium tracking-wider text-slate-400 uppercase">
                    Wetter
                </CardTitle>
                <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                    {weatherData.location}
                </span>
            </CardHeader>

            <CardContent className="p-0 mt-4 flex grow flex-col justify-between">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-5xl font-black tracking-tighter">
                            {weatherData.temp}°C
                        </div>
                        <p className="text-sm text-slate-400 mt-1 font-medium">
                            {weatherData.condition}
                        </p>
                        <CloudSun className="w-14 h-14 text-amber-400 drop-shadow-[0_4px_12px_rgba(251,191,36,0.3)]" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 my-4 p-3 bg-slate-950/40 rounded-xl border border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Wind className="w-4 h-4 text-blue-400" />
                        <span>{weatherData.wind} km/h</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span>{weatherData.humidity}% rF</span>
                    </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    {weatherData.forecast.map((f, index) => {
                        const Icon = f.icon;
                        return (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 w-16">{f.day}</span>
                                <Icon className="w-4 h-4 text-slate-300" />
                                <span className="font-semibold w-10 text-right">{f.temp}°C</span>
                            </div>
                        );
                    })}
                </div>

            </CardContent>
        </Card>
    )
}