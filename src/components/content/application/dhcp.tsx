import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DhcpVisualizer } from "@/components/visualizers/dhcp-visualizer"
import { useTranslations } from "next-intl"

export function DhcpContent() {
    const t = useTranslations("Dhcp")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("description")}
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">{t("doraTitle")}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <CardTitle className="text-blue-700 dark:text-blue-300">{t("discover")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{t("discoverDesc")}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                        <CardHeader>
                            <CardTitle className="text-orange-700 dark:text-orange-300">{t("offer")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{t("offerDesc")}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                        <CardHeader>
                            <CardTitle className="text-purple-700 dark:text-purple-300">{t("request")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{t("requestDesc")}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CardHeader>
                            <CardTitle className="text-green-700 dark:text-green-300">{t("ack")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{t("ackDesc")}</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">{t("simTitle")}</h3>
                <DhcpVisualizer />
            </section>
        </div>
    )
}
