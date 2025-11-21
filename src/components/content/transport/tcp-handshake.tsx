import React from "react"
import { TcpHandshake } from "@/components/visualizers/tcp-handshake"

export function TcpHandshakeContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">TCP Three-Way Handshake</h2>
                <p className="text-lg text-muted-foreground">
                    Transmission Control Protocol (TCP) uses a three-way handshake to establish a reliable connection before data transfer begins.
                </p>

                <div className="grid gap-4 md:grid-cols-3 text-center">
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="font-bold text-xl mb-1">SYN</div>
                        <div className="text-sm text-muted-foreground">Synchronize</div>
                        <p className="text-xs mt-2">Client asks to connect.</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <div className="font-bold text-xl mb-1">SYN-ACK</div>
                        <div className="text-sm text-muted-foreground">Synchronize-Acknowledge</div>
                        <p className="text-xs mt-2">Server agrees and asks back.</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="font-bold text-xl mb-1">ACK</div>
                        <div className="text-sm text-muted-foreground">Acknowledge</div>
                        <p className="text-xs mt-2">Client confirms. Connected.</p>
                    </div>
                </div>
            </section>

            <div className="my-8">
                <TcpHandshake />
            </div>
        </div>
    )
}
