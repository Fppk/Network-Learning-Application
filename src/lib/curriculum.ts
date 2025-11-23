export type Lesson = {
    id: string
    slug: string
}

export type Module = {
    id: string
    slug: string
    lessons: Lesson[]
}

export const curriculum: Module[] = [
    {
        id: "intro",
        slug: "introduction",
        lessons: [
            {
                id: "delay",
                slug: "network-delay",
            },
        ],
    },
    {
        id: "physical",
        slug: "physical",
        lessons: [
            {
                id: "encoding",
                slug: "digital-encoding",
            },
        ],
    },
    {
        id: "datalink",
        slug: "datalink",
        lessons: [
            {
                id: "crc",
                slug: "crc-check",
            },
        ],
    },
    {
        id: "network",
        slug: "network",
        lessons: [
            {
                id: "ip-addressing",
                slug: "ip-addressing",
            },
            {
                id: "subnetting",
                slug: "subnetting",
            },
            {
                id: "routing",
                slug: "routing-algorithms",
            },
        ],
    },
    {
        id: "transport",
        slug: "transport",
        lessons: [
            {
                id: "tcp-handshake",
                slug: "tcp-handshake",
            },
            {
                id: "ports",
                slug: "ports-protocols",
            },
        ],
    },
    {
        id: "application",
        slug: "application",
        lessons: [
            {
                id: "dns",
                slug: "dns",
            },
            {
                id: "dhcp",
                slug: "dhcp",
            },
        ],
    },
]
