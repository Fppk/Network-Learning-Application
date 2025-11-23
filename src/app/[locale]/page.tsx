import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Network, ShieldCheck, Globe, Layers, Server, Wifi, Activity } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("Landing")
  const tFooter = useTranslations("Footer")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

          <div className="container flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
              New: DNS Visualizer Added ✨
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {t("heroTitle")}
            </h1>

            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              {t("heroDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/learn">
                <Button size="lg" className="h-12 px-8 w-full sm:w-auto text-base gap-2">
                  {t("startLearning")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/labs">
                <Button variant="outline" size="lg" className="h-12 px-8 w-full sm:w-auto text-base">
                  {t("exploreLabs")}
                </Button>
              </Link>
            </div>

            {/* Stats / Trust */}
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 text-center lg:w-full lg:max-w-4xl">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold">6+</span>
                <span className="text-sm text-muted-foreground">Core Chapters</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold">10+</span>
                <span className="text-sm text-muted-foreground">Interactive Labs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold">100%</span>
                <span className="text-sm text-muted-foreground">Free & Open</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold">AI</span>
                <span className="text-sm text-muted-foreground">Powered Review</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold">
              {t("features")}
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              From the physical cables to the applications you use every day.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Wifi className="h-10 w-10 text-blue-500" />}
              title={t("feature1Title")}
              description={t("feature1Desc")}
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-purple-500" />}
              title={t("feature2Title")}
              description={t("feature2Desc")}
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-indigo-500" />}
              title={t("feature3Title")}
              description={t("feature3Desc")}
            />
            <FeatureCard
              icon={<Layers className="h-10 w-10 text-green-500" />}
              title={t("feature4Title")}
              description={t("feature4Desc")}
            />
            <FeatureCard
              icon={<Server className="h-10 w-10 text-orange-500" />}
              title={t("feature5Title")}
              description={t("feature5Desc")}
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-red-500" />}
              title={t("feature6Title")}
              description={t("feature6Desc")}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-12 md:py-24">
          <div className="relative rounded-3xl bg-primary/5 px-6 py-16 md:px-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="flex flex-col items-center text-center gap-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                {t("ctaTitle")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {t("ctaDesc")}
              </p>
              <Link href="/learn">
                <Button size="lg" className="h-12 px-8 text-base">
                  {t("startLearning")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Network className="h-6 w-6 text-primary" />
              <span className="font-bold">NetLearn AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {tFooter("description")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{tFooter("learn")}</h3>
              <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground">{tFooter("curriculum")}</Link>
              <Link href="/labs" className="text-sm text-muted-foreground hover:text-foreground">{tFooter("labs")}</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{tFooter("project")}</h3>
              <Link href="https://github.com" className="text-sm text-muted-foreground hover:text-foreground">GitHub</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">{tFooter("about")}</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{tFooter("legal")}</h3>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">{tFooter("privacy")}</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">{tFooter("terms")}</Link>
            </div>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          {tFooter("rights")}
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="mb-2 inline-block rounded-lg bg-background p-3 shadow-sm w-fit">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
