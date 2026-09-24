import type {
  Client,
  CompanyStat,
  ContactDetails,
  Credential,
  EquipmentItem,
  MediaImage,
  Person,
  TimelineEntry,
} from "./types";
import type { Localized } from "@/i18n/config";

/**
 * Company-level facts. PRD §6.5 / §6.9: "Numbers must be verified before publication."
 * Values taken from the PRD examples are marked `unverified` until checked against the
 * Israeli Registrar of Contractors (Pinkas HaKablanim) and confirmed by the company.
 */

const REGISTRY_CHECK = {
  status: "unverified",
  source: "PRD §6.5 / §6.9 example",
  notes: "Verify against the Registrar of Contractors (https://www.gov.il — פנקס הקבלנים) and attach the record.",
} as const;

export const company = {
  legalName: {
    he: "וליד חסן תשתיות, פיתוח ועבודות עפר",
    ar: "وليد حسن للبنية التحتية والتطوير والأعمال الترابية",
    en: "Walid Hasan Infrastructure, Development & Earthworks",
  } satisfies Localized,
  shortName: { he: "וליד חסן", ar: "وليد حسن", en: "Walid Hasan" } satisfies Localized,
  foundingYear: 2006,
  licenseNumber: "28803",
};

export const stats: CompanyStat[] = [
  {
    id: "established",
    value: 2006,
    raw: true,
    label: { he: "שנת הקמה", ar: "سنة التأسيس", en: "Company established" },
    verification: REGISTRY_CHECK,
  },
  {
    id: "license",
    value: 28803,
    raw: true,
    label: { he: "מספר קבלן רשום", ar: "رقم المقاول المسجّل", en: "Contractor license" },
    verification: REGISTRY_CHECK,
  },
  {
    id: "classification",
    value: "G5",
    label: { he: "סיווג תשתיות ופיתוח", ar: "تصنيف بنية تحتية وتطوير", en: "Infrastructure & Development" },
    verification: REGISTRY_CHECK,
  },
  {
    id: "projects",
    value: 50,
    suffix: "+",
    label: { he: "פרויקטים", ar: "مشروع", en: "Projects" },
    verification: {
      status: "unverified",
      source: "Placeholder (PRD shows \"XX+\")",
      notes: "Replace with the real, company-confirmed project count.",
    },
  },
];

export const credentials: Credential[] = [
  {
    id: "license",
    label: { he: "רישיון קבלן", ar: "رخصة مقاول", en: "Contractor License" },
    value: "28803",
    detail: { he: "רשם הקבלנים", ar: "مسجّل المقاولين", en: "Registrar of Contractors" },
    verification: REGISTRY_CHECK,
  },
  {
    id: "class-infrastructure",
    label: { he: "תשתיות ופיתוח", ar: "بنية تحتية وتطوير", en: "Infrastructure & Development" },
    value: "G5",
    detail: { he: "סיווג ג׳5", ar: "تصنيف G5", en: "Classification G5" },
    verification: REGISTRY_CHECK,
  },
  {
    id: "class-water",
    label: { he: "מים / ביוב / ניקוז", ar: "مياه / صرف صحي / تصريف", en: "Water / Sewer / Drainage" },
    value: "B4",
    detail: { he: "סיווג ב׳4", ar: "تصنيف B4", en: "Classification B4" },
    verification: REGISTRY_CHECK,
  },
];

export const storyImage: MediaImage = {
  alt: { he: "הנהלת החברה באתר העבודה", ar: "إدارة الشركة في موقع العمل", en: "Company management on site" },
  brief: "Management / team portrait on an active site, machinery behind",
  rightsConfirmed: false,
};

export const story = {
  summary: {
    he: "החברה נוסדה על ידי וליד חסן והתפתחה מעבודות עפר לחברת תשתיות ופיתוח המבצעת פרויקטים מלאים עבור יזמים, קבלנים ורשויות. אנחנו מאמינים בביצוע עצמי, בנוכחות של ההנהלה בשטח ובאחריות מלאה מהחפירה הראשונה ועד המסירה.",
    ar: "أسّس وليد حسن الشركة وتطورت من الأعمال الترابية إلى شركة بنية تحتية وتطوير تنفّذ مشاريع كاملة لصالح المطوّرين والمقاولين والسلطات. نؤمن بالتنفيذ الذاتي، وبحضور الإدارة في الميدان، وبالمسؤولية الكاملة من أول حفرية حتى التسليم.",
    en: "Founded by Walid Hasan, the company grew from earthworks into an infrastructure and development contractor delivering complete projects for developers, contractors and public authorities. We believe in self-performed work, management present on site, and full responsibility from the first cut to handover.",
  } satisfies Localized,
  verification: { status: "unverified", notes: "Draft narrative — company to confirm history and wording." } as const,
};

export const approach: { title: Localized; body: Localized }[] = [
  {
    title: { he: "ביצוע עצמי", ar: "تنفيذ ذاتي", en: "Self-performed" },
    body: {
      he: "צוותים וציוד של החברה — פחות תלות, יותר שליטה בלוחות הזמנים ובאיכות.",
      ar: "طواقم ومعدات الشركة — اعتماد أقل وسيطرة أكبر على الجداول الزمنية والجودة.",
      en: "Our own crews and machinery — fewer dependencies, more control over schedule and quality.",
    },
  },
  {
    title: { he: "הנהלה בשטח", ar: "الإدارة في الميدان", en: "Management on site" },
    body: {
      he: "ההחלטות מתקבלות באתר, מול התוכניות ומול המזמין.",
      ar: "تُتّخذ القرارات في الموقع، أمام المخططات وأمام صاحب المشروع.",
      en: "Decisions are made on site, in front of the drawings and the client.",
    },
  },
  {
    title: { he: "מסירה מלאה", ar: "تسليم كامل", en: "Complete handover" },
    body: {
      he: "בדיקות, תיעוד ומסירה לרשויות ולתאגידים — עד הסגירה האחרונה.",
      ar: "فحوصات وتوثيق وتسليم للسلطات والشركات — حتى الإغلاق الأخير.",
      en: "Testing, documentation and handover to authorities and utilities — through to final close-out.",
    },
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: "2006",
    title: { he: "הקמת החברה", ar: "تأسيس الشركة", en: "Company founded" },
    body: {
      he: "וליד חסן מקים את החברה עם התמחות בעבודות עפר.",
      ar: "وليد حسن يؤسّس الشركة متخصّصًا في الأعمال الترابية.",
      en: "Walid Hasan establishes the company, specializing in earthworks.",
    },
    verification: REGISTRY_CHECK,
  },
  {
    year: "—",
    title: { he: "התרחבות לתשתיות", ar: "التوسّع إلى البنية التحتية", en: "Expansion into infrastructure" },
    body: {
      he: "הוספת תחומי מים, ביוב וניקוז. (שנה ופרטים לאישור החברה)",
      ar: "إضافة مجالات المياه والصرف الصحي والتصريف. (السنة والتفاصيل بانتظار تأكيد الشركة)",
      en: "Water, sewer and drainage added. (Year and details pending company confirmation)",
    },
    verification: { status: "unverified", notes: "Company to provide milestone year." },
  },
  {
    year: "—",
    title: { he: "פרויקטי פיתוח מלאים", ar: "مشاريع تطوير متكاملة", en: "Full development projects" },
    body: {
      he: "ביצוע פיתוח מלא לשכונות מגורים. (לאישור החברה)",
      ar: "تنفيذ تطوير كامل لأحياء سكنية. (بانتظار تأكيد الشركة)",
      en: "Delivering complete development for residential neighborhoods. (Pending company confirmation)",
    },
    verification: { status: "unverified", notes: "Company to provide milestone year." },
  },
];

export const leadership: Person[] = [
  {
    id: "walid-hasan",
    name: { he: "וליד חסן", ar: "وليد حسن", en: "Walid Hasan" },
    role: { he: "מייסד ומנכ״ל", ar: "المؤسس والمدير العام", en: "Founder & CEO" },
    image: {
      alt: { he: "וליד חסן", ar: "وليد حسن", en: "Walid Hasan" },
      brief: "Environmental portrait on site",
      rightsConfirmed: false,
    },
    verification: { status: "unverified", notes: "Confirm title and approve photo." },
  },
];

export const values: { title: Localized; body: Localized }[] = [
  {
    title: { he: "דיוק", ar: "الدقة", en: "Precision" },
    body: {
      he: "מדידה, בקרה ובדיקות בכל שלב — לא רק בסוף.",
      ar: "قياس ومراقبة وفحوصات في كل مرحلة — لا في النهاية فقط.",
      en: "Survey, control and testing at every stage — not only at the end.",
    },
  },
  {
    title: { he: "בטיחות", ar: "السلامة", en: "Safety" },
    body: {
      he: "אתר מסודר ונהלים ברורים לכל עובד ולכל מכונה.",
      ar: "موقع منظّم وإجراءات واضحة لكل عامل ولكل آلة.",
      en: "An orderly site and clear procedures for every worker and every machine.",
    },
  },
  {
    title: { he: "עמידה בהתחייבויות", ar: "الالتزام", en: "Commitment" },
    body: {
      he: "לוחות זמנים שמתוכננים כדי לעמוד בהם.",
      ar: "جداول زمنية مخطّطة ليتم الالتزام بها.",
      en: "Schedules planned to be kept.",
    },
  },
];
export const valuesVerification = {
  status: "unverified",
  notes: "PRD §9: only values demonstrable through actual practice. Company to confirm each with evidence.",
} as const;

export const equipment: EquipmentItem[] = (
  [
    ["excavators", "tracked-excavators", { he: "מחפרים זחליים", ar: "حفّارات مجنزرة", en: "Tracked excavators" }],
    ["excavators", "wheeled-excavators", { he: "מחפרים על גלגלים", ar: "حفّارات بعجلات", en: "Wheeled excavators" }],
    ["loaders", "wheel-loaders", { he: "שופלים", ar: "جرّافات تحميل", en: "Wheel loaders" }],
    ["trucks", "dump-trucks", { he: "משאיות רכינה", ar: "شاحنات قلّابة", en: "Dump trucks" }],
    ["compactors", "rollers", { he: "מכבשים", ar: "مداحل", en: "Rollers" }],
    ["graders", "graders", { he: "מפלסות", ar: "ممهّدات", en: "Motor graders" }],
  ] as const
).map(([category, id, name]) => ({
  id,
  category,
  name,
  image: {
    alt: name,
    brief: `Company-owned ${name.en.toLowerCase()} with logo visible, clean background`,
    rightsConfirmed: false,
  },
  verification: {
    status: "unverified",
    notes: "PRD §6.7: only equipment confirmed by the company. Confirm model and unit count.",
  },
}));

/** PRD §6.10 — empty until organizations are confirmed and logo use approved. */
export const clients: Client[] = [];

export const contact: ContactDetails = {
  phone: "+972000000000",
  phoneDisplay: "000-000-0000",
  whatsapp: "972000000000",
  email: "office@walidhasan.co.il",
  address: {
    he: "כתובת המשרד תעודכן",
    ar: "عنوان المكتب سيُحدَّث",
    en: "Office address to be confirmed",
  },
  hours: {
    he: "א׳–ה׳ 07:00–17:00",
    ar: "الأحد–الخميس 07:00–17:00",
    en: "Sun–Thu 07:00–17:00",
  },
  social: {},
  verification: {
    status: "unverified",
    notes: "PLACEHOLDER phone / WhatsApp / email / address — replace with company-provided details.",
  },
};
