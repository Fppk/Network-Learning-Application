import React from "react"
import { SignalEncoder } from "@/components/visualizers/signal-encoder"

export function DigitalEncodingContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Manchester Encoding</h2>
                <p className="text-lg text-muted-foreground">
                    A synchronous clock encoding technique used by the physical layer to encode the clock and data of a synchronous bit stream.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Rule:</strong> Always transition in the middle of the bit period.</li>
                    <li><strong>1:</strong> Low to High transition.</li>
                    <li><strong>0:</strong> High to Low transition.</li>
                    <li><strong>Pros:</strong> Self-clocking (easy synchronization).</li>
                    <li><strong>Cons:</strong> Requires double the bandwidth (50% efficiency).</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Differential Manchester</h2>
                <p className="text-lg text-muted-foreground">
                    A variation where the transition at the start of the bit period determines the value.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Mid-bit Transition:</strong> Always present (for clocking).</li>
                    <li><strong>0:</strong> Transition at the start of the interval.</li>
                    <li><strong>1:</strong> No transition at the start of the interval.</li>
                    <li><strong>Pros:</strong> Better noise immunity.</li>
                </ul>
            </section>

            <div className="my-8">
                <SignalEncoder />
            </div>
        </div>
    )
}
