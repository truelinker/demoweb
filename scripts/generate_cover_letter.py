#!/usr/bin/env python3
"""Generate SeeScan cover letter PDF."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.colors import HexColor

OUTPUT_PATH = "content/SeeScan_Cover_Letter.pdf"

doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=letter,
    topMargin=0.5 * inch,
    bottomMargin=0.5 * inch,
    leftMargin=1.0 * inch,
    rightMargin=1.0 * inch,
)

# Styles
name_style = ParagraphStyle(
    "Name",
    fontName="Times-Bold",
    fontSize=16,
    leading=20,
    alignment=TA_CENTER,
    spaceAfter=2,
)

separator_style = ParagraphStyle(
    "Separator",
    fontName="Times-Roman",
    fontSize=10,
    alignment=TA_CENTER,
    textColor=HexColor("#888888"),
    spaceAfter=10,
)

heading_style = ParagraphStyle(
    "Heading",
    fontName="Times-Bold",
    fontSize=10.5,
    leading=14,
    spaceBefore=8,
    spaceAfter=4,
)

body_style = ParagraphStyle(
    "Body",
    fontName="Times-Roman",
    fontSize=10.5,
    leading=14,
    alignment=TA_LEFT,
    spaceAfter=8,
)

closing_style = ParagraphStyle(
    "Closing",
    fontName="Times-Roman",
    fontSize=10.5,
    leading=14,
    alignment=TA_LEFT,
    spaceBefore=4,
    spaceAfter=2,
)

story = []

# Header
story.append(Paragraph("Myung Guk Lee", name_style))
story.append(Paragraph("&mdash;" * 20, separator_style))

# Body paragraphs
story.append(Paragraph("Dear Hiring Manager,", body_style))
story.append(Spacer(1, 2))

story.append(Paragraph(
    "I am writing to express my strong interest in the Senior Embedded Systems Engineer "
    "position at SeeScan. With over 15 years of hands-on experience in embedded firmware "
    "development &mdash; from bare-metal device drivers to RTOS-based systems &mdash; I am "
    "confident I can make meaningful contributions to your team.",
    body_style,
))

story.append(Paragraph("Why I'm a strong fit:", heading_style))

story.append(Paragraph(
    "Throughout my career, I have worked exactly where software meets hardware. At GreenWave "
    "Radios, I develop multi-core SoC firmware on ThreadX RTOS, writing device drivers for "
    "SPI, UART, and PCIe interfaces. I designed a UART daisy chain communication architecture "
    "with SLIP framing for multi-node 5G systems, and implemented a CAST SPI-to-AHB bridge "
    "driver for FPGA register access &mdash; work that demanded hands-on hardware debugging "
    "and close collaboration with hardware engineers during board bring-up.",
    body_style,
))

story.append(Paragraph(
    "At Western Digital, over nearly a decade, I developed storage firmware in C for HDD and "
    "SSD platforms. I architected a unified security API adopted across 5+ product lines, "
    "shipped TCG-compliant firmware securing millions of enterprise drives, and implemented a "
    "PCIe AHCI device driver for hybrid HDD systems. This work honed my skills in bare-metal "
    "programming, secure boot implementation, and deep understanding of compilers, linkers, "
    "and memory-mapped I/O.",
    body_style,
))

story.append(Paragraph(
    "Earlier in my career at Dasan Networks and AnyData, I built embedded software for network "
    "switches and designed an OTA firmware update system that reduced field deployment time by "
    "80%. These roles gave me a strong foundation in communication protocols, system "
    "reliability, and efficient resource management on constrained platforms.",
    body_style,
))

story.append(Paragraph("Why SeeScan:", heading_style))

story.append(Paragraph(
    "What draws me to SeeScan is your mission &mdash; building products that help people see "
    "what's otherwise hidden. I find it compelling that you manufacture your equipment from "
    "the ground up, which means the embedded work is central to the product, not an "
    "afterthought. Having spent my career bridging hardware and software, I thrive in "
    "environments where I can see the direct impact of my firmware on a physical system. Your "
    "emphasis on long-term team membership and continuous learning aligns with how I approach "
    "my career: I invest deeply in the products and teams I work with.",
    body_style,
))

story.append(Paragraph(
    "I am currently based in Orange County, CA and am willing to relocate to work onsite at "
    "your Kearny Mesa location. I would welcome the opportunity to discuss how my experience "
    "in embedded C/C++ development, RTOS programming, communication protocols, and "
    "hardware-software integration can contribute to SeeScan's continued innovation.",
    body_style,
))

story.append(Paragraph("Thank you for your consideration.", body_style))
story.append(Spacer(1, 4))
story.append(Paragraph("Sincerely,", closing_style))
story.append(Paragraph("<b>Myung Guk Lee</b>", closing_style))

doc.build(story)
print(f"PDF saved to {OUTPUT_PATH}")
