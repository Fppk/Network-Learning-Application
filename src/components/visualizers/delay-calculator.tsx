"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useTranslations } from "next-intl"


export function DelayCalculator() {
    const t = useTranslations("DelayCalculator")
    const [fileSize, setFileSize] = useState(10) // MB
    const [bandwidth, setBandwidth] = useState(100) // Mbps
    const [distance, setDistance] = useState(1000) // km
    const [speedOfLight, setSpeedOfLight] = useState(200000) // km/s (fiber)

    const results = useMemo(() => {
        // Transmission Delay = L / R
        // L (bits) = fileSize * 8 * 10^6
        // R (bits/sec) = bandwidth * 10^6
        const L = fileSize * 8 * 1024 * 1024
        const R = bandwidth * 1000000
        const transmissionDelay = (L / R) // seconds

        // Propagation Delay = d / s
        // d (meters) = distance * 1000
        // s (meters/sec) = speedOfLight * 1000
        const d = distance * 1000
        const s = speedOfLight * 1000
        const propagationDelay = d / s // seconds

        const totalDelay = transmissionDelay + propagationDelay

        return {
            transmission: transmissionDelay * 1000, // ms
            propagation: propagationDelay * 1000, // ms
            total: totalDelay * 1000 // ms
        }
    }, [fileSize, bandwidth, distance, speedOfLight])

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>
                    {t("description")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{t("fileSize")}</Label>
                            <div className="flex items-center gap-4">
                                <Slider
                                    min={1}
                                    max={1000}
                                    step={1}
                                    value={[fileSize]}
                                    onValueChange={(val) => setFileSize(val[0])}
                                    className="flex-1"
                                />
                                <Input
                                    type="number"
                                    value={fileSize}
                                    onChange={(e) => setFileSize(Number(e.target.value))}
                                    className="w-20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t("bandwidth")}</Label>
                            <div className="flex items-center gap-4">
                                <Slider
                                    min={1}
                                    max={10000}
                                    step={10}
                                    value={[bandwidth]}
                                    onValueChange={(val) => setBandwidth(val[0])}
                                    className="flex-1"
                                />
                                <Input
                                    type="number"
                                    value={bandwidth}
                                    onChange={(e) => setBandwidth(Number(e.target.value))}
                                    className="w-20"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{t("distance")}</Label>
                            <div className="flex items-center gap-4">
                                <Slider
                                    min={1}
                                    max={20000}
                                    step={100}
                                    value={[distance]}
                                    onValueChange={(val) => setDistance(val[0])}
                                    className="flex-1"
                                />
                                <Input
                                    type="number"
                                    value={distance}
                                    onChange={(e) => setDistance(Number(e.target.value))}
                                    className="w-20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t("medium")}</Label>
                            <select
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={speedOfLight}
                                onChange={(e) => setSpeedOfLight(Number(e.target.value))}
                            >
                                <option value="200000">{t("fiber")}</option>
                                <option value="300000">{t("vacuum")}</option>
                                <option value="177000">{t("copper")}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="text-sm text-muted-foreground mb-1">{t("transmissionDelay")}</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {results.transmission.toFixed(2)} ms
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{t("pushingBits")}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                        <div className="text-sm text-muted-foreground mb-1">{t("propagationDelay")}</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {results.propagation.toFixed(2)} ms
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{t("traveling")}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <div className="text-sm text-muted-foreground mb-1">{t("totalDelay")}</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {results.total.toFixed(2)} ms
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{t("oneWayLatency")}</div>
                    </div>
                </div>

                {/* Visual Bar Chart */}
                <div className="space-y-2">
                    <div className="text-sm font-medium">{t("delayComposition")}</div>
                    <div className="h-8 w-full rounded-full bg-muted overflow-hidden flex">
                        <div
                            className="bg-blue-500 h-full transition-all duration-500"
                            style={{ width: `${(results.transmission / results.total) * 100}%` }}
                        />
                        <div
                            className="bg-orange-500 h-full transition-all duration-500"
                            style={{ width: `${(results.propagation / results.total) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            {t("transmission")}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                            {t("propagation")}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
