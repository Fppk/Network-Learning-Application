import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DelayCalculator } from "@/components/visualizers/delay-calculator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function NetworkDelayContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Transmission Delay</h2>
                <p className="text-lg text-muted-foreground">
                    The time required to push all the packet&apos;s bits into the wire.
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Formula</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-md font-mono text-lg">
                            Delay<sub>trans</sub> = Length / Bandwidth
                        </div>
                        <ul className="mt-4 list-disc list-inside text-sm text-muted-foreground">
                            <li><strong>Length</strong>: Size of data (bits)</li>
                            <li><strong>Bandwidth</strong>: Speed of link (bits/s)</li>
                            <li><em>Key Feature</em>: Depends on data size, NOT distance.</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Propagation Delay</h2>
                <p className="text-lg text-muted-foreground">
                    The time it takes for a bit to travel from one end of the wire to the other.
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Formula</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-md font-mono text-lg">
                            Delay<sub>prop</sub> = Distance / Speed
                        </div>
                        <ul className="mt-4 list-disc list-inside text-sm text-muted-foreground">
                            <li><strong>Distance</strong>: Length of the wire (meters)</li>
                            <li><strong>Speed</strong>: Propagation speed (approx 2x10<sup>8</sup> m/s in copper)</li>
                            <li><em>Key Feature</em>: Depends on distance, NOT data size.</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">Interactive Delay Calculator</h3>
                <DelayCalculator />
            </section>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Example Calculation</AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                    <p><strong>Scenario:</strong> 100MB data, 100kb/s bandwidth, 1000km distance.</p>
                    <div className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded">
                        <p>1. Data: 100 * 2^20 * 8 = 838,860,800 bits</p>
                        <p>2. Trans Delay: 838,860,800 / 100,000 = 8388.6 s</p>
                        <p>3. Prop Delay: 1,000,000 / (2*10^8) = 0.005 s</p>
                    </div>
                    <p className="text-sm">Result: Transmission takes ~2.3 hours, while propagation is instant (5ms)!</p>
                </AlertDescription>
            </Alert>
        </div>
    )
}
