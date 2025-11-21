import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Network, ShieldCheck, Globe, Layers, Server, Wifi } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Network className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                NetLearn AI
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/learn" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Curriculum
              </Link>
              <Link href="/labs" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Labs
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              Master Computer Networks <br className="hidden sm:inline" />
              Interactive & Visual
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Forget boring textbooks. Learn computer networking through interactive visualizations,
              real-world simulations, and AI-powered explanations.
            </p>
            <div className="space-x-4">
              <Link href="/learn">
                <Button size="lg" className="h-11 px-8">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/labs">
                <Button variant="outline" size="lg" className="h-11 px-8">
                  Explore Labs
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-3xl">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              The Full Stack of Networking
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              From physical cables to application protocols, we cover it all.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <Wifi className="h-10 w-10 mb-2 text-blue-500" />
                <CardTitle>Physical Layer</CardTitle>
                <CardDescription>
                  Signals, Encoding, and Media. Understand how bits travel.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Layers className="h-10 w-10 mb-2 text-green-500" />
                <CardTitle>Data Link</CardTitle>
                <CardDescription>
                  Framing, Error Detection (CRC), and MAC Addressing.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 mb-2 text-indigo-500" />
                <CardTitle>Network Layer</CardTitle>
                <CardDescription>
                  IP Addressing, Subnetting, and Routing Algorithms.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Server className="h-10 w-10 mb-2 text-orange-500" />
                <CardTitle>Transport Layer</CardTitle>
                <CardDescription>
                  TCP/UDP, Flow Control, and Reliability.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 mb-2 text-red-500" />
                <CardTitle>Application Layer</CardTitle>
                <CardDescription>
                  HTTP, DNS, DHCP, and Email Protocols.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Network className="h-10 w-10 mb-2 text-purple-500" />
                <CardTitle>Labs & Sims</CardTitle>
                <CardDescription>
                  Hands-on practice with Packet Tracer-style simulations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for the "Computer Network Review - AI Edition".
          </p>
        </div>
      </footer>
    </div>
  )
}
