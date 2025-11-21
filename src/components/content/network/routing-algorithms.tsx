import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RoutingVisualizer } from "@/components/visualizers/routing-visualizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RoutingAlgorithmsContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Routing Basics</h2>
                <p className="text-lg text-muted-foreground">
                    Routing is the process of selecting a path for traffic in a network or between or across multiple networks.
                </p>
            </section>

            <Tabs defaultValue="static" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="static">Static Routing</TabsTrigger>
                    <TabsTrigger value="rip">RIP (Distance Vector)</TabsTrigger>
                    <TabsTrigger value="ospf">OSPF (Link State)</TabsTrigger>
                </TabsList>

                <TabsContent value="static" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Static Routing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>Routes are manually configured by a network administrator.</p>
                            <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm">
                                Router(config)# ip route 192.168.10.0 255.255.255.0 192.168.20.2
                            </div>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li><strong>Pros:</strong> Simple, Secure, No overhead.</li>
                                <li><strong>Cons:</strong> Doesn&apos;t adapt to topology changes, hard to maintain for large networks.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="rip" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>RIP (Routing Information Protocol)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>A Distance-Vector protocol that uses hop count as a metric.</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li><strong>Metric:</strong> Hop count (Max 15, 16 is unreachable).</li>
                                <li><strong>Update:</strong> Broadcasts entire routing table every 30s.</li>
                                <li><strong>Algorithm:</strong> Bellman-Ford.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="ospf" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>OSPF (Open Shortest Path First)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>A Link-State protocol that maintains a full map of the network topology.</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li><strong>Metric:</strong> Cost (Bandwidth).</li>
                                <li><strong>Update:</strong> Triggered updates (only changes sent).</li>
                                <li><strong>Algorithm:</strong> Dijkstra&apos;s Shortest Path.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">Interactive Routing Simulator</h3>
                <RoutingVisualizer />
            </section>
        </div>
    )
}
