import React from "react"
import { CrcCalculator } from "@/components/visualizers/crc-calculator"

export function CrcCheckContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Cyclic Redundancy Check (CRC)</h2>
                <p className="text-lg text-muted-foreground">
                    An error-detecting code commonly used in digital networks to detect accidental changes to raw data.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Key Concepts</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Message (M):</strong> The data to be sent.</li>
                            <li><strong>Generator (G):</strong> A shared polynomial divisor.</li>
                            <li><strong>FCS (R):</strong> The remainder (Frame Check Sequence).</li>
                        </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">The Algorithm</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            <li>Append <em>r</em> zeros to Message, where <em>r</em> is degree of G.</li>
                            <li>Divide (XOR) the new Message by G.</li>
                            <li>The remainder is the FCS.</li>
                            <li>Transmit Message + FCS.</li>
                        </ol>
                    </div>
                </div>
            </section>

            <div className="my-8">
                <CrcCalculator />
            </div>
        </div>
    )
}
