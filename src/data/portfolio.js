export const pageCopy = {
  headerHomeLabel: "EmbedVision Lab 首页",
  headerNavLabel: "主导航",
  headerCta: "联系我",
  hero: {
    note: "嵌入式作品集 / 边缘视觉实验室",
    interest:
      "个人爱好：制作电子产品、动手 DIY、研究穿越机，把好奇心变成能上电、能运行的小系统。",
    author: "作者：张志伟",
    subtitle:
      "一个聚焦嵌入式系统、机器视觉与边缘设备实验的个人作品集，用更克制的交互与更清晰的表达，呈现技术项目的温度与质感。",
    actionsLabel: "主要操作",
    primaryCta: "查看作品",
    secondaryCta: "联系我",
  },
  role: {
    note: "角色介绍",
    title: "专注嵌入式与机器视觉，把想法做成真正能运行的系统。",
    body:
      "EmbedVision Lab 汇集了我在嵌入式控制、机器视觉、无线通信与小型交互系统上的实践项目。相比堆砌功能，我更在意设备进入真实场景之后，是否足够稳定、直接、清晰，也是否有继续扩展成完整系统的可能。",
    hobby:
      "我的兴趣也一直围绕真实硬件展开：喜欢制作电子产品、动手 DIY、研究穿越机与各类可运动设备，把好奇心变成能上电、能运行、能被人使用的小系统。",
    skillLabel: "技能标签",
  },
  works: {
    note: "作品案例",
    title: "一些正在成形的项目与实验",
  },
  play: {
    note: "小游戏实验室",
    title: "直接在主页里玩点轻量交互",
    body:
      "先放进三个适合移动端和桌面端快速体验的小游戏：2048、贪吃蛇和井字棋。它们既是娱乐入口，也是页面交互与设备表现的小型实验场。",
  },
  experience: {
    note: "互动体验",
    title: "可继续接入、扩展、联动的入口区域",
  },
  contact: {
    note: "联系方式",
    title:
      "如果你也在做设备、视觉、控制或有趣的小系统，可以直接联系我。",
  },
};

export const navItems = [
  { label: "角色介绍", href: "#role" },
  { label: "作品案例", href: "#works" },
  { label: "小游戏", href: "#play" },
  { label: "互动体验", href: "#experience" },
  { label: "联系方式", href: "#contact" },
];

export const skillSignals = [
  "嵌入式系统",
  "机器视觉",
  "边缘设备",
  "电子产品 DIY",
  "穿越机",
  "STM32 / ESP32 / Raspberry Pi",
  "4G 摄像头小车",
];

export const projectCases = [
  {
    title: "4G 摄像头小车",
    category: "边缘视觉 / 远程视频",
    description:
      "一个围绕 TCP 视频上传、云端中转与后续远程控制界面展开的移动视觉平台。",
    mediaType: "video",
    mediaLabel: "视频",
  },
  {
    title: "智能风扇",
    category: "嵌入式控制",
    description:
      "基于 STM32 的嵌入式项目，包含传感、显示、蓝牙通信与移动端联动等能力。",
    mediaType: "poster",
    mediaLabel: "海报",
  },
  {
    title: "视觉实验记录",
    category: "机器视觉",
    description:
      "持续积累目标检测、图像处理与边缘 AI 原型测试的实验记录与阶段性成果。",
    mediaType: "case",
    mediaLabel: "案例",
  },
];

export const experienceEntries = [
  {
    title: "视觉演示区",
    description:
      "后续会放入浏览器可直接体验的检测演示与视觉实验预览。",
    action: "即将开放",
    href: "#works",
  },
  {
    title: "小游戏入口",
    description:
      "现在已经可以在站内直接玩 2048、贪吃蛇和井字棋，后续还能继续扩展。",
    action: "进入试玩",
    href: "#play",
  },
  {
    title: "4G 摄像头小车",
    description:
      "当前先跳转到现有实时视频页，后续会整合为站内独立页面与控制台。",
    action: "打开视频",
    href: "http://175.178.171.79:8080",
  },
];

export const heroShowcaseItems = [
  {
    title: "4G 小车",
    caption: "视频中转与远程入口",
    tag: "LIVE CAM",
    href: "http://175.178.171.79:8080",
    tone: "circuit",
  },
  {
    title: "视觉演示",
    caption: "识别流程与实验预览",
    tag: "EDGE AI",
    href: "#experience",
    tone: "sunrise",
  },
  {
    title: "作品案例",
    caption: "从原型到完成度的记录",
    tag: "PORTFOLIO",
    href: "#works",
    tone: "studio",
  },
  {
    title: "控制台",
    caption: "后续接入设备状态与指令",
    tag: "CONSOLE",
    href: "#experience",
    tone: "ember",
  },
  {
    title: "智能风扇",
    caption: "STM32 系统与硬件联动",
    tag: "STM32",
    href: "#works",
    tone: "citrus",
  },
  {
    title: "小游戏",
    caption: "轻交互入口与页面实验",
    tag: "PLAY LAB",
    href: "#play",
    tone: "room",
  },
];

export const contact = {
  email: "1022815834@qq.com",
};
