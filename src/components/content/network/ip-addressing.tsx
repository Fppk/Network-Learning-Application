import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function IpAddressingContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">IP Address Classes</h2>
                <p className="text-lg text-muted-foreground">
                    IPv4 addresses are divided into 5 classes (A-E) based on the leading bits.
                </p>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Class</TableHead>
                                <TableHead>Range</TableHead>
                                <TableHead>Default Mask</TableHead>
                                <TableHead>Network Bits</TableHead>
                                <TableHead>Max Hosts</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold">A</TableCell>
                                <TableCell>1.0.0.0 - 126.0.0.0</TableCell>
                                <TableCell>255.0.0.0 (/8)</TableCell>
                                <TableCell>8</TableCell>
                                <TableCell>16,777,214</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">B</TableCell>
                                <TableCell>128.0.0.0 - 191.255.0.0</TableCell>
                                <TableCell>255.255.0.0 (/16)</TableCell>
                                <TableCell>16</TableCell>
                                <TableCell>65,534</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">C</TableCell>
                                <TableCell>192.0.0.0 - 223.255.255.0</TableCell>
                                <TableCell>255.255.255.0 (/24)</TableCell>
                                <TableCell>24</TableCell>
                                <TableCell>254</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold">D</TableCell>
                                <TableCell>224.0.0.0 - 239.255.255.255</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>Multicast</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Special Addresses</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <h3 className="font-bold">Private Addresses (RFC 1918)</h3>
                        <p className="text-sm text-muted-foreground mb-2">Not routable on the public internet.</p>
                        <ul className="list-disc list-inside font-mono text-sm">
                            <li>10.0.0.0/8</li>
                            <li>172.16.0.0/12</li>
                            <li>192.168.0.0/16</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <h3 className="font-bold">Other Reserved</h3>
                        <ul className="list-disc list-inside text-sm mt-2">
                            <li><strong>127.0.0.1</strong>: Loopback (Localhost)</li>
                            <li><strong>0.0.0.0</strong>: Any network / Default route</li>
                            <li><strong>255.255.255.255</strong>: Broadcast</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
