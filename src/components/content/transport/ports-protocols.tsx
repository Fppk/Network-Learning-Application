import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTranslations } from "next-intl"

export function PortsProtocolsContent() {
    const t = useTranslations("PortsProtocols")

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
                                <TableHead>{t("table.port")}</TableHead>
                                <TableHead>{t("table.protocol")}</TableHead>
                                <TableHead>{t("table.usage")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-mono font-bold">20/21</TableCell>
                                <TableCell>FTP</TableCell>
                                <TableCell>{t("table.ftp")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">22</TableCell>
                                <TableCell>SSH</TableCell>
                                <TableCell>{t("table.ssh")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">23</TableCell>
                                <TableCell>Telnet</TableCell>
                                <TableCell>{t("table.telnet")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">25</TableCell>
                                <TableCell>SMTP</TableCell>
                                <TableCell>{t("table.smtp")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">53</TableCell>
                                <TableCell>DNS</TableCell>
                                <TableCell>{t("table.dns")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">80</TableCell>
                                <TableCell>HTTP</TableCell>
                                <TableCell>{t("table.http")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">443</TableCell>
                                <TableCell>HTTPS</TableCell>
                                <TableCell>{t("table.https")}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    )
}
