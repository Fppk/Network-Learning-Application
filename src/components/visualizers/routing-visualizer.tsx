"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

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
    const t = useTranslations("RoutingVisualizer")
    const [activePath, setActivePath] = useState<string[]>([])
    const [calculating, setCalculating] = useState(false)
    const [log, setLog] = useState<string[]>([])

    const runDijkstra = () => {
        setCalculating(true)
        setActivePath([])
        setLog([t("logStart")])

        // Simulation of steps
        setTimeout(() => {
            setLog(prev => [...prev, t("logNeighborsA")])
            setActivePath(["A"])
        }, 1000)

        setTimeout(() => {
            setLog(prev => [...prev, t("logChooseC")])
            setActivePath(["A", "C"])
        }, 2500)

        setTimeout(() => {
            setLog(prev => [...prev, t("logNeighborsC")])
        }, 4000)

        setTimeout(() => {
            setLog(prev => [...prev, t("logUpdateB")])
            setActivePath(["A", "C", "B"])
        }, 5500)

        setTimeout(() => {
            setLog(prev => [...prev, t("logNeighborsB")])
        }, 7000)

        setTimeout(() => {
            setLog(prev => [...prev, t("logFound")])
            setActivePath(["A", "C", "B", "D"])
            setCalculating(false)
        }, 8500)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>
                    {t("description")}
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
                        {calculating ? t("calculating") : t("start")}
                    </Button>
                    <div className="flex-1 bg-muted p-4 rounded-md font-mono text-sm h-32 overflow-y-auto">
                        {log.map((l, i) => (
                            <div key={i} className="mb-1">{">"} {l}</div>
                        ))}
                        {log.length === 0 && <span className="text-muted-foreground">{t("ready")}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
