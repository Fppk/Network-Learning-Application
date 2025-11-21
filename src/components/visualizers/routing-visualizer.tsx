"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type Node = {
    id: string
    x: number
    y: number
    label: string
}

type Link = {
    source: string
    target: string
    cost: number
}

const nodes: Node[] = [
    { id: "A", x: 50, y: 100, label: "Router A" },
    { id: "B", x: 200, y: 50, label: "Router B" },
    { id: "C", x: 200, y: 150, label: "Router C" },
    { id: "D", x: 350, y: 100, label: "Router D" },
]

const links: Link[] = [
    { source: "A", target: "B", cost: 5 },
    { source: "A", target: "C", cost: 2 },
    { source: "B", target: "D", cost: 3 },
    { source: "C", target: "D", cost: 8 },
    { source: "B", target: "C", cost: 1 },
]

export function RoutingVisualizer() {
    const [activePath, setActivePath] = useState<string[]>([])
    const [calculating, setCalculating] = useState(false)
    const [log, setLog] = useState<string[]>([])

    const runDijkstra = () => {
        setCalculating(true)
        setActivePath([])
        setLog(["Starting Shortest Path calculation from A to D..."])

        // Simulation of steps
        setTimeout(() => {
            setLog(prev => [...prev, "Checking neighbors of A: B(5), C(2)"])
            setActivePath(["A"])
        }, 1000)

        setTimeout(() => {
            setLog(prev => [...prev, "Choosing C (cost 2) as closest node."])
            setActivePath(["A", "C"])
        }, 2500)

        setTimeout(() => {
            setLog(prev => [...prev, "Checking neighbors of C: D(8+2=10), B(1+2=3)"])
        }, 4000)

        setTimeout(() => {
            setLog(prev => [...prev, "Updating path to B via C (cost 3) is better than direct A->B (cost 5)."])
            setActivePath(["A", "C", "B"])
        }, 5500)

        setTimeout(() => {
            setLog(prev => [...prev, "Checking neighbors of B: D(3+3=6)."])
        }, 7000)

        setTimeout(() => {
            setLog(prev => [...prev, "Path found: A -> C -> B -> D (Total Cost: 6)"])
            setActivePath(["A", "C", "B", "D"])
            setCalculating(false)
        }, 8500)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Routing Algorithm Simulator (Dijkstra)</CardTitle>
                <CardDescription>
                    Visualize how a router finds the shortest path in a network.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative h-[300px] border rounded-lg bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {links.map((link, i) => {
                            const source = nodes.find(n => n.id === link.source)!
                            const target = nodes.find(n => n.id === link.target)!
                            const isActive = activePath.includes(link.source) && activePath.includes(link.target) &&
                                Math.abs(activePath.indexOf(link.source) - activePath.indexOf(link.target)) === 1

                            return (
                                <g key={i}>
                                    <line
                                        x1={source.x}
                                        y1={source.y}
                                        x2={target.x}
                                        y2={target.y}
                                        stroke={isActive ? "var(--primary)" : "#cbd5e1"}
                                        strokeWidth={isActive ? 4 : 2}
                                        className="transition-all duration-500"
                                    />
                                    <text
                                        x={(source.x + target.x) / 2}
                                        y={(source.y + target.y) / 2 - 5}
                                        textAnchor="middle"
                                        className="fill-muted-foreground text-xs font-bold"
                                    >
                                        {link.cost}
                                    </text>
                                </g>
                            )
                        })}
                    </svg>

                    {nodes.map((node) => (
                        <motion.div
                            key={node.id}
                            className={`absolute flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold shadow-sm transition-colors ${activePath.includes(node.id)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background border-muted-foreground"
                                }`}
                            style={{ left: node.x - 24, top: node.y - 24 }}
                            animate={{
                                scale: activePath.includes(node.id) ? 1.1 : 1
                            }}
                        >
                            {node.id}
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={runDijkstra} disabled={calculating} className="w-full sm:w-auto">
                        {calculating ? "Calculating..." : "Find Shortest Path (A to D)"}
                    </Button>
                    <div className="flex-1 bg-muted p-4 rounded-md font-mono text-sm h-32 overflow-y-auto">
                        {log.map((l, i) => (
                            <div key={i} className="mb-1">{">"} {l}</div>
                        ))}
                        {log.length === 0 && <span className="text-muted-foreground">Ready to simulate...</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
