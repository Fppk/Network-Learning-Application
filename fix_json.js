const fs = require('fs');

function fixEn() {
    const path = 'messages/en.json';
    let content = fs.readFileSync(path, 'utf8');
    let lines = content.split('\n');

    // 1. Close Labs after RoutingAlgorithms (line 217, 0-indexed 216)
    // Line 216 is "        },"
    if (lines[216] && lines[216].includes('        },')) {
        lines.splice(217, 0, '    },');
        console.log('Inserted closing brace for Labs in en.json');
    } else {
        console.log('Warning: Line 216 in en.json is not "        },": ' + lines[216]);
    }

    // 2. Remove duplicates starting from second "Dns"
    let dnsIndices = [];
    lines.forEach((line, index) => {
        if (line.includes('"Dns": {')) {
            dnsIndices.push(index);
        }
    });

    if (dnsIndices.length > 1) {
        const secondDns = dnsIndices[1];
        // Check context
        if (lines[secondDns - 1].includes('    },') && lines[secondDns - 2].includes('        }')) {
            lines = lines.slice(0, secondDns - 1);
            // Add comma to last line
            lines[lines.length - 1] = '        },';

            // Append Footer
            lines.push('    "Footer": {');
            lines.push('        "description": "An open-source interactive learning platform for computer networking fundamentals.",');
            lines.push('        "learn": "Learn",');
            lines.push('        "curriculum": "Curriculum",');
            lines.push('        "labs": "Labs",');
            lines.push('        "project": "Project",');
            lines.push('        "about": "About",');
            lines.push('        "legal": "Legal",');
            lines.push('        "privacy": "Privacy",');
            lines.push('        "terms": "Terms",');
            lines.push('        "rights": "© 2024 NetLearn AI. All rights reserved."');
            lines.push('    }');
            lines.push('}');
            console.log('Removed duplicates and added Footer in en.json');
        } else {
            console.log('Warning: Unexpected context before second Dns in en.json');
            console.log('Line -1: ' + lines[secondDns - 1]);
            console.log('Line -2: ' + lines[secondDns - 2]);
        }
    } else {
        console.log('Warning: Could not find second Dns block in en.json');
    }

    fs.writeFileSync(path, lines.join('\n'), 'utf8');
}

function fixZh() {
    const path = 'messages/zh.json';
    let content = fs.readFileSync(path, 'utf8');
    let lines = content.split('\n');

    // 1. Close Labs after RoutingAlgorithms (line 226, 0-indexed 225)
    if (lines[225] && lines[225].includes('        },')) {
        lines.splice(226, 0, '    },');
        console.log('Inserted closing brace for Labs in zh.json');
    } else {
        console.log('Warning: Line 225 in zh.json is not "        },": ' + lines[225]);
    }

    // 2. Fix SubnetCalculator
    let subnetIndex = -1;
    lines.forEach((line, index) => {
        if (line.includes('"SubnetCalculator": {')) {
            subnetIndex = index;
        }
    });

    if (subnetIndex !== -1) {
        lines = lines.slice(0, subnetIndex);

        lines.push('        "SubnetCalculator": {');
        lines.push('            "title": "子网计算器",');
        lines.push('            "description": "通过借用主机位将网络划分为更小的子网。",');
        lines.push('            "networkAddress": "网络地址",');
        lines.push('            "currentCidr": "当前 CIDR",');
        lines.push('            "borrowBits": "借位",');
        lines.push('            "newCidr": "新 CIDR",');
        lines.push('            "subnetsCreated": "创建的子网",');
        lines.push('            "hostsPerSubnet": "每子网主机数",');
        lines.push('            "resultingSubnets": "结果子网 (前 16 个)",');
        lines.push('            "range": "范围",');
        lines.push('            "broadcast": "广播",');
        lines.push('            "moreSubnets": "... 还有 {count} 个子网。"');
        lines.push('        },');

        lines.push('        "TcpHandshakeVisualizer": {');
        lines.push('            "title": "TCP 三次握手",');
        lines.push('            "description": "建立可靠连接的逐步可视化。",');
        lines.push('            "client": "客户端",');
        lines.push('            "server": "服务器",');
        lines.push('            "start": "开始握手",');
        lines.push('            "next": "下一步",');
        lines.push('            "reset": "重置",');
        lines.push('            "step1": "1. 客户端发送 SYN 请求连接。",');
        lines.push('            "step2": "2. 服务器确认 (ACK) 并发送自己的 SYN。",');
        lines.push('            "step3": "3. 客户端确认服务器的 SYN。连接建立。"');
        lines.push('        },');

        lines.push('        "Footer": {');
        lines.push('            "description": "一个开源的计算机网络基础交互式学习平台。",');
        lines.push('            "learn": "学习",');
        lines.push('            "curriculum": "课程",');
        lines.push('            "labs": "实验室",');
        lines.push('            "project": "项目",');
        lines.push('            "about": "关于",');
        lines.push('            "legal": "法律",');
        lines.push('            "privacy": "隐私",');
        lines.push('            "terms": "条款",');
        lines.push('            "rights": "© 2024 NetLearn AI. 保留所有权利。"');
        lines.push('        }');
        lines.push('}');
        console.log('Fixed SubnetCalculator and end of zh.json');
    } else {
        console.log('Warning: Could not find SubnetCalculator in zh.json');
    }

    fs.writeFileSync(path, lines.join('\n'), 'utf8');
}

fixEn();
fixZh();
