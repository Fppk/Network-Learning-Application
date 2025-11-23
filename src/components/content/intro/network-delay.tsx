import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DelayCalculator } from "@/components/visualizers/delay-calculator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { useTranslations } from "next-intl"

export function NetworkDelayContent() {
    const t = useTranslations("NetworkDelay")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title1")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("desc1")}
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">{t("formula")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-md font-mono text-lg">
                            {t("transFormula")}
                        </div>
                        <ul className="mt-4 list-disc list-inside text-sm text-muted-foreground">
                            <li><strong>{t("length")}</strong>: {t("lengthDesc")}</li>
                            <li><strong>{t("bandwidth")}</strong>: {t("bandwidthDesc")}</li>
                            <li><em>{t("keyFeature")}</em>: {t("feature1")}</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title2")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("desc2")}
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">{t("formula")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-md font-mono text-lg">
                            {t("propFormula")}
                        </div>
                        <ul className="mt-4 list-disc list-inside text-sm text-muted-foreground">
                            <li><strong>{t("distance")}</strong>: {t("distanceDesc")}</li>
                            <li><strong>{t("speed")}</strong>: {t("speedDesc")}</li>
                            <li><em>{t("keyFeature")}</em>: {t("feature2")}</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold">{t("calculatorTitle")}</h3>
                <DelayCalculator />
            </section>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>{t("exampleTitle")}</AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                    <p><strong>{t("scenario")}:</strong> {t("scenarioDesc")}</p>
                    <div className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded">
                        <p>{t("step1")}</p>
                        <p>{t("step2")}</p>
                        <p>{t("step3")}</p>
                    </div>
                    <p className="text-sm">{t("result")}</p>
                </AlertDescription>
            </Alert>
        </div>
    )
}
