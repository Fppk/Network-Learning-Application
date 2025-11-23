"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const toggleLocale = () => {
        const nextLocale = locale === "en" ? "zh" : "en"
        router.replace(pathname, { locale: nextLocale })
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleLocale} title={locale === "en" ? "Switch to Chinese" : "Switch to English"}>
            <Languages className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Switch Language</span>
            <span className="ml-2 text-xs font-bold">{locale.toUpperCase()}</span>
        </Button>
    )
}
