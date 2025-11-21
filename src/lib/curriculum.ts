export type Lesson = {
    id: string
    title: string
    description: string
    slug: string
}

export type Module = {
    id: string
    title: string
    description: string
    slug: string
    lessons: Lesson[]
}

export const curriculum: Module[] = [
    {
        id: "intro",
        title: "Chapter 1: Introduction",
        description: "Core concepts and performance metrics.",
        slug: "introduction",
        lessons: [
            {
                id: "delay",
                title: "Network Delay (Latency)",
                description: "Calculate Transmission and Propagation delay.",
                slug: "network-delay",
            },
        ],
    },
    {
        id: "physical",
        title: "Chapter 2: Physical Layer",
        description: "Bits, signals, and transmission media.",
        slug: "physical-layer",
        lessons: [
            {
                id: "encoding",
                title: "Digital Signal Encoding",
                description: "Manchester and Differential Manchester encoding.",
                slug: "digital-encoding",
            },
        ],
    },
    {
        id: "datalink",
        title: "Chapter 3: Data Link Layer",
        description: "Error detection and local addressing.",
        slug: "data-link-layer",
        lessons: [
            {
                id: "crc",
                title: "Cyclic Redundancy Check (CRC)",
                description: "Learn how to detect errors using polynomial division.",
                slug: "crc-check",
            },
        ],
    },
    {
        id: "network",
        title: "Chapter 4: Network Layer",
        description: "Routing, IP addressing, and Subnetting.",
        slug: "network-layer",
        lessons: [
            {
                id: "ip-addressing",
                title: "IP Addresses & Classification",
                description: "Class A, B, C, D, E and special addresses.",
                slug: "ip-addressing",
            },
            {
                id: "subnetting",
                title: "Subnetting & CIDR",
                description: "How to slice networks into smaller pieces.",
                slug: "subnetting",
            },
            {
                id: "routing",
                title: "Routing Algorithms",
                description: "Static routing and RIP protocol basics.",
                slug: "routing-algorithms",
            },
        ],
    },
    {
        id: "transport",
        title: "Chapter 5: Transport Layer",
        description: "Reliable delivery and flow control.",
        slug: "transport-layer",
        lessons: [
            {
                id: "tcp-handshake",
                title: "TCP Three-Way Handshake",
                description: "Establishing a reliable connection.",
                slug: "tcp-handshake",
            },
            {
                id: "ports",
                title: "Common Ports & Protocols",
                description: "Well-known ports for common services.",
                slug: "ports-protocols",
            },
        ],
    },
    {
        id: "application",
        title: "Chapter 6: Application Layer",
        description: "Network services for end users.",
        slug: "application-layer",
        lessons: [
            {
                id: "dns",
                title: "DNS (Domain Name System)",
                description: "Resolving names to IP addresses.",
                slug: "dns",
            },
            {
                id: "dhcp",
                title: "DHCP (Dynamic Host Configuration)",
                description: "Automating IP configuration (DORA process).",
                slug: "dhcp",
            },
        ],
    },
]
