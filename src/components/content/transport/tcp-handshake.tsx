import React from "react"
import { TcpHandshake } from "@/components/visualizers/tcp-handshake"
import { useTranslations } from "next-intl"

export function TcpHandshakeContent() {
    const t = useTranslations("TcpHandshake")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("description")}
                </p>

                <div className="grid gap-4 md:grid-cols-3 text-center">
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="font-bold text-xl mb-1">{t("syn")}</div>
                        <div className="text-sm text-muted-foreground">{t("synFull")}</div>
                        <p className="text-xs mt-2">{t("synDesc")}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <div className="font-bold text-xl mb-1">{t("synAck")}</div>
                        <div className="text-sm text-muted-foreground">{t("synAckFull")}</div>
                        <p className="text-xs mt-2">{t("synAckDesc")}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="font-bold text-xl mb-1">{t("ack")}</div>
                        <div className="text-sm text-muted-foreground">{t("ackFull")}</div>
                        <p className="text-xs mt-2">{t("ackDesc")}</p>
                    </div>
                </div>
            </section>

            <div className="my-8">
                <TcpHandshake />
            </div>
        </div>
    )
}
