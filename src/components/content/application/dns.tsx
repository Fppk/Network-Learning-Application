import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DnsResolver } from "@/components/visualizers/dns-resolver"
import { useTranslations } from "next-intl"

export function DnsContent() {
    const t = useTranslations("Dns")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("description")}
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-semibold">{t("vizTitle")}</h3>
                <DnsResolver />
            </section>

            <section className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("recursiveTitle")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {t("recursiveQuote")}
                        </p>
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded text-sm">
                            {t("recursiveFlow")}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t("iterativeTitle")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {t("iterativeQuote")}
                        </p>
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded text-sm">
                            {t("iterativeFlow")}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
