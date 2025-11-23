"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

export function IpVisualizer() {
    const t = useTranslations("IpVisualizer")
    const [ip, setIp] = useState("192.168.1.1")

    const analysis = useMemo(() => {
        const parts = ip.split(".").map(Number)
        if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
            return { valid: false }
        }

        const firstOctet = parts[0]
        let ipClass = "Unknown"
        let type = "Public"
        let defaultMask = "Unknown"

        if (firstOctet >= 1 && firstOctet <= 126) {
            ipClass = "A"
            defaultMask = "255.0.0.0"
            if (firstOctet === 10) type = "Private"
        } else if (firstOctet >= 128 && firstOctet <= 191) {
            ipClass = "B"
            defaultMask = "255.255.0.0"
            if (firstOctet === 172 && parts[1] >= 16 && parts[1] <= 31) type = "Private"
        } else if (firstOctet >= 192 && firstOctet <= 223) {
            ipClass = "C"
            defaultMask = "255.255.255.0"
            if (firstOctet === 192 && parts[1] === 168) type = "Private"
        } else if (firstOctet >= 224 && firstOctet <= 239) {
            ipClass = "D (Multicast)"
            defaultMask = "N/A"
            type = "Reserved"
        } else if (firstOctet >= 240 && firstOctet <= 255) {
            ipClass = "E (Experimental)"
            defaultMask = "N/A"
            type = "Reserved"
        } else if (firstOctet === 127) {
            ipClass = "Loopback"
            defaultMask = "255.0.0.0"
            type = "Localhost"
        }

        const binary = parts.map(p => p.toString(2).padStart(8, "0")).join(".")

        return {
            valid: true,
            class: ipClass,
            type,
            mask: defaultMask,
            binary
        }
    }, [ip])

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>
                    {t("description")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="ip-input">{t("label")}</Label>
                    <Input
                        id="ip-input"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="e.g., 192.168.1.1"
                        className="font-mono text-lg"
                    />
                </div>

                {analysis.valid ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted space-y-2">
                                <div className="text-sm text-muted-foreground">{t("class")}</div>
                                <div className="text-2xl font-bold text-primary">Class {analysis.class}</div>
                            </div>
                            <div className="p-4 rounded-lg bg-muted space-y-2">
                                <div className="text-sm text-muted-foreground">{t("type")}</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-semibold">{analysis.type}</span>
                                    {analysis.type === "Private" && <Badge variant="secondary">{t("private")}</Badge>}
                                    {analysis.type === "Public" && <Badge>{t("public")}</Badge>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted space-y-2">
                                <div className="text-sm text-muted-foreground">{t("mask")}</div>
                                <div className="font-mono text-lg">{analysis.mask}</div>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-900 text-slate-50 space-y-2">
                                <div className="text-sm text-slate-400">{t("binary")}</div>
                                <div className="font-mono text-sm break-all">
                                    {analysis.binary?.split('.').map((octet, i) => (
                                        <span key={i}>
                                            {octet}
                                            {i < 3 && <span className="text-slate-600">.</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2">
                        <div className="text-red-500 font-medium">{t("invalid")}</div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
