import React from "react"
import { SignalEncoder } from "@/components/visualizers/signal-encoder"
import { useTranslations } from "next-intl"

export function DigitalEncodingContent() {
    const t = useTranslations("DigitalEncoding")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("description")}
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>{t("rule")}:</strong> {t("ruleDesc")}</li>
                    <li><strong>{t("one")}:</strong> {t("oneDesc")}</li>
                    <li><strong>{t("zero")}:</strong> {t("zeroDesc")}</li>
                    <li><strong>{t("pros")}:</strong> {t("prosDesc")}</li>
                    <li><strong>{t("cons")}:</strong> {t("consDesc")}</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("diffTitle")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("diffDesc")}
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>{t("midBit")}:</strong> {t("midBitDesc")}</li>
                    <li><strong>{t("diffZero")}:</strong> {t("diffZeroDesc")}</li>
                    <li><strong>{t("diffOne")}:</strong> {t("diffOneDesc")}</li>
                    <li><strong>{t("diffPros")}:</strong> {t("diffProsDesc")}</li>
                </ul>
            </section>

            <div className="my-8">
                <SignalEncoder />
            </div>
        </div>
    )
}
