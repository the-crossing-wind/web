"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = string;

const translations: Record<string, any> = {
  en: {
    nav: {
      stories: "The Currents",
      resources: "Safe Harbors",
      allies: "Gathering Winds",
      signIn: "Join the Wind",
      signOut: "Depart",
    },
    hero: {
      badge: "Truth in Motion",
      title: "To Pass, To Spread,",
      titleAccent: "To Be Free.",
      subtitle:
        "“The wind does not ask for permission to blow. We share our truths to find our own freedom and carry others toward theirs.”",
      ctaRead: "Listen to the Wind",
      ctaLearn: "Carry the Change",
    },
    stories: {
      badge: "Winds of Experience",
      title: "The Passing",
      titleAccent: "Wind",
      description:
        "Stories that spread like the breeze, carrying the weight of truth and the lightness of freedom. Your voice was meant to travel.",
      shareBtn: "Release Your Story",
      cancelBtn: "Hold Back",
      category: "Submission Category",
      formLabelContent: "Narrative Content",
      alias: "Author Pseudonym (Optional)",
      placeholderAlias: "e.g. Anonymous Contributor",
      placeholderContent:
        "Please provide your detailed account here. Your identity will remain strictly confidential.",
      anonymousNote: "Your identity is protected. Submissions are strictly anonymous.",
      submitBtn: "Submit Testimony",
      submittingBtn: "Processing Submission...",
      witnessed: "Heard by the Gale",
      securityNote: "Encrypted & Untraceable",
      noStories: "The air is still. Be the first to start the breeze.",
      viewAll: "Discover All Currents",
      backToHome: "Back to Home",
      backToArchive: "Back to Archive",
      archiveTitle: "The Full",
      archiveTitleAccent: "Archive",
      archiveSubtitle: "Every ripple, every gust, every voice that has passed through here.",
      readFull: "Read full story",
      viewDetails: "View Story Details",
      comments: {
        title: "Responses",
        placeholder: "Add an anonymous response...",
        submit: "Send",
        anonymous: "Anonymous",
      },
      categories: {
        Experience: "Personal Narrative",
        Encouragement: "Community Support",
        Observation: "General Observation",
      },
    },
    resources: {
      title: "Safe",
      titleAccent: "Harbors",
      description:
        "Navigating the world requires support. These anchors provide the safety you need to continue your journey.",
    },
    allies: {
      title: "Gathering",
      titleAccent: "Support",
      description: "How to be the current that lifts others. Freedom is a collective movement.",
      readyTitle: "Ready to amplify the wind?",
      readyDesc:
        "Join our advocacy network and receive resources for school and workplace education.",
      readyBtn: "Amplify Truth",
      guidelines: [
        {
          title: "Respect Pronouns",
          content:
            "Always use the pronouns a person identifies with. If you're unsure, it's okay to ask respectfully or use gender-neutral pronouns until clarified.",
        },
        {
          title: "Avoid Invasive Questions",
          content:
            "Do not ask about medical history, surgeries, or birth names. These are personal and often traumatic topics. Focus on the human, not the transition.",
        },
        {
          title: "Be a Vocal Advocate",
          content:
            "Correct others when they misgender someone, even if that person isn't in the room. Silence is often perceived as complicity.",
        },
        {
          title: "Center Their Voices",
          content:
            "In discussions about trans issues, step back and let trans individuals lead. Your role is as an amplifier, not a replacement.",
        },
      ],
    },
    footer: {
      quote: '"We are the wind that carries each other toward a brighter horizon."',
      privacy: "Guardian of Privacy",
      contact: "Reach Out",
      emergency: "Urgent Shelter",
      copyright: "For the Free & The Brave · 2026",
    },
    common: {
      anonymousAgent: "Anonymous Agent",
      justNow: "just now",
      submitError: "Failed to share story. Please check your connection.",
      toggleTheme: "Toggle Theme",
      categories: {
        Legal: "Legal",
        Healthcare: "Healthcare",
        Community: "Community",
        Safety: "Safety",
      },
    },
  },
  zh: {
    nav: {
      stories: "风潮",
      resources: "避风港",
      allies: "聚风之志",
      signIn: "随风而行",
      signOut: "离港",
    },
    hero: {
      badge: "流动的真实",
      title: "越过阻碍，播撒真实，",
      titleAccent: "终获自由。",
      subtitle: "“风不需要许可。我们分享真实，是为了找回自己的自由，并带着他人一起飞翔。”",
      ctaRead: "聆听风声",
      ctaLearn: "传递变革",
    },
    stories: {
      badge: "经历之风",
      title: "渡",
      titleAccent: "风",
      description: "如微风般蔓延的故事，承载着真实的重量，也孕育着自由的轻盈。你的声音本该远行。",
      shareBtn: "释放你的故事",
      cancelBtn: "暂缓",
      category: "提交类别",
      formLabelContent: "叙述内容",
      alias: "作者署名（可选）",
      placeholderAlias: "例如：匿名贡献者",
      placeholderContent: "请在此处详细描述您的经历。您的身份将受到严格保密。",
      anonymousNote: "身份保护已启用。所有提交均为匿名。",
      submitBtn: "提交证言",
      submittingBtn: "正在处理...",
      witnessed: "已被见证",
      securityNote: "加密且不可追踪",
      noStories: "空气尚凝结。成为第一个掀起涟漪的人吧。",
      viewAll: "探索所有风潮",
      backToHome: "返回主页",
      backToArchive: "返回存档",
      archiveTitle: "完整",
      archiveTitleAccent: "存档",
      archiveSubtitle: "每一道涟漪，每一阵风，每一个曾在此留下声音的人。",
      readFull: "阅读全文",
      viewDetails: "查看详情",
      comments: {
        title: "回应",
        placeholder: "添加匿名回应...",
        submit: "发送",
        anonymous: "匿名",
      },
      categories: {
        Experience: "个人记叙",
        Encouragement: "社区支持",
        Observation: "一般观察",
      },
    },
    resources: {
      title: "避风",
      titleAccent: "之港",
      description: "远航需要支点。这些组织提供你继续前行所需的保护与力量。",
    },
    allies: {
      title: "聚风",
      titleAccent: "成潮",
      description: "如何成为托举他人的气流。自由是一场集体的远征。",
      readyTitle: "准备好放大风声了吗？",
      readyDesc: "加入我们的倡议网络，获取职场与学校教育的资源包。",
      readyBtn: "放大真实",
      guidelines: [
        {
          title: "尊重代词",
          content: "始终使用对方认同的代词。如果不确定，可以礼貌地询问，或在明确之前使用中性代词。",
        },
        {
          title: "避免侵入性问题",
          content:
            "不要询问医疗史、手术情况或曾用名。这些是私人且往往带有创伤性的话题。关注人本身，而非过渡过程。",
        },
        {
          title: "成为发声的支持者",
          content: "当有人被误用性别时，请予以纠正，即使当事人不在场。沉默往往被视为默许。",
        },
        {
          title: "以他们的声音为中心",
          content: "在讨论跨性别议题时，退后一步，让跨性别者主导。你的角色是放大器，而非替代者。",
        },
      ],
    },
    footer: {
      quote: "“我们是风，托举彼此飞向明亮的彼岸。”",
      privacy: "隐私卫士",
      contact: "联系我们",
      emergency: "紧急求助",
      copyright: "致自由与勇敢的你 · 2026",
    },
    common: {
      anonymousAgent: "匿名用户",
      justNow: "刚刚",
      submitError: "提交失败，请检查您的网络连接。",
      toggleTheme: "切换主题",
      categories: {
        Legal: "法律",
        Healthcare: "医疗",
        Community: "社区",
        Safety: "安全",
      },
    },
  },
};

type TranslationType = typeof translations.en;

interface LanguageContextType {
  language: Language;
  t: TranslationType;
  setLanguage: (lang: Language) => void;
  availableLanguages: { code: Language; label: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "zh", label: "中文" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("app-lang");
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("app-lang", lang);
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{ language, t, setLanguage: handleSetLanguage, availableLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
