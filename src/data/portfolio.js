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
    profileLabel: "个人信息",
    manifestoLabel: "自我提醒",
    skillLabel: "技能标签",
  },
  works: {
    note: "作品案例",
    title: "嵌入式项目库与后续视觉实验",
  },
  featured: {
    note: "重点项目",
    title: "先把最能代表方向的项目放到首页",
    body:
      "这一组先作为首页重点入口，后续会继续补充项目简介、结构图、实物照片和演示视频。",
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

export const profileFacts = [
  { label: "学历", value: "本科" },
  { label: "专业", value: "电子科学与技术" },
  { label: "学校", value: "四川文理学院" },
];

export const manifestoQuotes = [
  "AI 不会取代你，但会用 AI 的人会。",
  "AI 时代，稀缺的不再是知识，而是判断力。",
  "AI 的深度像一片静态海洋；你提问的锚点，决定你能打捞出多少沉默的宝藏。",
];

export const projectCases = [
  {
    title: "4G 摄像头坦克",
    category: "远程视频 / 4G 通信",
    description: "项目框架已建立，后续补充通信链路、视频上传、控制逻辑与实物展示。",
    mediaType: "video",
    mediaLabel: "视频",
    featured: true,
  },
  {
    title: "智能蓝牙人体追踪风扇",
    category: "嵌入式控制 / 人体追踪",
    description: "项目框架已建立，后续补充蓝牙控制、人体检测、舵机追踪与风扇联动说明。",
    mediaType: "poster",
    mediaLabel: "海报",
    featured: true,
  },
  {
    title: "游戏力反馈方向盘",
    category: "力反馈 / 交互设备",
    description: "项目框架已建立，后续补充方向盘结构、反馈电机、控制算法与游戏联动效果。",
    mediaType: "case",
    mediaLabel: "案例",
    featured: true,
  },
  {
    title: "OpenMV 视觉搬运小车",
    category: "OpenMV / 机器视觉",
    description: "项目框架已建立，后续补充视觉识别、搬运流程、执行机构与路线规划。",
    mediaType: "vision",
    mediaLabel: "视觉",
    featured: true,
  },
  {
    title: "平衡小车",
    category: "姿态控制 / 运动控制",
    description: "项目框架已建立，后续补充姿态解算、PID 控制、电机驱动与调参记录。",
    mediaType: "device",
    mediaLabel: "控制",
  },
  {
    title: "STM32 宠物喂食机器人",
    category: "STM32 / 智能设备",
    description: "项目框架已建立，后续补充定时投喂、舵机结构、传感检测与设备外观展示。",
    mediaType: "device",
    mediaLabel: "投喂",
  },
  {
    title: "4G 远程小车",
    category: "4G 通信 / 远程控制",
    description: "项目框架已建立，后续补充 4G 通信链路、远程控制协议、运动底盘与调试记录。",
    mediaType: "video",
    mediaLabel: "远程",
  },
  {
    title: "避障蓝牙巡线小车",
    category: "传感器 / 蓝牙控制",
    description: "项目框架已建立，后续补充巡线逻辑、避障传感、蓝牙控制与运行视频。",
    mediaType: "interface",
    mediaLabel: "小车",
  },
  {
    title: "语音开关",
    category: "语音控制 / 智能硬件",
    description: "项目框架已建立，后续补充语音识别、开关执行、电源控制与使用场景。",
    mediaType: "case",
    mediaLabel: "语音",
  },
  {
    title: "NFC 门禁",
    category: "NFC / 门禁系统",
    description: "项目框架已建立，后续补充刷卡认证、权限管理、门锁控制与安全设计。",
    mediaType: "device",
    mediaLabel: "门禁",
  },
];

export const featuredProjectCases = projectCases.filter((project) => project.featured);

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
    title: "4G 坦克",
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
    title: "追踪风扇",
    caption: "蓝牙控制与人体追踪",
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
