export const pageCopy = {
  headerHomeLabel: "EmbedVision Lab 首页",
  headerNavLabel: "主导航",
  headerCta: "联系我",
  hero: {
    note: "嵌入式作品集 / 边缘视觉实验室",
    interest:
      "个人爱好：制作电子产品、DIY、研究穿越机，把好奇心一步步做成能上电、能运行、能真正落地的小系统。",
    author: "作者：张志伟",
    subtitle:
      "一个以嵌入式系统与机器视觉为核心的个人主页，用作品、实验和真实设备记录技术的温度。科技不是高高在上，而是服务于人民。",
    actionsLabel: "主要操作",
    primaryCta: "查看作品",
    secondaryCta: "联系我",
  },
  role: {
    note: "角色介绍",
    title: "专注嵌入式与机器视觉，把想法做成真正可以运行的系统。",
    body:
      "EmbedVision Lab 汇集了我在嵌入式控制、机器视觉、无线通信与边缘设备上的实践项目。我更关心一个作品进入真实场景之后，是否足够稳定、直接、清晰，是否能继续扩展成真正可用的小型系统。",
    hobby:
      "我长期围绕真实硬件做实验，喜欢制作电子产品、做 DIY、研究穿越机和各种可运动设备，让灵感最后落到电路、结构、代码和交互上。",
    profileLabel: "个人信息",
    manifestoLabel: "自我提醒",
    skillLabel: "技能标签",
  },
  works: {
    note: "作品案例",
    title: "嵌入式项目库与后续机器视觉实验。",
  },
  featured: {
    note: "重点项目",
    title: "先把最能代表当前方向的项目放到首页。",
    body:
      "这几项是目前最适合放在首页的代表作。后续我会继续补充项目简介、结构图、实物照片、调试记录和演示视频，让整个作品集更完整。",
  },
  play: {
    note: "小游戏实验室",
    title: "直接在主页里玩点轻量互动。",
    body:
      "这里先放 2048、贪吃蛇和井字棋，既是小游戏入口，也是我测试页面交互、抽屉结构和前端状态管理的小实验。",
  },
  experience: {
    note: "互动体验",
    title: "可以继续接入、扩展、联动的入口区域。",
  },
  contact: {
    note: "联系方式",
    title:
      "如果你也在做嵌入式、机器视觉、控制系统，或者想交流有意思的小设备，欢迎直接联系我。",
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
  "AI 的深度是静态的海洋，你提问的锚点，才决定你能打捞出多少沉默的宝藏。",
];

export const projectCases = [
  {
    title: "4G 摄像头坦克",
    category: "远程视频 / 4G 通信 / 云中转控制",
    description:
      "这个项目以 STM32 底盘控制为核心，结合 ESP32-CAM、腾讯云中转与手机端远程操作，做出了一套可实时看画面、可远程机动、可双轴转向的 4G 摄像头坦克。视频链路采用 ESP32-CAM 通过随身 WiFi 将 JPEG 帧经 TCP 长连接上传到云服务器，手机端再通过独立端口查看画面，同时使用 MQTT 下发运动、云台和发射指令，把图传和控制拆分成不同通道，提升远程操控时的稳定性和可调试性。",
    mediaType: "video",
    mediaLabel: "实物案例",
    featured: true,
    highlights: [
      "ESP32-CAM TCP 图传",
      "腾讯云多端口中转",
      "MQTT 远程控制",
      "手机陀螺仪双轴云台",
      "STM32 + 继电器发射机构",
      "电机并联陶瓷电容抑制冲击",
    ],
    images: [
      {
        src: "/media/projects/tank-hardware.jpg",
        label: "硬件结构",
        alt: "4G 摄像头坦克硬件结构实拍",
      },
      {
        src: "/media/projects/tank-body.jpeg",
        label: "整车实物",
        alt: "4G 摄像头坦克整车实物照片",
      },
      {
        src: "/media/projects/tank-console.jpeg",
        label: "手机控制界面",
        alt: "4G 摄像头坦克手机端控制界面截图",
      },
    ],
  },
  {
    title: "智能蓝牙人体追踪风扇",
    category: "嵌入式控制 / 人体追踪",
    description:
      "围绕蓝牙控制、人体识别与结构联动展开的智能风扇项目，后续会补充检测方案、追踪逻辑、执行结构与调参过程。",
    mediaType: "poster",
    mediaLabel: "海报",
    featured: true,
  },
  {
    title: "游戏力反馈方向盘",
    category: "力反馈 / 交互设备",
    description:
      "面向沉浸式驾驶交互的方向盘实验，后续会补充机械结构、力反馈驱动、电机控制策略与游戏联动效果。",
    mediaType: "case",
    mediaLabel: "案例",
    featured: true,
  },
  {
    title: "OpenMV 视觉搬运小车",
    category: "OpenMV / 机器视觉",
    description:
      "以目标识别与小车执行联动为核心的视觉搬运项目，后续会补充识别流程、搬运路径、执行机构与调试记录。",
    mediaType: "vision",
    mediaLabel: "视觉",
    featured: true,
  },
  {
    title: "平衡小车",
    category: "姿态控制 / 运动控制",
    description:
      "围绕姿态解算、PID 控制和电机驱动展开的经典控制项目，后续会加入算法设计与调参过程。",
    mediaType: "device",
    mediaLabel: "控制",
  },
  {
    title: "STM32 宠物喂食机器人",
    category: "STM32 / 智能设备",
    description:
      "聚焦定时投喂、结构执行和设备状态检测的宠物喂食项目，后续会继续补充实物图和完整功能说明。",
    mediaType: "device",
    mediaLabel: "投喂",
  },
  {
    title: "4G 远程小车",
    category: "4G 通信 / 远程控制",
    description:
      "围绕远距离网络控制与云端通信链路搭建的小车项目，后续会补充通信协议、底盘控制与调试记录。",
    mediaType: "video",
    mediaLabel: "远程",
  },
  {
    title: "避障蓝牙巡线小车",
    category: "传感器 / 蓝牙控制",
    description:
      "融合巡线、避障与蓝牙交互的基础移动平台项目，后续会补充传感器布置与控制逻辑。",
    mediaType: "interface",
    mediaLabel: "小车",
  },
  {
    title: "语音开关",
    category: "语音控制 / 智能硬件",
    description:
      "一个面向日常设备控制的语音交互实验，后续会补充识别模块、执行电路与使用场景展示。",
    mediaType: "case",
    mediaLabel: "语音",
  },
  {
    title: "NFC 门禁",
    category: "NFC / 门禁系统",
    description:
      "围绕刷卡认证、权限控制与门锁执行完成的门禁项目，后续会补充安全设计与硬件结构说明。",
    mediaType: "device",
    mediaLabel: "门禁",
  },
];

export const featuredProjectCases = projectCases.filter((project) => project.featured);

export const experienceEntries = [
  {
    title: "视觉演示区",
    description: "后续会放入浏览器可直接体验的检测演示和机器视觉实验预览。",
    action: "即将开放",
    href: "#works",
  },
  {
    title: "小游戏入口",
    description: "现在已经可以在站内直接玩 2048、贪吃蛇和井字棋，后续还会继续扩展。",
    action: "进入试玩",
    href: "#play",
  },
  {
    title: "4G 摄像头小车",
    description:
      "当前先跳转到现有实时视频页，后续会整合成站内独立页面，并加入控制台与设备状态。",
    action: "打开视频",
    href: "http://175.178.171.79:8080",
  },
];

export const heroShowcaseItems = [
  {
    title: "4G 坦克",
    caption: "视频中转与远程控制入口",
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
    caption: "后续接入设备状态与控制指令",
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
