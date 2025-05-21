
// File containing demo data for the dashboard

export const generateTimeSeries = (points: number, baseValue: number = 50, volatility: number = 10): number[] => {
  const data: number[] = [];
  let value = baseValue;
  
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.5) * volatility;
    value = Math.max(0, Math.min(100, value));
    data.push(Math.round(value * 100) / 100);
  }
  
  return data;
};

export const trafficData = {
  inbound: generateTimeSeries(24, 65, 15),
  outbound: generateTimeSeries(24, 40, 15),
  labels: Array.from({ length: 24 }).map((_, i) => `${i}:00`)
};

export const cpuUsage = 68;
export const memoryUsage = 42;
export const activeConnections = 847;
export const packetLoss = 0.7;

export const alertData = [
  {
    id: "alert-1",
    title: "Brute Force Attack Detected",
    description: "Multiple failed login attempts from IP 203.0.113.42",
    timestamp: "2 mins ago",
    severity: "critical" as const,
    source: "IDS"
  },
  {
    id: "alert-2",
    title: "Unusual Outbound Traffic",
    description: "High volume traffic detected to port 25 from internal host",
    timestamp: "15 mins ago",
    severity: "high" as const,
    source: "Traffic Monitor"
  },
  {
    id: "alert-3",
    title: "Connection from Blocklisted IP",
    description: "Connection attempt from known malicious IP 198.51.100.78",
    timestamp: "32 mins ago",
    severity: "medium" as const,
    source: "Firewall"
  },
  {
    id: "alert-4",
    title: "SSL Certificate Expiring",
    description: "VPN server certificate expires in 5 days",
    timestamp: "1 hour ago",
    severity: "low" as const,
    source: "System"
  }
];

export const threatMapData = [
  { id: 1, source: "203.0.113.42", destination: "10.0.0.15", lat: 37.77, lng: -122.41, magnitude: 85 },
  { id: 2, source: "198.51.100.78", destination: "10.0.0.23", lat: 40.71, lng: -74.01, magnitude: 65 },
  { id: 3, source: "192.0.2.166", destination: "10.0.0.8", lat: 51.50, lng: -0.12, magnitude: 42 },
  { id: 4, source: "203.0.113.111", destination: "10.0.0.31", lat: 35.68, lng: 139.76, magnitude: 38 },
  { id: 5, source: "198.51.100.22", destination: "10.0.0.17", lat: 55.75, lng: 37.61, magnitude: 29 }
];

export const aiRecommendations = [
  {
    id: "rec-1",
    title: "Block Suspicious IP Range",
    description: "Consider blocking the IP range 203.0.113.0/24 due to multiple intrusion attempts",
    confidence: 92,
    impact: "Medium",
    type: "Security"
  },
  {
    id: "rec-2",
    title: "Update Firewall Rule #28",
    description: "Modify rule to restrict outbound SMB traffic to internal networks only",
    confidence: 86,
    impact: "Low",
    type: "Optimization"
  },
  {
    id: "rec-3",
    title: "Increase UDP Connection Timeout",
    description: "Current setting causing legitimate VoIP connections to drop",
    confidence: 78,
    impact: "Low",
    type: "Performance"
  }
];

export const firewallRules = [
  {
    id: "rule-1",
    status: "active",
    name: "Block External SMTP",
    sourceIp: "any",
    destIp: "10.0.0.0/24",
    port: "25",
    protocol: "TCP",
    action: "block",
    lastUpdated: "2023-05-12"
  },
  {
    id: "rule-2",
    status: "active",
    name: "Allow Web Traffic",
    sourceIp: "any",
    destIp: "10.0.0.15",
    port: "80,443",
    protocol: "TCP",
    action: "allow",
    lastUpdated: "2023-05-12"
  },
  {
    id: "rule-3",
    status: "inactive",
    name: "Remote Access",
    sourceIp: "192.168.1.0/24",
    destIp: "10.0.0.0/24",
    port: "22",
    protocol: "TCP",
    action: "allow",
    lastUpdated: "2023-05-10"
  },
  {
    id: "rule-4",
    status: "active",
    name: "Block Telnet",
    sourceIp: "any",
    destIp: "any",
    port: "23",
    protocol: "TCP",
    action: "block",
    lastUpdated: "2023-05-09"
  }
];
