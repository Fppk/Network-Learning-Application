"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Laptop, Server, ArrowRight, CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

type Step = {
    id: number
    name: string
    description: string
    source: "Client" | "Server"
    destination: "Server" | "Client" | "Broadcast"
    message: string
}

export function DhcpVisualizer() {
    const t = useTranslations("DhcpVisualizer")
    const [currentStep, setCurrentStep] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [logs, setLogs] = useState<string[]>([])

    const steps: Step[] = useMemo(() => [
        {
            id: 1,
            name: t("step1"),
            description: t("step1Desc"),
            source: "Client",
            destination: "Broadcast",
            message: "DHCPDISCOVER",
        },
        {
            id: 2,
            name: t("step2"),
            description: t("step2Desc"),
            source: "Server",
            destination: "Client",
            message: "DHCPOFFER (192.168.1.100)",
        },
        {
            id: 3,
            name: t("step3"),
            description: t("step3Desc"),
            source: "Client",
            destination: "Server",
            message: "DHCPREQUEST",
        },
        {
            id: 4,
            name: t("step4"),
            description: t("step4Desc"),
            source: "Server",
            destination: "Client",
            message: "DHCPACK",
        },
    ], [t])

    const startProcess = () => {
        setIsRunning(true)
        setCurrentStep(0)
        setLogs([t("logStart")])
    }

    useEffect(() => {
        if (isRunning && currentStep < steps.length) {
            const timer = setTimeout(() => {
                const step = steps[currentStep]
                const dest = step.destination === "Broadcast" ? t("broadcast") : (step.destination === "Client" ? t("client") : t("server"))
                const src = step.source === "Client" ? t("client") : t("server")
                setLogs(prev => [...prev, `[${src} -> ${dest}]: ${step.message}`])
                setCurrentStep(prev => prev + 1)
            }, 2000)
            return () => clearTimeout(timer)
        } else if (currentStep === steps.length) {
            const timer = setTimeout(() => {
                setIsRunning(false)
                setLogs(prev => [...prev, t("logSuccess")])
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [isRunning, currentStep, steps, t])

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>
                    {t("description")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="relative h-[200px] border rounded-xl bg-slate-50 dark:bg-slate-950 p-6 flex items-center justify-between px-16">
                    <div className="flex flex-col items-center gap-2 z-10">
                        <div className={`p-4 rounded-full border-2 transition-colors ${currentStep > 0 ? "border-primary bg-primary/10" : "border-muted bg-background"}`}>
                            <Laptop className={`h-8 w-8 ${currentStep > 0 ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <span className="font-bold">{t("client")}</span>
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
                        <span className="font-bold">{t("server")}</span>
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
                            {isRunning ? t("negotiating") : t("start")}
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
                        <div className="mb-2 text-slate-400 border-b border-slate-800 pb-2">{t("networkLog")}</div>
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-green-400">{">"}</span> {log}
                            </div>
                        ))}
                        {logs.length === 0 && <span className="text-slate-600">{t("logWaiting")}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}




