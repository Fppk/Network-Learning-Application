import React from "react"
import { SubnetCalculator } from "@/components/visualizers/subnet-calculator"

export function SubnettingContent() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Subnetting & CIDR</h2>
                <p className="text-lg text-muted-foreground">
                    Subnetting allows you to divide a single network into smaller logical networks (subnets) by borrowing bits from the host portion of the IP address.
                </p>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300">Why Subnet?</h3>
                    <ul className="list-disc list-inside mt-2 text-sm text-blue-700 dark:text-blue-400">
                        <li>Reduce network traffic (smaller broadcast domains).</li>
                        <li>Improve network security.</li>
                        <li>Easier management.</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Interactive Calculator</h2>
                <p className="text-muted-foreground">
                    Use the tool below to visualize how borrowing bits increases the number of subnets but decreases the number of hosts per subnet.
                </p>
                <SubnetCalculator />
            </section>
        </div>
    )
}
