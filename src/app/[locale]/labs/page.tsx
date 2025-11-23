import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Calculator, Network, Send, Globe, Timer, Binary, Route, Server } from "lucide-react"
import { useTranslations } from "next-intl"

export default function LabsPage() {
    const t = useTranslations("Labs")

    const labs = [
        {
            id: "signal-encoder",
            icon: Activity,
            href: "/learn/physical-layer/digital-encoding",
            color: "text-blue-500",
        },
        {
            id: "network-delay",
            icon: Timer,
            href: "/learn/introduction/network-delay",
            color: "text-red-500",
        },
        {
            id: "ip-analyzer",
            icon: Binary,
            href: "/learn/network-layer/ip-addressing",
            color: "text-cyan-500",
        },
        {
            id: "routing-sim",
            icon: Route,
            href: "/learn/network-layer/routing-algorithms",
            color: "text-emerald-500",
        },
        {
            id: "dhcp-sim",
            icon: Server,
            href: "/learn/application-layer/dhcp",
            color: "text-pink-500",
        },
        {
            id: "crc-calc",
            icon: Calculator,
            href: "/learn/data-link-layer/crc-check",
            color: "text-green-500",
        },
        {
            id: "subnet-calc",
            icon: Network,
            href: "/learn/network-layer/subnetting",
            color: "text-indigo-500",
        },
        {
            id: "tcp-handshake",
            icon: Send,
            href: "/learn/transport-layer/tcp-handshake",
            color: "text-orange-500",
        },
        {
            id: "dns-resolver",
            icon: Globe,
            href: "/learn/application-layer/dns",
            color: "text-purple-500",
        },
    ]

    return (
        <div className="container py-10">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">{t("title")}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t("description")}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {labs.map((lab) => (
                    <Card key={lab.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-muted ${lab.color}`}>
                                    <lab.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle>{t(`${lab.id}.title`)}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-6 text-base">
                                {t(`${lab.id}.description`)}
                            </CardDescription>
                            <Link href={lab.href}>
                                <Button className="w-full">
                                    {t("launch")} <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
