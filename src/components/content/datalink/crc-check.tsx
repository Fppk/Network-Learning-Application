import React from "react"
import { CrcCalculator } from "@/components/visualizers/crc-calculator"
import { useTranslations } from "next-intl"

export function CrcCheckContent() {
    const t = useTranslations("CrcCheck")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("description")}
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">{t("concepts")}</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>{t("message")}:</strong> {t("messageDesc")}</li>
                            <li><strong>{t("generator")}:</strong> {t("generatorDesc")}</li>
                            <li><strong>{t("fcs")}:</strong> {t("fcsDesc")}</li>
                        </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">{t("algorithm")}</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            <li>{t("step1")}</li>
                            <li>{t("step2")}</li>
                            <li>{t("step3")}</li>
                            <li>{t("step4")}</li>
                        </ol>
                    </div>
                </div>
            </section>

            <div className="my-8">
                <CrcCalculator />
            </div>
        </div>
    )
}
