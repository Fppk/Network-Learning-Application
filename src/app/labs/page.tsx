import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Calculator, Network, Send } from "lucide-react"

export default function LabsPage() {
    const labs = [
        {
            title: "Signal Encoder",
            description: "Visualize Manchester and Differential Manchester encoding waveforms.",
            icon: Activity,
            href: "/learn/physical-layer/digital-encoding",
            color: "text-blue-500",
        },
        {
            title: "CRC Calculator",
            description: "Perform Cyclic Redundancy Check calculations step-by-step.",
            icon: Calculator,
            href: "/learn/data-link-layer/crc-check",
            color: "text-green-500",
        },
        {
            title: "Subnet Calculator",
            description: "Interactive IP subnetting with visual bit borrowing.",
            icon: Network,
            href: "/learn/network-layer/subnetting",
            color: "text-indigo-500",
        },
        {
            title: "TCP Handshake",
            description: "Simulate the 3-way handshake connection process.",
            icon: Send,
            href: "/learn/transport-layer/tcp-handshake",
            color: "text-orange-500",
        },
    ]

    return (
        <div className="container py-10">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Interactive Labs</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Hands-on tools to visualize and experiment with core networking concepts.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {labs.map((lab) => (
                    <Card key={lab.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-muted ${lab.color}`}>
                                    <lab.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle>{lab.title}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-6 text-base">
                                {lab.description}
                            </CardDescription>
                            <Link href={lab.href}>
                                <Button className="w-full">
                                    Launch Lab <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
