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

    const timeouts = React.useRef<NodeJS.Timeout[]>([])

    React.useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout)
        }
    }, [])

    const runDijkstra = () => {
        setCalculating(true)
        setActivePath([])
        setLog([t("logStart")])
        timeouts.current.forEach(clearTimeout)
        timeouts.current = []

        const addTimeout = (fn: () => void, delay: number) => {
            const timeout = setTimeout(fn, delay)
            timeouts.current.push(timeout)
        }

        // Generic Dijkstra Implementation
        const steps: { messageKey: string; params?: any; path: string[] }[] = []
        const distances: Record<string, number> = {}
        const previous: Record<string, string | null> = {}
        const unvisited = new Set(nodes.map(n => n.id))

        nodes.forEach(n => {
            distances[n.id] = Infinity
            previous[n.id] = null
        })
        distances["A"] = 0

        const getPath = (endNode: string) => {
            const path = []
            let curr: string | null = endNode
            while (curr) {
                path.unshift(curr)
                curr = previous[curr]
            }
            return path
        }

        while (unvisited.size > 0) {
            // Find node with min distance
            let closestNode: string | null = null
            let minDistance = Infinity

            unvisited.forEach(nodeId => {
                if (distances[nodeId] < minDistance) {
                    minDistance = distances[nodeId]
                    closestNode = nodeId
                }
            })

            if (!closestNode || minDistance === Infinity) break

            unvisited.delete(closestNode)
            const currentPath = getPath(closestNode)

            steps.push({
                messageKey: "logVisit",
                params: { node: closestNode, cost: minDistance },
                path: currentPath
            })

            if (closestNode === "D") {
                steps.push({
                    messageKey: "logFound",
                    path: currentPath
                })
                break
            }

            steps.push({
                messageKey: "logCheckingNeighbors",
                params: { node: closestNode },
                path: currentPath
            })

            // Check neighbors
            const neighbors = links.filter(l => l.source === closestNode || l.target === closestNode)
            for (const link of neighbors) {
                const neighborId = link.source === closestNode ? link.target : link.source
                if (!unvisited.has(neighborId)) continue

                const alt = distances[closestNode] + link.cost
                if (alt < distances[neighborId]) {
                    const isFirstDiscovery = distances[neighborId] === Infinity
                    distances[neighborId] = alt
                    previous[neighborId] = closestNode

                    steps.push({
                        messageKey: isFirstDiscovery ? "logDiscoveredPath" : "logUpdatePath",
                        params: { target: neighborId, via: closestNode, cost: alt },
                        path: getPath(neighborId)
                    })
                }
            }
        }

        // Execute steps
        let delay = 0
        steps.forEach((step) => {
            delay += 1500
            addTimeout(() => {
                setLog(prev => [...prev, t(step.messageKey, step.params)])
                if (step.path.length > 0) {
                    setActivePath(step.path)
                }
            }, delay)
        })

        addTimeout(() => {
            setCalculating(false)
        }, delay + 500)
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

                            // Check if this link is part of the active path
                            let isLinkActive = false
                            if (activePath.length >= 2) {
                                for (let j = 0; j < activePath.length - 1; j++) {
                                    if ((activePath[j] === link.source && activePath[j + 1] === link.target) ||
                                        (activePath[j] === link.target && activePath[j + 1] === link.source)) {
                                        isLinkActive = true
                                        break
                                    }
                                }
                            }

                            return (
                                <g key={i}>
                                    <line
                                        x1={source.x}
                                        y1={source.y}
                                        x2={target.x}
                                        y2={target.y}
                                        stroke={isLinkActive ? "#3b82f6" : "#cbd5e1"}
                                        strokeWidth={isLinkActive ? 4 : 2}
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
                    <div className="flex-1 bg-muted p-4 rounded-md font-mono text-sm h-48 overflow-y-auto">
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
