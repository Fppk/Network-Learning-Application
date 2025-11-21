"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle, RefreshCcw, Laptop, Server } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type TcpState = "CLOSED" | "LISTEN" | "SYN_SENT" | "SYN_RCVD" | "ESTABLISHED"

export function TcpHandshake() {
    const [step, setStep] = useState(0)

    // State tracking
    const [clientState, setClientState] = useState<TcpState>("CLOSED")
    const [serverState, setServerState] = useState<TcpState>("LISTEN")

    // Sequence numbers
    const clientSeq = 100
    const serverSeq = 300

    const nextStep = () => {
        if (step >= 3) {
            reset()
            return
        }

        const next = step + 1
        setStep(next)

        // Update states based on step
        if (next === 1) { // Client sends SYN
            setClientState("SYN_SENT")
        } else if (next === 2) { // Server receives SYN, sends SYN-ACK
            setServerState("SYN_RCVD")
        } else if (next === 3) { // Client receives SYN-ACK, sends ACK
            setClientState("ESTABLISHED")
            // Technically server becomes ESTABLISHED when it receives the ACK, 
            // but for visual simplicity we can show it here or add a 4th step.
            // Let's add a slight delay or just show it as established at the end of animation.
            setTimeout(() => setServerState("ESTABLISHED"), 1500)
        }
    }

    const reset = () => {
        setStep(0)
        setClientState("CLOSED")
        setServerState("LISTEN")
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>TCP Three-Way Handshake</CardTitle>
                <CardDescription>
                    Step-by-step visualization of establishing a reliable connection.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">

                {/* Diagram Area */}
                <div className="relative flex justify-between items-start min-h-[300px] p-8 rounded-lg border bg-slate-50 dark:bg-slate-900/50">

                    {/* Client Node */}
                    <div className="flex flex-col items-center space-y-4 z-10 w-32">
                        <div className="p-4 bg-background rounded-full border shadow-sm">
                            <Laptop className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="text-center">
                            <div className="font-bold">Client</div>
                            <Badge variant={clientState === "ESTABLISHED" ? "default" : "secondary"} className="mt-1">
                                {clientState}
                            </Badge>
                        </div>
                    </div>

                    {/* Server Node */}
                    <div className="flex flex-col items-center space-y-4 z-10 w-32">
                        <div className="p-4 bg-background rounded-full border shadow-sm">
                            <Server className="h-8 w-8 text-orange-500" />
                        </div>
                        <div className="text-center">
                            <div className="font-bold">Server</div>
                            <Badge variant={serverState === "ESTABLISHED" ? "default" : "secondary"} className="mt-1">
                                {serverState}
                            </Badge>
                        </div>
                    </div>

                    {/* Connection Lines */}
                    <div className="absolute top-16 left-24 right-24 h-0.5 bg-border -z-0" />

                    {/* Animated Packets */}
                    <AnimatePresence>
                        {step === 1 && (
                            <motion.div
                                initial={{ x: "10%", opacity: 0, y: 0 }}
                                animate={{ x: "90%", opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute top-12 left-0 right-0 mx-auto w-fit"
                            >
                                <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 px-3 py-1 rounded border border-blue-200 text-xs font-mono shadow-sm">
                                    SYN=1, Seq={clientSeq}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ x: "90%", opacity: 0, y: 40 }}
                                animate={{ x: "10%", opacity: 1, y: 40 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute top-12 left-0 right-0 mx-auto w-fit"
                            >
                                <div className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-100 px-3 py-1 rounded border border-orange-200 text-xs font-mono shadow-sm">
                                    SYN=1, ACK=1, Seq={serverSeq}, Ack={clientSeq + 1}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ x: "10%", opacity: 0, y: 80 }}
                                animate={{ x: "90%", opacity: 1, y: 80 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute top-12 left-0 right-0 mx-auto w-fit"
                            >
                                <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 px-3 py-1 rounded border border-green-200 text-xs font-mono shadow-sm">
                                    ACK=1, Seq={clientSeq + 1}, Ack={serverSeq + 1}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Timeline / Log */}
                    <div className="absolute bottom-4 left-0 right-0 px-8">
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className={`flex items-center ${step >= 1 ? "text-foreground font-medium" : "opacity-50"}`}>
                                <div className="w-6 text-center mr-2">1.</div>
                                Client sends SYN to request connection.
                            </div>
                            <div className={`flex items-center ${step >= 2 ? "text-foreground font-medium" : "opacity-50"}`}>
                                <div className="w-6 text-center mr-2">2.</div>
                                Server acknowledges (ACK) and sends its own SYN.
                            </div>
                            <div className={`flex items-center ${step >= 3 ? "text-foreground font-medium" : "opacity-50"}`}>
                                <div className="w-6 text-center mr-2">3.</div>
                                Client acknowledges Server&apos;s SYN. Connection Established.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    {step < 3 ? (
                        <Button onClick={nextStep} size="lg" className="w-40">
                            {step === 0 ? "Start Handshake" : "Next Step"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={reset} variant="outline" size="lg" className="w-40">
                            Reset
                            <RefreshCcw className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
