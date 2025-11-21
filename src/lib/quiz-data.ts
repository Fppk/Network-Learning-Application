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
    ]
}
