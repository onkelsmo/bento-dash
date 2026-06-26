import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Droplets, Wind, CloudRain, Sun, Cloud, CloudLightning, Snowflake } from "lucide-react";

const LAT = 53.1167;
const LON = 9.7833;

const getWeatherDetails = (code: number) => {
    if (code === 0) return { label: "Klar", icon: Sun, color: "text-amber-400" };
    if (code >= 1 && code <= 3) return { label: "Bewölkt", icon: CloudSun, color: "text-slate-300" };
    if (code >= 45 && code <= 48) return { label: "Nebel", icon: Cloud, color: "text-slate-400" };
    if (code >= 51 && code <= 67) return { label: "Regen", icon: CloudRain, color: "text-blue-400" };
    if (code >= 71 && code <= 77) return { label: "Schnee", icon: Snowflake, color: "text-white" };
    if (code >= 95) return { label: "Gewitter", icon: CloudLightning, color: "text-purple-400" };
    return { label: "Unbekannt", icon: Sun, color: "text-amber-400" };
}

async function fetchWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max&timezone=Europe%2FBerlin`;
    const res = await fetch(url, {
        next: { revalidate: 1800 }
    })

    if (!res.ok) {
        throw new Error("Failed to fetch weather data");
    }
    return res.json();
}

export async function WeatherWidget() {
    const data = await fetchWeather();
    const currentCode = data.current.weather_code;
    const { label: condition, icon: CurrentIcon, color: iconColor } = getWeatherDetails(currentCode)

    const weatherData = {
        temp: Math.round(data.current.temperature_2m),
        condition: condition,
        location: "Schneverdingen",
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,

        forecast: data.daily.time.slice(1, 4).map((timeStr: string, index: number) => {
            const date = new Date(timeStr);
            const dayName = date.toLocaleDateString("de-DE", { weekday: "short" });
            const { icon } = getWeatherDetails(data.daily.weather_code[index + 1]);
            return {
                day: dayName,
                temp: Math.round(data.daily.temperature_2m_max[index + 1]),
                icon: icon
            }
        })
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
                        <CurrentIcon className={`w-14 h-14 ${iconColor} drop-shadow-md`} />
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