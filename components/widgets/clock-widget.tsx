"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClockWidget() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!time) {
        return (
            <Card className="h-full flex items-center justify-center">
                <p className="text-muted-foreground animate-pulse">Loading...</p>
            </Card>
        );
    }

    const timeString = time.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const dateString = time.toLocaleDateString("de-DE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Card className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white border-none shadow-lg">
            <CardHeader className="p-0">
                <CardTitle className="text-sm font-medium tracking-wider text-neutral-400 uppercase">
                    Zeit & Datum
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-4">
                <div className="text-4xl font-black tracking-tight tabluar-nums md:text-5xl">
                    {timeString}
                </div>
                <p className="text-sm text-neutral-400 mt-1 font-medium">
                    {dateString}
                </p>
            </CardContent>
        </Card>
    );
}