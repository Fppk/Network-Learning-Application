import React from "react"
import { SubnetCalculator } from "@/components/visualizers/subnet-calculator"
import { useTranslations } from "next-intl"

export function SubnettingContent() {
    const t = useTranslations("Subnetting")

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <p className="text-lg text-muted-foreground">
                    {t("description")}
                </p>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300">{t("whyTitle")}</h3>
                    <ul className="list-disc list-inside mt-2 text-sm text-blue-700 dark:text-blue-400">
                        <li>{t("reason1")}</li>
                        <li>{t("reason2")}</li>
                        <li>{t("reason3")}</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">{t("calcTitle")}</h2>
                <p className="text-muted-foreground">
                    {t("calcDesc")}
                </p>
                <SubnetCalculator />
            </section>
        </div>
    )
}
