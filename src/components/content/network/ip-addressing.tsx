import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IpVisualizer } from "@/components/visualizers/ip-visualizer"
import { useTranslations } from "next-intl"

export function IpAddressingContent() {
    const t = useTranslations("IpAddressing")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("description")}
                </p>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("table.class")}</TableHead>
                                <TableHead>{t("table.range")}</TableHead>
                                <TableHead>{t("table.mask")}</TableHead>
                                <TableHead>{t("table.bits")}</TableHead>
                                <TableHead>{t("table.hosts")}</TableHead>
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
                                <TableCell>{t("table.multicast")}</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">{t("analyzerTitle")}</h3>
                <IpVisualizer />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("specialTitle")}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <h3 className="font-bold">{t("privateTitle")}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{t("privateDesc")}</p>
                        <ul className="list-disc list-inside font-mono text-sm">
                            <li>10.0.0.0/8</li>
                            <li>172.16.0.0/12</li>
                            <li>192.168.0.0/16</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <h3 className="font-bold">{t("reservedTitle")}</h3>
                        <ul className="list-disc list-inside text-sm mt-2">
                            <li><strong>127.0.0.1</strong>: {t("loopback")}</li>
                            <li><strong>0.0.0.0</strong>: {t("default")}</li>
                            <li><strong>255.255.255.255</strong>: {t("broadcast")}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
