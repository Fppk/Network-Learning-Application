import { notFound } from "next/navigation"
import { curriculum } from "@/lib/curriculum"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Quiz } from "@/components/quiz/quiz"
import { quizData } from "@/lib/quiz-data"
import { getTranslations } from "next-intl/server"

// Content Components
import { NetworkDelayContent } from "@/components/content/intro/network-delay"
import { DigitalEncodingContent } from "@/components/content/physical/digital-encoding"
import { CrcCheckContent } from "@/components/content/datalink/crc-check"
import { IpAddressingContent } from "@/components/content/network/ip-addressing"
import { SubnettingContent } from "@/components/content/network/subnetting"
import { RoutingAlgorithmsContent } from "@/components/content/network/routing-algorithms"
import { TcpHandshakeContent } from "@/components/content/transport/tcp-handshake"
import { PortsProtocolsContent } from "@/components/content/transport/ports-protocols"
import { DnsContent } from "@/components/content/application/dns"
import { DhcpContent } from "@/components/content/application/dhcp"

interface LessonPageProps {
    params: Promise<{
        module: string
        lesson: string
        locale: string
    }>
}

export function generateStaticParams() {
    const params = []
    for (const currModule of curriculum) {
        for (const lesson of currModule.lessons) {
            params.push({
                module: currModule.slug,
                lesson: lesson.slug,
            })
        }
    }
    return params
}

export default async function LessonPage({ params }: LessonPageProps) {
    const resolvedParams = await params
    const moduleData = curriculum.find((m) => m.slug === resolvedParams.module)
    const lessonData = moduleData?.lessons.find((l) => l.slug === resolvedParams.lesson)

    if (!moduleData || !lessonData) {
        notFound()
    }

    const t = await getTranslations("Curriculum")
    const tCommon = await getTranslations("Common")

    const tQuizData = await getTranslations("QuizData")

    // Find next and previous lessons
    const allLessons = curriculum.flatMap((m) =>
        m.lessons.map((l) => ({ ...l, moduleSlug: m.slug }))
    )
    const currentIndex = allLessons.findIndex(
        (l) => l.slug === resolvedParams.lesson && l.moduleSlug === resolvedParams.module
    )
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

    const lessonQuizRaw = quizData[lessonData.slug]
    let lessonQuiz = null

    if (lessonQuizRaw) {
        try {
            lessonQuiz = lessonQuizRaw.map((q, index) => ({
                ...q,
                text: tQuizData(`${lessonData.slug}.${index}.text`),
                options: tQuizData.raw(`${lessonData.slug}.${index}.options`) as string[],
                explanation: tQuizData(`${lessonData.slug}.${index}.explanation`)
            }))
        } catch (e) {
            console.error(`Error loading quiz translations for ${lessonData.slug}:`, e)
            lessonQuiz = lessonQuizRaw
        }
    }

    // Render the appropriate content
    const renderContent = () => {
        switch (lessonData.slug) {
            case "network-delay":
                return <NetworkDelayContent />
            case "digital-encoding":
                return <DigitalEncodingContent />
            case "crc-check":
                return <CrcCheckContent />
            case "ip-addressing":
                return <IpAddressingContent />
            case "subnetting":
                return <SubnettingContent />
            case "routing-algorithms":
                return <RoutingAlgorithmsContent />
            case "tcp-handshake":
                return <TcpHandshakeContent />
            case "ports-protocols":
                return <PortsProtocolsContent />
            case "dns":
                return <DnsContent />
            case "dhcp":
                return <DhcpContent />
            default:
                return (
                    <div className="p-12 border rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground">Interactive content for <strong>{t(`${lessonData.slug}.title`)}</strong> is coming soon.</p>
                    </div>
                )
        }
    }

    return (
        <div className="container max-w-4xl py-10">
            <div className="mb-8">
                <div className="mb-4 text-sm text-muted-foreground">
                    <Link href="/learn" className="hover:underline">{tCommon("curriculum")}</Link>
                    {" > "}
                    <span>{t(`${moduleData.slug}.title`)}</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">{t(`${lessonData.slug}.title`)}</h1>
                <p className="text-xl text-muted-foreground">{t(`${lessonData.slug}.description`)}</p>
            </div>

            <Tabs defaultValue="learn" className="w-full mb-12">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="learn">
                        <BookOpen className="mr-2 h-4 w-4" />
                        {tCommon("learn")}
                    </TabsTrigger>
                    <TabsTrigger value="quiz" disabled={!lessonQuiz}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        {tCommon("quiz")}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="learn" className="mt-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        {renderContent()}
                    </div>
                </TabsContent>

                <TabsContent value="quiz" className="mt-6">
                    {lessonQuiz ? (
                        <Quiz questions={lessonQuiz} />
                    ) : (
                        <div className="text-center p-8 text-muted-foreground">
                            No quiz available for this lesson yet.
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <div className="flex justify-between border-t pt-6">
                {prevLesson ? (
                    <Link href={`/learn/${prevLesson.moduleSlug}/${prevLesson.slug}`}>
                        <Button variant="outline">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            {t(`${prevLesson.slug}.title`)}
                        </Button>
                    </Link>
                ) : (
                    <div />
                )}
                {nextLesson ? (
                    <Link href={`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`}>
                        <Button>
                            {t(`${nextLesson.slug}.title`)}
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                ) : (
                    <Link href="/learn">
                        <Button variant="default">
                            {tCommon("complete")}
                            <CheckCircle2 className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    )
}
