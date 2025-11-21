"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Server, Search, Database, ArrowRight, CheckCircle2, XCircle } from "lucide-react"

type Step = {
    id: number
    title: string
    description: string
    source: string
    destination: string
    status: "pending" | "active" | "completed"
}

const steps: Step[] = [
    {
        id: 1,
        title: "Browser Cache Check",
        description: "Browser checks if the IP is already cached locally.",
        source: "Client",
        destination: "Local Cache",
        status: "pending",
    },
    {
        id: 2,
        title: "Recursive Resolver",
        description: "Request sent to ISP's Recursive Resolver (e.g., 8.8.8.8).",
        source: "Client",
        destination: "Recursive Resolver",
        status: "pending",
    },
    {
        id: 3,
        title: "Root Server Query",
        description: "Resolver asks Root Server: 'Where is .com?'",
        source: "Recursive Resolver",
        destination: "Root Server",
        status: "pending",
    },
    {
        id: 4,
        title: "TLD Server Query",
        description: "Resolver asks TLD Server: 'Where is example.com?'",
        source: "Recursive Resolver",
        destination: "TLD Server",
        status: "pending",
    },
    {
        id: 5,
        title: "Authoritative Server Query",
        description: "Resolver asks Authoritative Server for the specific IP.",
        source: "Recursive Resolver",
        destination: "Authoritative Server",
        status: "pending",
    },
    {
        id: 6,
        title: "Resolution Complete",
        description: "IP address returned to the client.",
        source: "Recursive Resolver",
        destination: "Client",
        status: "pending",
    },
]

export function DnsResolver() {
    const [domain, setDomain] = useState("example.com")
    const [isResolving, setIsResolving] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [logs, setLogs] = useState<string[]>([])

    const startResolution = () => {
        if (!domain) return
        setIsResolving(true)
        setCurrentStep(0)
        setLogs([`Starting DNS resolution for ${domain}...`])
    }

    useEffect(() => {
        if (isResolving && currentStep < steps.length) {
            const timer = setTimeout(() => {
                setLogs((prev) => [...prev, `[${steps[currentStep].source} -> ${steps[currentStep].destination}]: ${steps[currentStep].title}`])
                setCurrentStep((prev) => prev + 1)
            }, 1500)
            return () => clearTimeout(timer)
        } else if (currentStep === steps.length) {
            const timer = setTimeout(() => {
                setIsResolving(false)
                setLogs((prev) => [...prev, `Resolution successful! IP found for ${domain}`])
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isResolving, currentStep, domain])

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>DNS Query Simulator</CardTitle>
                        <CardDescription>
                            Enter a domain name to visualize how the Domain Name System resolves it to an IP address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <Input
                                placeholder="example.com"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                disabled={isResolving}
                            />
                            <Button onClick={startResolution} disabled={isResolving || !domain}>
                                {isResolving ? "Resolving..." : "Resolve"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-[400px] overflow-hidden flex flex-col">
                    <CardHeader>
                        <CardTitle>Resolution Logs</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto font-mono text-sm">
                        <div className="space-y-2">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 text-muted-foreground"
                                >
                                    <span className="text-primary">{">"}</span>
                                    {log}
                                </motion.div>
                            ))}
                            {isResolving && (
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="h-4 w-2 bg-primary"
                                />
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="relative min-h-[500px] rounded-xl border bg-slate-50/50 dark:bg-slate-950/50 p-6">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Visual Nodes */}
                <div className="grid grid-cols-2 gap-8 h-full">
                    <ServerNode
                        icon={<Globe className="h-8 w-8 text-blue-500" />}
                        label="Client (Browser)"
                        active={currentStep === 0 || currentStep === 6}
                        position="top-left"
                    />
                    <ServerNode
                        icon={<Server className="h-8 w-8 text-purple-500" />}
                        label="Recursive Resolver"
                        active={[1, 2, 3, 4, 5].includes(currentStep)}
                        position="top-right"
                    />
                    <ServerNode
                        icon={<Database className="h-8 w-8 text-orange-500" />}
                        label="Root Server (.)"
                        active={currentStep === 2}
                        position="center-left"
                    />
                    <ServerNode
                        icon={<Database className="h-8 w-8 text-yellow-500" />}
                        label="TLD Server (.com)"
                        active={currentStep === 3}
                        position="center-right"
                    />
                    <ServerNode
                        icon={<Database className="h-8 w-8 text-green-500" />}
                        label="Authoritative Server"
                        active={currentStep === 4}
                        position="bottom-center"
                        className="col-span-2 mx-auto"
                    />
                </div>

                {/* Connection Lines Animation (Simplified for React) */}
                <AnimatePresence>
                    {/* This would be complex to draw perfect lines in pure CSS/Divs without SVG, 
               so we rely on the node highlighting to show flow for now. 
               Future improvement: Add SVG lines connecting these nodes. */}
                </AnimatePresence>
            </div>
        </div>
    )
}

function ServerNode({ icon, label, active, position, className }: { icon: React.ReactNode, label: string, active: boolean, position?: string, className?: string }) {
    return (
        <motion.div
            animate={{
                scale: active ? 1.1 : 1,
                borderColor: active ? "var(--primary)" : "transparent",
                boxShadow: active ? "0 0 20px rgba(var(--primary), 0.2)" : "none"
            }}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border bg-background p-4 shadow-sm transition-colors ${className}`}
        >
            <div className={`rounded-full p-3 ${active ? 'bg-primary/10' : 'bg-muted'}`}>
                {icon}
            </div>
            <span className={`font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
            </span>
            {active && (
                <motion.div
                    layoutId="active-indicator"
                    className="absolute -top-2 -right-2"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                </motion.div>
            )}
        </motion.div>
    )
}
