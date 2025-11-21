import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DnsResolver } from "@/components/visualizers/dns-resolver"

export function DnsContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Domain Name System (DNS)</h2>
                <p className="text-lg text-muted-foreground">
                    The phonebook of the internet. Translates human-readable domain names (google.com) to IP addresses (142.250.191.196).
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Interactive Visualization</h3>
                <DnsResolver />
            </section>

            <section className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recursive Query</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            &quot;Hey, find this for me and don&apos;t come back until you have the answer.&quot;
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
                            &quot;I don&apos;t know, but here is who you should ask next.&quot;
                        </p>
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded text-sm">
                            Local DNS asks Root (&quot;Go to .com&quot;) → Asks .com (&quot;Go to google.com&quot;) → Asks Auth (&quot;Here is the IP&quot;)
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
