#!/usr/bin/env python3
"""
Script to rebuild the corrupted messages/en.json file.
"""
import json

# Read the current file to extract the valid sections
with open('messages/en.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse what we can
try:
    data = json.loads(content)
    print("File is valid JSON!")
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")
    print(f"At line {e.lineno}, column {e.colno}")
    
# Since the file is corrupted, we'll need to manually build it
# Reading line 212-221 which has the PortsProtocols table start with trailing comma
# We need to complete the table and remove all the garbage after it

# Read the file line by line
with open('messages/en.json', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
print(f"\nLine 220-230:")
for i in range(219, min(230, len(lines))):
    print(f"{i+1}: {lines[i]}", end='')
    
print(f"\nLine 395-405:")
for i in range(394, min(405, len(lines))):
    print(f"{i+1}: {lines[i]}", end='')
