import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function PortsProtocolsContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Common Ports</h2>
                <p className="text-lg text-muted-foreground">
                    Well-known ports (0-1023) are reserved for system services.
                </p>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Port</TableHead>
                                <TableHead>Protocol</TableHead>
                                <TableHead>Usage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-mono font-bold">20/21</TableCell>
                                <TableCell>FTP</TableCell>
                                <TableCell>File Transfer (Data/Control)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">22</TableCell>
                                <TableCell>SSH</TableCell>
                                <TableCell>Secure Remote Login</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">23</TableCell>
                                <TableCell>Telnet</TableCell>
                                <TableCell>Unsecured Remote Login</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">25</TableCell>
                                <TableCell>SMTP</TableCell>
                                <TableCell>Email Sending</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">53</TableCell>
                                <TableCell>DNS</TableCell>
                                <TableCell>Domain Name Resolution</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">80</TableCell>
                                <TableCell>HTTP</TableCell>
                                <TableCell>Web Browsing (Unencrypted)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-mono font-bold">443</TableCell>
                                <TableCell>HTTPS</TableCell>
                                <TableCell>Web Browsing (Encrypted)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    )
}
