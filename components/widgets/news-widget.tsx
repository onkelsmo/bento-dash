import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Parser from "rss-parser";
import { Newspaper } from "lucide-react";

const parser = new Parser();

async function fetchNews() {
    try {
        const response = await fetch("https://www.heise.de/rss/heise-atom.xml", {
            next: { revalidate: 3600 }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch news feed");
        }

        const xml = await response.text();
        const feed = await parser.parseString(xml);
        return feed.items.slice(0, 5); // Get the latest 5 news items
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
}

export async function NewsWidget() {
    const news = await fetchNews();

    return (
        <Card className="h-full flex flex-col p-6 bg-neutral-900 text-white border-neutral-800 shadow-lg overflow-hidden">
            <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0 mb-4 shrink-0">
                <CardTitle className="text-sm font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
                    <Newspaper className="w-4 h-4" />
                    Nachrichten
                </CardTitle>
                <span className="text-xs font-semibold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">
                    Heise
                </span>
            </CardHeader>
            <CardContent className="p-0 flex-grow flex flex-col gap-3 overflow-y-auto">
                {news.length === 0 ? (
                    <p className="text-sm text-neutral-500">Keine Nachrichten verfügbar.</p>
                ) : (
                    news.map((item, i) => (
                        <a
                            key={i}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-3 rounded-lg bg-neutral-950/50 hover:bg-neutral-800 transition-colors border border-neutral-800/50 hover:border-neutral-700"
                        >
                            <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-xs text-neutral-500 mt-1">
                                {item.pubDate
                                    ? new Date(item.pubDate).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
                                    : ""} Uhr
                            </p>
                        </a>
                    ))
                )}
            </CardContent>
        </Card>
    )
}