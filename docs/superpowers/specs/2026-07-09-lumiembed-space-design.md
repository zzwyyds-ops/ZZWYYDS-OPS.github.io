# LumiEmbed Space Design

## Objective

Build the first runnable version of **LumiEmbed Space**, a high-end single-page portfolio website for an embedded and machine vision engineer.

The site should feel like a refined designer portfolio or creative agency website rather than a normal technical template. It will be implemented with React and Vite and placed in `D:\codex杂项\my_ website`.

## Audience

The primary audience is people who want to understand the engineer's technical taste, project direction, and creative capability quickly:

- teachers, classmates, collaborators, and recruiters
- visitors interested in embedded systems, machine vision, and edge devices
- future viewers of project demos, videos, posters, games, and 4G camera car work

## Visual Direction

The approved direction is **Warm Dream Particles**.

The visual language uses:

- warm white, orange, amber, and soft yellow as the main palette
- translucent glass surfaces for navigation and selected panels
- soft dynamic particles in the hero area to simulate a full-screen video until real video assets are supplied
- restrained technology details, avoiding a hard black terminal or generic dashboard look
- generous spacing, large expressive typography, and a premium creative-agency rhythm

The first version should not use a dark cyberpunk theme, dense control-console layout, or generic card-grid template.

## Information Architecture

This is a single-page site with four navigation anchors:

- 角色介绍
- 作品案例
- 互动体验
- 联系方式

The page sections are:

1. Hero
2. Role Introduction
3. Works / Cases
4. Interactive Experience
5. Contact

## Hero Section

The hero fills the first viewport.

Required content:

- site name: `LumiEmbed Space`
- identity line: embedded and machine vision engineer
- glass navigation bar with the four anchors
- dynamic particle background that stands in for the future full-screen video

The hero should feel warm, dreamlike, and technically precise. It should include enough motion to feel alive, while staying smooth on normal laptops and phones.

When real media arrives later, the particle background should be replaceable by a `<video>` asset without rewriting the page structure.

## Role Introduction

This section introduces the identity and engineering direction.

Content themes:

- embedded systems
- machine vision
- edge devices
- STM32, ESP32, Raspberry Pi, and related hardware platforms
- 4G camera car and future device-control projects

The copy should be concise and polished. It should present the engineer as hands-on, visual, and system-minded rather than as a generic resume page.

## Works / Cases

The first version includes polished placeholders for:

- project video
- project poster or visual still
- embedded / vision project case cards

The placeholders should be visually intentional, not gray boxes. They should be easy to replace with real MP4, JPG, or PNG assets later.

Possible first case names:

- 4G Camera Car
- Smart Fan
- Vision Lab Notes

These can be adjusted later when real materials are provided.

## Interactive Experience

The first version includes a lightweight interaction area that can later grow into demos.

Initial entries:

- Vision Demo placeholder
- Mini Games placeholder
- 4G Camera Car entry

The 4G Camera Car entry may link to the current camera page when desired:

`http://175.178.171.79:8080`

The first version does not need to implement device control, camera embedding, MQTT, TCP control, or backend services. Those are future phases.

## Contact

Only email is shown.

Required contact:

`1022815834@qq.com`

Do not include a phone number.

## Technical Design

Use React + Vite.

The first version should be a static frontend suitable for GitHub Pages or any static web host. It should not require a Node backend to run in production.

Suggested structure:

- `src/App.jsx` for page composition
- `src/main.jsx` for React entry
- `src/styles.css` for global styling and section styles
- `src/data/portfolio.js` for editable project/contact data if useful
- `public/` for future videos and images

The project should support:

- desktop-first presentation with a content width around 1700px
- responsive layout for phone viewing
- smooth anchor navigation
- accessible links and semantic sections
- reduced-motion fallback for particle animations

## Out of Scope For First Version

The first version will not include:

- real video or poster assets unless the user provides them
- backend APIs
- MQTT
- TCP control
- embedded camera view inside `/car`
- device status panels
- real mini games
- domain binding or deployment automation

## Success Criteria

The first version is successful when:

- it runs locally with Vite
- the first viewport feels premium, warm, dreamlike, and technical
- navigation anchors work
- all requested sections exist
- contact email is correct
- no phone number is displayed
- placeholder media areas look intentional and are easy to replace later
- the layout works on desktop and remains readable on mobile
