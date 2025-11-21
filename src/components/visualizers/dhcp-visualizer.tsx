"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Laptop, Server, ArrowRight, CheckCircle2 } from "lucide-react"

type Step = {
    id: number
    name: string
    description: string
    source: "Client" | "Server"
    destination: "Server" | "Client" | "Broadcast"
    message: string
}

const steps: Step[] = [
    {
        id: 1,
        name: "Discover",
        description: "Client broadcasts to find a DHCP server.",
        source: "Client",
        destination: "Broadcast",
        message: "DHCPDISCOVER",
    },
    {
        id: 2,
        name: "Offer",
        description: "Server offers an IP address to the client.",
        source: "Server",
        destination: "Client",
        message: "DHCPOFFER (192.168.1.100)",
    },
    {
        id: 3,
        name: "Request",
        description: "Client requests to use the offered IP.",
        source: "Client",
        destination: "Server",
        message: "DHCPREQUEST",
    },
    {
        id: 4,
        name: "Acknowledge",
        description: "Server acknowledges and assigns the IP.",
        source: "Server",
        destination: "Client",
        message: "DHCPACK",
    },
]

export function DhcpVisualizer() {
    const [currentStep, setCurrentStep] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [logs, setLogs] = useState<string[]>([])

    const startProcess = () => {
        setIsRunning(true)
        setCurrentStep(0)
        setLogs(["Starting DORA process..."])
    }

    useEffect(() => {
        if (isRunning && currentStep < steps.length) {
            const timer = setTimeout(() => {
                const step = steps[currentStep]
                setLogs(prev => [...prev, `[${step.source} -> ${step.destination}]: ${step.message}`])
                setCurrentStep(prev => prev + 1)
            }, 2000)
            return () => clearTimeout(timer)
        } else if (currentStep === steps.length) {
            const timer = setTimeout(() => {
                setIsRunning(false)
                setLogs(prev => [...prev, "IP Address 192.168.1.100 assigned successfully!"])
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [isRunning, currentStep])

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>DHCP DORA Process</CardTitle>
                <CardDescription>
                    Visualize how a device obtains an IP address dynamically.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="relative h-[200px] border rounded-xl bg-slate-50 dark:bg-slate-950 p-6 flex items-center justify-between px-16">
                    <div className="flex flex-col items-center gap-2 z-10">
                        <div className={`p-4 rounded-full border-2 transition-colors ${currentStep > 0 ? "border-primary bg-primary/10" : "border-muted bg-background"}`}>
                            <Laptop className={`h-8 w-8 ${currentStep > 0 ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <span className="font-bold">Client</span>
                        {currentStep === 4 && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                192.168.1.100
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-2 z-10">
                        <div className={`p-4 rounded-full border-2 transition-colors ${currentStep > 0 ? "border-primary bg-primary/10" : "border-muted bg-background"}`}>
                            <Server className={`h-8 w-8 ${currentStep > 0 ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <span className="font-bold">DHCP Server</span>
                    </div>

                    {/* Animation Layer */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            {isRunning && currentStep < steps.length && (
                                <motion.div
                                    key={currentStep}
                                    initial={{ x: steps[currentStep].source === "Client" ? -100 : 100, opacity: 0 }}
                                    animate={{ x: steps[currentStep].source === "Client" ? 100 : -100, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full shadow-lg">
                                        {steps[currentStep].message}
                                    </div>
                                    <ArrowRight className={`h-6 w-6 text-primary mt-1 ${steps[currentStep].source === "Server" ? "rotate-180" : ""}`} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                        <Button onClick={startProcess} disabled={isRunning} className="w-full">
                            {isRunning ? "Negotiating..." : "Start DHCP Request"}
                        </Button>
                        <div className="space-y-2">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${index < currentStep
                                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                                        : index === currentStep && isRunning
                                            ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 animate-pulse"
                                            : "bg-background border-muted"
                                        }`}
                                >
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${index < currentStep
                                        ? "bg-green-500 text-white"
                                        : "bg-muted text-muted-foreground"
                                        }`}>
                                        {index < currentStep ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">{step.name}</div>
                                        <div className="text-xs text-muted-foreground">{step.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-xs h-full overflow-y-auto">
                        <div className="mb-2 text-slate-400 border-b border-slate-800 pb-2">Network Log</div>
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-green-400">{">"}</span> {log}
                            </div>
                        ))}
                        {logs.length === 0 && <span className="text-slate-600">Waiting for activity...</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function Badge({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) {
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
            {children}
        </span>
    )
}
