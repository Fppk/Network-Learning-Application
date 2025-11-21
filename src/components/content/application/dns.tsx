import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DnsContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Domain Name System (DNS)</h2>
                <p className="text-lg text-muted-foreground">
                    The phonebook of the internet. Translates human-readable domain names (google.com) to IP addresses (142.250.191.196).
                </p>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recursive Query</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            "Hey, find this for me and don't come back until you have the answer."
                        </p>
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded text-sm">
                            Client → Local DNS → Root → TLD → Auth → Local DNS → Client
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Iterative Query</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            "I don't know, but here is who you should ask next."
                        </p>
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded text-sm">
                            Local DNS asks Root ("Go to .com") → Asks .com ("Go to google.com") → Asks Auth ("Here is the IP")
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
