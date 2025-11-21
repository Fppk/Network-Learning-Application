"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"

type EncodingType = "manchester" | "diff-manchester"

export function SignalEncoder() {
    const [bits, setBits] = useState("1011001")
    const [encoding, setEncoding] = useState<EncodingType>("manchester")
    const [points, setPoints] = useState<string>("")

    // Validate input to only allow 0s and 1s
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^01]/g, "")
        setBits(value)
    }

    useEffect(() => {
        if (!bits) {
            setPoints("")
            return
        }

        let path = ""
        const width = 50 // Width of one bit period
        const height = 40 // Height of signal (amplitude)
        const baseLine = 50 // Y-coordinate of zero line

        // Start position
        let currentX = 10
        let currentLevel = -1 // -1 for low, 1 for high. Start low.

        // Initial move
        path += `M ${currentX} ${baseLine + height}`

        if (encoding === "manchester") {
            // Manchester: 
            // 1: Low -> High
            // 0: High -> Low
            // Transition happens in the middle of the bit period

            // We need to track the level at the END of the previous bit to draw the connecting line
            let lastLevel = -1 // Assuming we start low

            for (let i = 0; i < bits.length; i++) {
                const bit = bits[i]
                const startX = currentX + i * width
                const midX = startX + width / 2
                const endX = startX + width

                if (bit === '1') {
                    // Low to High
                    // If we were High, we need to go Low first at the start
                    if (lastLevel === 1) {
                        path += ` L ${startX} ${baseLine + height}`
                    }
                    // Draw Low part
                    path += ` L ${startX} ${baseLine + height} L ${midX} ${baseLine + height}`
                    // Transition to High
                    path += ` L ${midX} ${baseLine - height} L ${endX} ${baseLine - height}`
                    lastLevel = 1
                } else {
                    // High to Low
                    // If we were Low, we need to go High first at the start
                    if (lastLevel === -1) {
                        path += ` L ${startX} ${baseLine - height}`
                    }
                    // Draw High part
                    path += ` L ${startX} ${baseLine - height} L ${midX} ${baseLine - height}`
                    // Transition to Low
                    path += ` L ${midX} ${baseLine + height} L ${endX} ${baseLine + height}`
                    lastLevel = -1
                }
            }
        } else {
            // Differential Manchester:
            // Transition at middle is for clock.
            // Transition at start determines data:
            // 0: Transition at start
            // 1: No transition at start

            // Let's assume initial level is Low (-1)
            let currentLvl = -1

            for (let i = 0; i < bits.length; i++) {
                const bit = bits[i]
                const startX = currentX + i * width
                const midX = startX + width / 2
                const endX = startX + width

                // Determine start level for this bit
                if (bit === '0') {
                    // 0: Transition at start -> Flip level
                    currentLvl = currentLvl * -1
                } else {
                    // 1: No transition at start -> Keep level
                    currentLvl = currentLvl
                }

                // Draw first half
                const y1 = currentLvl === 1 ? baseLine - height : baseLine + height
                // If this is the very first bit, move to start. Otherwise line to start.
                if (i === 0) {
                    path = `M ${startX} ${y1}`
                } else {
                    path += ` L ${startX} ${y1}`
                }
                path += ` L ${midX} ${y1}`

                // Always transition in middle
                currentLvl = currentLvl * -1
                const y2 = currentLvl === 1 ? baseLine - height : baseLine + height
                path += ` L ${midX} ${y2} L ${endX} ${y2}`
            }
        }

        setPoints(path)
    }, [bits, encoding])

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Digital Signal Encoder</CardTitle>
                <CardDescription>
                    Visualize how bits are converted into electrical signals.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="bits">Binary Input</Label>
                    <Input
                        id="bits"
                        value={bits}
                        onChange={handleInputChange}
                        placeholder="Enter 0s and 1s (e.g., 10110)"
                        className="font-mono text-lg tracking-widest"
                        maxLength={16}
                    />
                </div>

                <RadioGroup
                    defaultValue="manchester"
                    onValueChange={(value) => setEncoding(value as EncodingType)}
                    className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manchester" id="manchester" />
                        <Label htmlFor="manchester">Manchester</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="diff-manchester" id="diff-manchester" />
                        <Label htmlFor="diff-manchester">Differential Manchester</Label>
                    </div>
                </RadioGroup>

                <div className="relative h-40 w-full overflow-x-auto rounded-md border bg-slate-50 dark:bg-slate-900 p-4">
                    <svg
                        className="h-full min-w-full"
                        width={Math.max(bits.length * 50 + 20, 100)}
                        height="120"
                        viewBox={`0 0 ${Math.max(bits.length * 50 + 20, 100)} 120`}
                    >
                        {/* Grid Lines */}
                        <line x1="0" y1="50" x2="100%" y2="50" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 4" />

                        {/* Bit Separators and Labels */}
                        {bits.split("").map((bit, i) => (
                            <g key={i}>
                                <line
                                    x1={10 + i * 50}
                                    y1="10"
                                    x2={10 + i * 50}
                                    y2="110"
                                    stroke="currentColor"
                                    strokeOpacity="0.1"
                                />
                                <text
                                    x={10 + i * 50 + 25}
                                    y="20"
                                    textAnchor="middle"
                                    className="fill-muted-foreground text-xs font-mono"
                                >
                                    {bit}
                                </text>
                            </g>
                        ))}

                        {/* Signal Path */}
                        <motion.path
                            d={points}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                <div className="rounded-md bg-muted p-4 text-sm">
                    <h4 className="font-semibold mb-2">How it works:</h4>
                    {encoding === "manchester" ? (
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>1</strong>: Transition from Low to High in the middle.</li>
                            <li><strong>0</strong>: Transition from High to Low in the middle.</li>
                            <li>The mid-bit transition provides clock synchronization.</li>
                        </ul>
                    ) : (
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Transition in middle</strong>: Always happens (for clock).</li>
                            <li><strong>0</strong>: Transition at the start of the bit period.</li>
                            <li><strong>1</strong>: No transition at the start of the bit period.</li>
                        </ul>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
