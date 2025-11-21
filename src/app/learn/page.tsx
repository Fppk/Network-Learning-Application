import Link from "next/link"
import { curriculum } from "@/lib/curriculum"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"

export default function LearnPage() {
    return (
        <div className="container py-10">
            <div className="mb-8 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Course Curriculum</h1>
                <p className="text-xl text-muted-foreground">
                    Follow the path to master computer networking.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {curriculum.map((module) => (
                    <Card key={module.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{module.title}</CardTitle>
                            <CardDescription>{module.description}</CardDescription>
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
                                            <span className="text-sm font-medium">{lesson.title}</span>
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
