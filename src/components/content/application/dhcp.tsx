import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DhcpContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Dynamic Host Configuration Protocol (DHCP)</h2>
                <p className="text-lg text-muted-foreground">
                    Automatically assigns IP addresses and other network configuration to devices on a network.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">The DORA Process</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <CardTitle className="text-blue-700 dark:text-blue-300">1. Discover</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Client shouts: "Is there a DHCP server here?" (Broadcast)</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                        <CardHeader>
                            <CardTitle className="text-orange-700 dark:text-orange-300">2. Offer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Server whispers: "I have IP 192.168.1.5 available."</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                        <CardHeader>
                            <CardTitle className="text-purple-700 dark:text-purple-300">3. Request</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Client shouts: "I'll take 192.168.1.5!" (Broadcast)</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CardHeader>
                            <CardTitle className="text-green-700 dark:text-green-300">4. Acknowledge</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Server confirms: "It's yours for 24 hours."</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
