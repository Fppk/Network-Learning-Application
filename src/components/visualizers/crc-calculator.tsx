"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowDown, CheckCircle2 } from "lucide-react"

import { useTranslations } from "next-intl"

export function CrcCalculator() {
    const t = useTranslations("CrcCalculator")
    const [data, setData] = useState("1011001")
    const [generator, setGenerator] = useState("11011")
    const [result, setResult] = useState<{ crc: string; transmitted: string } | null>(null)

    const handleCalculate = () => {
        if (!data || !generator) return

        const m = data.split("").map(Number)
        const g = generator.split("").map(Number)
        const r = g.length - 1

        // Append r zeros to data
        const appendedData = [...m, ...Array(r).fill(0)]
        const workingData = [...appendedData]
        const calculationSteps: string[] = []

        // Perform division
        for (let i = 0; i <= workingData.length - g.length; i++) {
            // If the leading bit is 1, perform XOR
            if (workingData[i] === 1) {
                calculationSteps.push(t("stepMatch", { step: i + 1, index: i }))

                for (let j = 0; j < g.length; j++) {
                    workingData[i + j] = workingData[i + j] ^ g[j]
                }
            }
        }

        const remainder = workingData.slice(-r).join("")
        const transmitted = data + remainder



        setResult({ crc: remainder, transmitted })
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
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="data">{t("dataBits")}</Label>
                        <Input
                            id="data"
                            value={data}
                            onChange={(e) => setData(e.target.value.replace(/[^01]/g, ""))}
                            placeholder="e.g., 1011001"
                            className="font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="generator">{t("generator")}</Label>
                        <Input
                            id="generator"
                            value={generator}
                            onChange={(e) => setGenerator(e.target.value.replace(/[^01]/g, ""))}
                            placeholder="e.g., 11011"
                            className="font-mono"
                        />
                    </div>
                </div>

                <Button onClick={handleCalculate} className="w-full">
                    {t("calculate")}
                </Button>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 font-mono text-sm overflow-x-auto">
                            <div className="min-w-[300px]">
                                <div className="mb-2 text-muted-foreground">{t("divisionProcess")}</div>
                                {/* Visualizing the division is tricky in text, let's show the key parameters */}
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <div className="text-right font-bold">{t("data")}</div>
                                    <div>{data}</div>
                                    <div className="text-right font-bold">{t("zerosAdded")}</div>
                                    <div>{generator.length - 1}</div>
                                    <div className="text-right font-bold">{t("dividend")}</div>
                                    <div>{data}{"0".repeat(generator.length - 1)}</div>
                                    <div className="text-right font-bold">{t("divisor")}</div>
                                    <div>{generator}</div>
                                </div>

                                <div className="my-4 border-t border-dashed" />

                                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                    <ArrowDown className="h-4 w-4" />
                                    <span>{t("remainder")} <strong>{result.crc}</strong></span>
                                </div>
                            </div>
                        </div>

                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>{t("result")}</AlertTitle>
                            <AlertDescription className="mt-2">
                                <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>{t("calculatedCrc")}</span>
                                        <span className="font-mono font-bold">{result.crc}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span>{t("finalFrame")}</span>
                                        <span className="font-mono font-bold">
                                            {data}<span className="text-green-600 dark:text-green-400">{result.crc}</span>
                                        </span>
                                    </div>
                                </div>
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
