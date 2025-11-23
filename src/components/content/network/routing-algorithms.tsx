import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RoutingVisualizer } from "@/components/visualizers/routing-visualizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "next-intl"

export function RoutingAlgorithmsContent() {
    const t = useTranslations("RoutingAlgorithms")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("basicsTitle")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("basicsDesc")}
                </p>
            </section>

            <Tabs defaultValue="static" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="static">{t("tabs.static")}</TabsTrigger>
                    <TabsTrigger value="rip">{t("tabs.rip")}</TabsTrigger>
                    <TabsTrigger value="ospf">{t("tabs.ospf")}</TabsTrigger>
                </TabsList>

                <TabsContent value="static" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("static.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>{t("static.desc")}</p>
                            <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm">
                                Router(config)# ip route 192.168.10.0 255.255.255.0 192.168.20.2
                            </div>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li><strong>{t("static.pros")}:</strong> {t("static.prosDesc")}</li>
                                <li><strong>{t("static.cons")}:</strong> {t("static.consDesc")}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="rip" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("rip.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>{t("rip.desc")}</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li><strong>{t("rip.metric")}:</strong> {t("rip.metricDesc")}</li>
                                <li><strong>{t("rip.update")}:</strong> {t("rip.updateDesc")}</li>
                                <li><strong>{t("rip.algo")}:</strong> {t("rip.algoDesc")}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="ospf" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("ospf.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>{t("ospf.desc")}</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li><strong>{t("ospf.metric")}:</strong> {t("ospf.metricDesc")}</li>
                                <li><strong>{t("ospf.update")}:</strong> {t("ospf.updateDesc")}</li>
                                <li><strong>{t("ospf.algo")}:</strong> {t("ospf.algoDesc")}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">{t("simTitle")}</h3>
                <RoutingVisualizer />
            </section>
        </div>
    )
}
