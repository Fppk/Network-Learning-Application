import json
import os

def fix_en():
    path = 'messages/en.json'
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 1. Close Labs after RoutingAlgorithms (line 217, 0-indexed 216)
    # Line 216 is "        },"
    # We want to add "    }," after it.
    if "        }," in lines[216]:
        lines.insert(217, "    },\n")
    else:
        print("Warning: Line 216 in en.json is not '        },'")

    # 2. Remove duplicates starting from second "Dns"
    # Find the second occurrence of "Dns": {
    dns_indices = [i for i, line in enumerate(lines) if '"Dns": {' in line]
    if len(dns_indices) > 1:
        second_dns = dns_indices[1]
        # The lines before second_dns are likely "    }," and "        }" (end of TcpHandshakeVisualizer)
        # We want to keep TcpHandshakeVisualizer end, add comma, and add Footer.
        
        # Check if line before is "    }," (closing Labs duplicate)
        if "    }," in lines[second_dns - 1]:
            # Check if line before that is "        }" (closing TcpHandshakeVisualizer)
            if "        }" in lines[second_dns - 2]:
                # Truncate from second_dns - 1
                lines = lines[:second_dns - 1]
                # Add comma to the last line (TcpHandshakeVisualizer end)
                lines[-1] = "        },\n"
            else:
                print("Warning: Expected TcpHandshakeVisualizer end before second Dns in en.json")
        else:
             print("Warning: Expected closing brace before second Dns in en.json")
        
        # Append Footer
        lines.append('    "Footer": {\n')
        lines.append('        "description": "An open-source interactive learning platform for computer networking fundamentals.",\n')
        lines.append('        "learn": "Learn",\n')
        lines.append('        "curriculum": "Curriculum",\n')
        lines.append('        "labs": "Labs",\n')
        lines.append('        "project": "Project",\n')
        lines.append('        "about": "About",\n')
        lines.append('        "legal": "Legal",\n')
        lines.append('        "privacy": "Privacy",\n')
        lines.append('        "terms": "Terms",\n')
        lines.append('        "rights": "© 2024 NetLearn AI. All rights reserved."\n')
        lines.append('    }\n')
        lines.append('}\n')
    else:
        print("Warning: Could not find second Dns block in en.json")

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Fixed en.json")

def fix_zh():
    path = 'messages/zh.json'
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 1. Close Labs after RoutingAlgorithms (line 226, 0-indexed 225)
    # Line 225 is "        },"
    if "        }," in lines[225]:
        lines.insert(226, "    },\n")
    else:
        print("Warning: Line 225 in zh.json is not '        },'")

    # 2. Fix SubnetCalculator and remove garbage
    # Find "SubnetCalculator": {
    subnet_indices = [i for i, line in enumerate(lines) if '"SubnetCalculator": {' in line]
    if subnet_indices:
        subnet_idx = subnet_indices[-1] # Use the last one if multiple? No, there should be one valid one.
        # Actually, in zh.json, SubnetCalculator is at 401 (0-indexed 400).
        # We want to replace everything from there.
        
        lines = lines[:subnet_idx]
        
        # Append correct SubnetCalculator
        lines.append('        "SubnetCalculator": {\n')
        lines.append('            "title": "子网计算器",\n')
        lines.append('            "description": "通过借用主机位将网络划分为更小的子网。",\n')
        lines.append('            "networkAddress": "网络地址",\n')
        lines.append('            "currentCidr": "当前 CIDR",\n')
        lines.append('            "borrowBits": "借位",\n')
        lines.append('            "newCidr": "新 CIDR",\n')
        lines.append('            "subnetsCreated": "创建的子网",\n')
        lines.append('            "hostsPerSubnet": "每子网主机数",\n')
        lines.append('            "resultingSubnets": "结果子网 (前 16 个)",\n')
        lines.append('            "range": "范围",\n')
        lines.append('            "broadcast": "广播",\n')
        lines.append('            "moreSubnets": "... 还有 {count} 个子网。"\n')
        lines.append('        },\n')
        
        # Append TcpHandshakeVisualizer
        lines.append('        "TcpHandshakeVisualizer": {\n')
        lines.append('            "title": "TCP 三次握手",\n')
        lines.append('            "description": "建立可靠连接的逐步可视化。",\n')
        lines.append('            "client": "客户端",\n')
        lines.append('            "server": "服务器",\n')
        lines.append('            "start": "开始握手",\n')
        lines.append('            "next": "下一步",\n')
        lines.append('            "reset": "重置",\n')
        lines.append('            "step1": "1. 客户端发送 SYN 请求连接。",\n')
        lines.append('            "step2": "2. 服务器确认 (ACK) 并发送自己的 SYN。",\n')
        lines.append('            "step3": "3. 客户端确认服务器的 SYN。连接建立。"\n')
        lines.append('        },\n')
        
        # Append Footer
        lines.append('        "Footer": {\n')
        lines.append('            "description": "一个开源的计算机网络基础交互式学习平台。",\n')
        lines.append('            "learn": "学习",\n')
        lines.append('            "curriculum": "课程",\n')
        lines.append('            "labs": "实验室",\n')
        lines.append('            "project": "项目",\n')
        lines.append('            "about": "关于",\n')
        lines.append('            "legal": "法律",\n')
        lines.append('            "privacy": "隐私",\n')
        lines.append('            "terms": "条款",\n')
        lines.append('            "rights": "© 2024 NetLearn AI. 保留所有权利。"\n')
        lines.append('        }\n')
        lines.append('}\n')
    else:
        print("Warning: Could not find SubnetCalculator in zh.json")

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Fixed zh.json")

if __name__ == "__main__":
    fix_en()
    fix_zh()
