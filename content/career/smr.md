---
title: "SMR"
subtitle: "Shingled Magnetic Recording"
excerpt: "Development of SMR HDD firmware that only uses sequential read and write"
date: 2022-08-30
author: "Myung Guk Lee"
draft: false
images:
  - /career/assets/tachyons-thumbnail.png
  - /career/assets/tachyons-logo-script-feature.png
series:
  - Getting Started
tags:
  - hugo-site
categories:
  - Theme Features
# layout options: single or single-sidebar
layout: single
---


### Participated in the drive managed SMR HDD development.

Because the size of Read Header in HDD is smaller than Write Header, it is possible to write more densely when writing. This is the basic concept of SMR (Shingled Magnetic Recording). There are two main types of SMR HDDs: Host Managed SMR and Drive Managed SMR. The reason for dividing into two is that for SMR drives capable of only sequential write/read, the location of LBA and actual physical location is different each time it is written, so an indirection mapping table is needed for this. If this mapping table is managed by the host, it is a host managed SMR drive, and if managed by the drive, it becomes a drive managed SMR drive. I joined SMR development late because of other projects I participated, and focused on fixing bugs that occurred during validation while most of the design and development were completed.