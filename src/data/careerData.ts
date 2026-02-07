export type CompanyKey = 'greenWaveRadio' | 'westernDigital' | 'anyData' | 'dasanNetworks';

export const companyOrder: CompanyKey[] = [
  'dasanNetworks',
  'anyData',
  'westernDigital',
  'greenWaveRadio',
];

export type CompanyDetail = {
  title: string;
  company: string;
  companyShort: string;
  period: string;
  yearStart: number;
  yearEnd: number | null; // null = present
  duties: string[];
  achievements: string[];
  techStack: string[];
  color: string; // accent color for timeline nodes
};

export const companyDetails: Record<CompanyKey, CompanyDetail> = {
  dasanNetworks: {
    title: 'Software Engineer',
    company: 'Dasan Networks',
    companyShort: 'Dasan',
    period: '2008 - 2012',
    yearStart: 2008,
    yearEnd: 2012,
    duties: [
      'Developed embedded software for network devices including routers and switches.',
      'Implemented IPv6 protocol stack for next-generation networking equipment.',
      'Created diagnostic tools for network troubleshooting and performance analysis.',
      'Enhanced system reliability through automated testing and fault recovery mechanisms.',
    ],
    achievements: [
      'Delivered Layer 2 switch firmware supporting DHCP snooping and ARP inspection.',
      'Built automated network diagnostic toolchain used across QA teams.',
    ],
    techStack: ['C', 'Linux', 'IPv6', 'Networking', 'Embedded Systems'],
    color: '#57cbff',
  },
  anyData: {
    title: 'Embedded Software Engineer',
    company: 'AnyData',
    companyShort: 'AnyData',
    period: '2012 - 2014',
    yearStart: 2012,
    yearEnd: 2014,
    duties: [
      'Engineered over-the-air firmware update system for wireless modems.',
      'Developed remote management system for modem monitoring and control.',
    ],
    achievements: [
      'Designed OTA firmware update system reducing field deployment time by 80%.',
      'Built remote modem management platform for fleet-wide monitoring.',
    ],
    techStack: ['C', 'Wireless', 'OTA Updates', 'Modem Firmware'],
    color: '#f57dff',
  },
  westernDigital: {
    title: 'Firmware Engineer',
    company: 'Western Digital',
    companyShort: 'WD',
    period: '2014 - 2023',
    yearStart: 2014,
    yearEnd: 2023,
    duties: [
      'Developed security features implementing TCG, Sanitize, and ATA Security standards.',
      'Designed secure boot firmware for HDD and SSD storage products.',
      'Created unified security APIs across multiple storage platforms.',
      'Led cross-functional teams integrating security features into storage solutions.',
    ],
    achievements: [
      'Architected unified security API adopted across 5+ storage product lines.',
      'Shipped TCG-compliant firmware securing millions of enterprise drives.',
    ],
    techStack: ['C', 'ARM', 'TCG', 'Storage Firmware', 'Secure Boot', 'AHCI/NVMe'],
    color: '#64ffda',
  },
  greenWaveRadio: {
    title: 'Firmware Engineer',
    company: 'GreenWave Radio',
    companyShort: 'GreenWave',
    period: '2023 - Present',
    yearStart: 2023,
    yearEnd: null,
    duties: [
      'Develop firmware for multi-core SoCs utilizing real-time operating systems.',
      'Implement real-time algorithms for precise RF signal processing.',
      'Design device drivers for GPIO, SPI, and PCIe peripheral interfaces.',
      'Architect secure boot processes for multi-core system-on-chip platforms.',
    ],
    achievements: [
      'Optimized DPD algorithm with NEON SIMD achieving 3x throughput improvement.',
      'Implemented secure multi-core boot sequence for 5G Radio Unit SoC.',
      'Designed UART daisy chain architecture with SLIP framing and zero-copy forwarding for multi-node 5G systems.',
      'Implemented CAST SPI-to-AHB bridge driver for FPGA register access with dual timing modes.',
      'Built a RAG-based document chatbot using AnythingLLM integrating JIRA and SharePoint for engineering knowledge search.',
    ],
    techStack: ['C', 'ARM NEON', 'RTOS', 'ThreadX', 'DSP', 'PCIe', '5G', 'UART', 'SPI', 'RAG', 'LLM'],
    color: '#64ffda',
  },
};

// Maps project slugs to the company they belong to
export const projectCompanyMap: Record<string, CompanyKey> = {
  'optimizing-dpd-algorithm-with-arm-neon-simd': 'greenWaveRadio',
  'flash-filesystem': 'greenWaveRadio',
  'flash-writer-implementation-for-embedded-systems': 'greenWaveRadio',
  'uart-daisy-chain': 'greenWaveRadio',
  'cast-spi-device-driver': 'greenWaveRadio',
  'document-chatbot-anythingllm': 'greenWaveRadio',
  'secure-drive': 'westernDigital',
  'smr': 'westernDigital',
  'pcie-ahci-device-driver-development': 'westernDigital',
  'serial-communication': 'westernDigital',
  'layer-2-switch-development': 'dasanNetworks',
};
