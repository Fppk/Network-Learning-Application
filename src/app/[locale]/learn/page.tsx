import Link from "next/link"
import { curriculum } from "@/lib/curriculum"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Circle } from "lucide-react"
import { useTranslations } from "next-intl"

export default function LearnPage() {
    const t = useTranslations("Curriculum")

    return (
        <div className="container py-10">
            <div className="mb-8 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{t("intro.title")}</h1>
                <p className="text-xl text-muted-foreground">
                    {t("intro.description")}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {curriculum.map((module) => (
                    <Card key={module.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{t(`${module.slug}.title`)}</CardTitle>
                            <CardDescription>{t(`${module.slug}.description`)}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-4">
                                {module.lessons.map((lesson) => (
                                    <Link
                                        key={lesson.id}
                                        href={`/learn/${module.slug}/${lesson.slug}`}
                                        className="block"
                                    >
                                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-accent hover:text-accent-foreground transition-colors">
                                            <span className="text-sm font-medium">{t(`${lesson.slug}.title`)}</span>
                                            <Circle className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
