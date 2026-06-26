import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Terminal, Compass, LayoutGrid } from "lucide-react";

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
)

const quickLinks = [
    {
        name: "GitHub",
        url: "https://github.com",
        icon: GitHubIcon,
        color: "hover:text-white hover:bg-neutral-800 hover:border-neutral-700"
    },
    {
        name: "Localhost",
        url: "http://localhost:3000",
        icon: Terminal,
        color: "hover:text-emerald-400 hover:bg-emerald-950/30 hover:border-emerald-800/50"
    },
    {
        name: "DevDocs",
        url: "https://devdocs.io",
        icon: Compass,
        color: "hover:text-blue-400 hover:bg-blue-950/30 hover:border-blue-800/50"
    },
    {
        name: "Shadcn",
        url: "https://ui.shadcn.com",
        icon: LayoutGrid,
        color: "hover:text-sky-400 hover:bg-sky-950/30 hover:border-sky-800/50"
    },
];

export function LinksWidget() {
    return (
        <Card className="h-full flex flex-col p-6 bg-neutral-900 text-white border-neutral-800 shadow-lg overflow-hidden">
            <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0 mb-4 shrink-0">
                <CardTitle className="text-sm font-medium tracking-wider text-neutral-400 uppercase flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    Shortcuts
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex-grow grid grid-cols-2 gap-3">
                {quickLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/40 text-neutral-400 transition-all duration-200 group ${link.color}`}
                        >
                            <Icon className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform duration-200" />
                            <span className="text-[11px] font-medium tracking-wide truncate w-full text-center">
                                {link.name}
                            </span>
                        </a>
                    );
                })}
            </CardContent>
        </Card>
    );
}