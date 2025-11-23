"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Server, Database, Search, RefreshCw } from "lucide-react"
import { useTranslations } from "next-intl"

type Step = {
    id: number
    title: string
    description: string
    source: string
    destination: string
    status: "pending" | "active" | "completed"
}

export function DnsResolver() {
    const t = useTranslations("DnsResolver")
    const [domain, setDomain] = useState("example.com")
    const [isResolving, setIsResolving] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [logs, setLogs] = useState<string[]>([])

    const steps: Step[] = useMemo(() => [
        {
            id: 1,
            title: t("step1"),
            description: t("step1Desc"),
            source: t("client"),
            destination: t("localCache"),
            status: "pending",
        },
        {
            id: 2,
            title: t("step2"),
            description: t("step2Desc"),
            source: t("client"),
            destination: t("recursive"),
            status: "pending",
        },
        {
            id: 3,
            title: t("step3"),
            description: t("step3Desc"),
            source: t("recursive"),
            destination: t("root"),
            status: "pending",
        },
        {
            id: 4,
            title: t("step4"),
            description: t("step4Desc"),
            source: t("recursive"),
            destination: t("tld"),
            status: "pending",
        },
        {
            id: 5,
            title: t("step5"),
            description: t("step5Desc"),
            source: t("recursive"),
            destination: t("authoritative"),
            status: "pending",
        },
        {
            id: 6,
            title: t("step6"),
            description: t("step6Desc"),
            source: t("recursive"),
            destination: t("client"),
            status: "pending",
        },
    ], [t])

    const startResolution = () => {
        if (!domain) return
        setIsResolving(true)
        setCurrentStep(0)
        setLogs([t("logStart", { domain })])
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
                setLogs((prev) => [...prev, t("logSuccess", { domain })])
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isResolving, currentStep, domain, steps, t])

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("title")}</CardTitle>
                        <CardDescription>
                            {t("description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <Input
                                placeholder={t("placeholder")}
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                disabled={isResolving}
                            />
                            <Button onClick={startResolution} disabled={isResolving || !domain}>
                                {isResolving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                                {isResolving ? t("resolving") : t("resolve")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-[400px] overflow-hidden flex flex-col">
                    <CardHeader>
                        <CardTitle>{t("logsTitle")}</CardTitle>
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
                        label={t("client")}
                        active={currentStep === 0 || currentStep === 6}
                    />
                    <ServerNode
                        icon={<Server className="h-8 w-8 text-purple-500" />}
                        label={t("recursive")}
                        active={[1, 2, 3, 4, 5].includes(currentStep)}
                    />
                    <ServerNode
                        icon={<Database className="h-8 w-8 text-orange-500" />}
                        label={t("root")}
                        active={currentStep === 2}
                    />
                    <ServerNode
                        icon={<Database className="h-8 w-8 text-yellow-500" />}
                        label={t("tld")}
                        active={currentStep === 3}
                    />
                    <ServerNode
                        icon={<Database className="h-8 w-8 text-green-500" />}
                        label={t("authoritative")}
                        active={currentStep === 4}
                        className="col-span-2 mx-auto"
                    />
                </div>

                <AnimatePresence>
                </AnimatePresence>
            </div>
        </div>
    )
}

function ServerNode({ icon, label, active, className }: { icon: React.ReactNode, label: string, active: boolean, className?: string }) {
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
