import { Question } from "@/components/quiz/quiz"

export const quizData: Record<string, Question[]> = {
    "network-delay": [
        {
            id: 1,
            text: "Which delay type depends on the length of the wire?",
            options: [
                "Transmission Delay",
                "Propagation Delay",
                "Processing Delay",
                "Queuing Delay"
            ],
            correctAnswer: 1,
            explanation: "Propagation delay is the time it takes for a signal to travel across the medium, which is directly proportional to the distance (length of wire) and inversely proportional to the propagation speed."
        },
        {
            id: 2,
            text: "If you increase the bandwidth of a link, which delay decreases?",
            options: [
                "Transmission Delay",
                "Propagation Delay",
                "Both",
                "Neither"
            ],
            correctAnswer: 0,
            explanation: "Transmission delay is Length / Bandwidth. Increasing bandwidth (denominator) reduces the transmission time."
        }
    ],
    "digital-encoding": [
        {
            id: 1,
            text: "In Manchester encoding, a transition from Low to High represents:",
            options: ["0", "1", "No change", "Error"],
            correctAnswer: 1,
            explanation: "Standard Manchester encoding represents a '1' as a Low-to-High transition and a '0' as a High-to-Low transition."
        },
        {
            id: 2,
            text: "What is the main disadvantage of Manchester encoding?",
            options: [
                "It is not self-clocking",
                "It requires DC component",
                "It requires double the bandwidth",
                "It is hard to implement"
            ],
            correctAnswer: 2,
            explanation: "Because there is a transition in the middle of every bit, the signal frequency is effectively doubled compared to NRZ, requiring twice the bandwidth."
        }
    ],
    "crc-check": [
        {
            id: 1,
            text: "What is the purpose of the Divisor (Generator Polynomial) in CRC?",
            options: [
                "To encrypt the data",
                "To compress the data",
                "To divide the data and generate a remainder",
                "To increase transmission speed"
            ],
            correctAnswer: 2,
            explanation: "The divisor is used to perform binary division on the data. The remainder of this division becomes the CRC code appended to the data."
        },
        {
            id: 2,
            text: "If the remainder at the receiver side is non-zero, what does it imply?",
            options: [
                "The data is correct",
                "The data has errors",
                "The divisor was incorrect",
                "The sender needs to retransmit"
            ],
            correctAnswer: 1,
            explanation: "A non-zero remainder indicates that the received data is not perfectly divisible by the generator polynomial, meaning bits were altered during transmission."
        }
    ],
    "ip-addressing": [
        {
            id: 1,
            text: "Which class of IP address has a default subnet mask of 255.255.0.0?",
            options: ["Class A", "Class B", "Class C", "Class D"],
            correctAnswer: 1,
            explanation: "Class B addresses use the first two octets for the network and the last two for hosts, corresponding to a /16 prefix or 255.255.0.0 mask."
        },
        {
            id: 2,
            text: "Which of the following is a private IP address?",
            options: ["172.32.0.1", "192.169.0.1", "10.0.0.5", "8.8.8.8"],
            correctAnswer: 2,
            explanation: "10.0.0.0/8 is a private address range defined in RFC 1918. 172.32.x.x is public (private is 172.16-31). 192.169 is public. 8.8.8.8 is public (Google DNS)."
        }
    ],
    "subnetting": [
        {
            id: 1,
            text: "What does CIDR stand for?",
            options: [
                "Classless Inter-Domain Routing",
                "Classful Internet Domain Routing",
                "Computer Internet Data Routing",
                "Common IP Domain Routing"
            ],
            correctAnswer: 0,
            explanation: "CIDR (Classless Inter-Domain Routing) allows for more flexible allocation of IP addresses than the original class system."
        },
        {
            id: 2,
            text: "If you borrow 3 bits for subnetting, how many subnets do you create?",
            options: ["3", "6", "8", "9"],
            correctAnswer: 2,
            explanation: "The number of subnets is 2^n, where n is the number of borrowed bits. 2^3 = 8."
        }
    ],
    "routing-algorithms": [
        {
            id: 1,
            text: "Which algorithm is used by the RIP protocol?",
            options: [
                "Link State",
                "Distance Vector",
                "Path Vector",
                "Flooding"
            ],
            correctAnswer: 1,
            explanation: "RIP (Routing Information Protocol) uses the Distance Vector algorithm (Bellman-Ford) where routers share their knowledge of the network with neighbors."
        },
        {
            id: 2,
            text: "What is the 'Count to Infinity' problem associated with?",
            options: [
                "Link State Routing",
                "Distance Vector Routing",
                "Static Routing",
                "OSPF"
            ],
            correctAnswer: 1,
            explanation: "Count to Infinity is a routing loop problem in Distance Vector routing where incorrect routing information propagates slowly through the network."
        }
    ],
    "tcp-handshake": [
        {
            id: 1,
            text: "What is the first step of the TCP 3-way handshake?",
            options: [
                "SYN-ACK",
                "ACK",
                "SYN",
                "FIN"
            ],
            correctAnswer: 2,
            explanation: "The client initiates the connection by sending a SYN (Synchronize) packet to the server."
        },
        {
            id: 2,
            text: "Which flag is set to terminate a TCP connection?",
            options: ["SYN", "RST", "FIN", "PSH"],
            correctAnswer: 2,
            explanation: "The FIN (Finish) flag is used to gracefully terminate a TCP connection."
        }
    ],
    "ports-protocols": [
        {
            id: 1,
            text: "Which port is commonly used for secure web traffic (HTTPS)?",
            options: ["80", "22", "443", "25"],
            correctAnswer: 2,
            explanation: "Port 443 is the standard port for HTTPS (HTTP Secure). Port 80 is HTTP, 22 is SSH, and 25 is SMTP."
        },
        {
            id: 2,
            text: "Which protocol is connectionless and unreliable?",
            options: ["TCP", "UDP", "HTTP", "FTP"],
            correctAnswer: 1,
            explanation: "UDP (User Datagram Protocol) is a connectionless protocol that does not guarantee delivery, ordering, or error checking."
        }
    ],
    "dns": [
        {
            id: 1,
            text: "What does a Recursive Resolver do?",
            options: [
                "Stores the IP address of the website permanently",
                "Hunts down the IP address by asking other servers",
                "Hosts the website content",
                "Assigns IP addresses to computers"
            ],
            correctAnswer: 1,
            explanation: "A Recursive Resolver is responsible for finding the IP address for a domain name by querying the Root, TLD, and Authoritative servers."
        },
        {
            id: 2,
            text: "Which record type maps a hostname to an IPv4 address?",
            options: ["AAAA", "CNAME", "A", "MX"],
            correctAnswer: 2,
            explanation: "An 'A' record maps a domain name to a 32-bit IPv4 address. 'AAAA' is for IPv6."
        }
    ],
    "dhcp": [
        {
            id: 1,
            text: "Which message in the DORA process is a broadcast from the client?",
            options: ["Offer", "Request", "Discover", "Acknowledge"],
            correctAnswer: 2,
            explanation: "The 'Discover' message is broadcast by the client to find any available DHCP servers on the network."
        },
        {
            id: 2,
            text: "What happens when a DHCP lease expires?",
            options: [
                "The client must stop using the IP address",
                "The client keeps the IP forever",
                "The server shuts down",
                "The network stops working"
            ],
            correctAnswer: 0,
            explanation: "When a lease expires and is not renewed, the client must cease using the IP address, and it returns to the pool for other devices."
        }
    ]
}
