"use client"

import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Network } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "next-intl"

export function SiteHeader() {
    const t = useTranslations("Navigation")

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Network className="h-6 w-6 text-primary" />
                        </div>
                        <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
                            NetLearn AI
                        </span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link href="/learn" className="transition-colors hover:text-primary text-muted-foreground">
                        {t("curriculum")}
                    </Link>
                    <Link href="/labs" className="transition-colors hover:text-primary text-muted-foreground">
                        {t("labs")}
                    </Link>
                    <Link href="https://github.com/Fppk/Network-Learning-Application" target="_blank" className="transition-colors hover:text-primary text-muted-foreground">
                        GitHub
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <Link href="/learn">
                        <Button size="sm" className="hidden sm:flex">
                            {t("learn")}
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
