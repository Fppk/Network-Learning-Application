"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function SubnetCalculator() {
    const [ip, setIp] = useState("192.168.1.0")
    const [cidr, setCidr] = useState(24)
    const [borrowedBits, setBorrowedBits] = useState(1)

    const subnets = useMemo(() => {
        const longToIp = (long: number) => {
            return [
                (long >>> 24) & 255,
                (long >>> 16) & 255,
                (long >>> 8) & 255,
                long & 255
            ].join(".")
        }

        try {
            // Basic validation
            const parts = ip.split(".").map(Number)
            if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return []

            const newCidr = cidr + borrowedBits
            if (newCidr > 30) return [] // Too small

            const numSubnets = Math.pow(2, borrowedBits)
            const blockSize = Math.pow(2, 32 - newCidr)

            const calculatedSubnets = []

            // Convert IP to long
            let ipLong = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]
            // Mask out host bits to get base network address
            const mask = -1 << (32 - cidr)
            ipLong = ipLong & mask // This ensures we start from the network address

            for (let i = 0; i < Math.min(numSubnets, 16); i++) { // Limit to 16 for display
                const subnetIpLong = ipLong + (i * blockSize)
                const broadcastLong = subnetIpLong + blockSize - 1

                const subnetIp = longToIp(subnetIpLong)
                const broadcastIp = longToIp(broadcastLong)
                const firstHost = longToIp(subnetIpLong + 1)
                const lastHost = longToIp(broadcastLong - 1)

                calculatedSubnets.push({
                    index: i,
                    network: `${subnetIp}/${newCidr}`,
                    range: `${firstHost} - ${lastHost}`,
                    broadcast: broadcastIp
                })
            }

            return calculatedSubnets
        } catch (e) {
            console.error(e)
            return []
        }
    }, [ip, cidr, borrowedBits])

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Subnet Calculator</CardTitle>
                <CardDescription>
                    Visually split a network into smaller subnets by borrowing host bits.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="ip">Network Address</Label>
                        <Input
                            id="ip"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="192.168.1.0"
                            className="font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cidr">Current CIDR (/{cidr})</Label>
                        <div className="flex items-center space-x-4">
                            <Slider
                                id="cidr"
                                min={8}
                                max={30}
                                step={1}
                                value={[cidr]}
                                onValueChange={(val) => setCidr(val[0])}
                                className="flex-1"
                            />
                            <span className="font-mono w-12 text-center">/{cidr}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Borrow Bits: {borrowedBits}</Label>
                            <span className="text-sm text-muted-foreground">
                                New CIDR: <span className="font-bold text-primary">/{cidr + borrowedBits}</span>
                            </span>
                        </div>
                        <Slider
                            min={1}
                            max={Math.min(8, 30 - cidr)} // Limit borrowing to keep reasonable
                            step={1}
                            value={[borrowedBits]}
                            onValueChange={(val) => setBorrowedBits(val[0])}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col items-center justify-center rounded-md bg-background p-2 shadow-sm">
                            <span className="text-muted-foreground">Subnets Created</span>
                            <span className="text-2xl font-bold">{Math.pow(2, borrowedBits)}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md bg-background p-2 shadow-sm">
                            <span className="text-muted-foreground">Hosts per Subnet</span>
                            <span className="text-2xl font-bold">{Math.pow(2, 32 - (cidr + borrowedBits)) - 2}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Resulting Subnets (First 16)</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {subnets.map((subnet) => (
                            <div
                                key={subnet.index}
                                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 text-sm space-y-2"
                            >
                                <div className="flex justify-between items-center">
                                    <Badge variant="outline">Subnet {subnet.index + 1}</Badge>
                                    <span className="font-mono font-bold">{subnet.network}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    <div>Range: {subnet.range}</div>
                                    <div>Broadcast: {subnet.broadcast}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {Math.pow(2, borrowedBits) > 16 && (
                        <p className="text-center text-sm text-muted-foreground">
                            ... and {Math.pow(2, borrowedBits) - 16} more subnets.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
