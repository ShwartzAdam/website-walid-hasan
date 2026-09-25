import type {
  Client,
  CompanyStat,
  ContactDetails,
  Credential,
  EquipmentItem,
  MediaImage,
  MediaVideo,
  Person,
  Testimonial,
  TimelineEntry,
  Verification,
} from "./types";
import type { Localized } from "@/i18n/config";

/**
 * Company-level facts and assets. Everything found in research is marked
 * NEEDS_CONFIRMATION until the company approves it (Asset Strategy §8).
 * Sources are also listed in src/content/asset-inventory.ts.
 */

const MOF_REGISTRY_URL = "https://asset.mof.gov.il/contractorRepository/s/";

const RESEARCH: Verification = {
  status: "needs-confirmation",
  basis: "public-source",
  source: "Research (Asset Strategy §8) — contractor registry data",
  checkedAt: "2026-09-24",
  notes: "Verify against the Registrar of Contractors and the company's own certificate before publication.",
};

const MOF: Verification = {
  status: "needs-confirmation",
  basis: "public-source",
  source: "Ministry of Finance — recognised contractors registry",
  url: MOF_REGISTRY_URL,
  checkedAt: "2026-09-24",
  notes: "Registry lists company 513785527, certificate valid 13.11.2024–13.11.2026, sub-branches 200 and 260. Confirm with the company's certificate.",
};

export const company = {
  /** Registered name (Ministry of Finance registry). English/Arabic are translations — confirm preferred forms. */
  legalName: {
    he: "וליד חסן תשתיות עפר ופיתוח בע״מ",
    ar: "وليد حسن للبنية التحتية والأعمال الترابية والتطوير م.ض.",
    en: "Walid Hasan Earthworks Infrastructure & Development Ltd.",
  } satisfies Localized,
  /** Brand line used across the site (PRD). */
  brandName: {
    he: "וליד חסן — תשתיות, פיתוח ועבודות עפר",
    ar: "وليد حسن — بنية تحتية، تطوير وأعمال ترابية",
    en: "Walid Hasan — Infrastructure, Development & Earthworks",
  } satisfies Localized,
  shortName: { he: "וליד חסן", ar: "وليد حسن", en: "Walid Hasan" } satisfies Localized,
  companyNumber: "513785527",
  foundingYear: 2006,
  licenseNumber: "28803",
};

// ─── Hero & section media ────────────────────────────────────────────────────
/** Homepage hero. Priority: drone video → drone photo → GENERATED topography. */
export const heroMedia: { image: MediaImage; video?: MediaVideo } = {
  image: {
    status: "missing",
    illustration: "topography",
    alt: { he: "תשתיות ועבודות עפר", ar: "بنية تحتية وأعمال ترابية", en: "Infrastructure and earthworks" },
    brief: "Drone video/photo of an active earthworks site at scale — machinery, terraces, haul roads. Also a vertical mobile crop and a video poster.",
  },
};

export const storyImage: MediaImage = {
  status: "missing",
  illustration: "residential",
  alt: { he: "הנהלת החברה באתר העבודה", ar: "إدارة الشركة في موقع العمل", en: "Company management on site" },
  brief: "Walid Hasan and management on an active site, machinery behind",
};

// ─── Numbers ─────────────────────────────────────────────────────────────────
export const stats: CompanyStat[] = [
  {
    id: "established",
    value: 2006,
    raw: true,
    label: { he: "שנת הקמה", ar: "سنة التأسيس", en: "Company established" },
    verification: { status: "needs-confirmation", basis: "prd", source: "PRD §6.5 example", notes: "Confirm founding year." },
  },
  {
    id: "classification",
    value: "G5",
    label: { he: "כבישים, תשתיות ופיתוח", ar: "طرق، بنية تحتية وتطوير", en: "Roads, Infrastructure & Development" },
    verification: RESEARCH,
  },
  {
    id: "classifications",
    value: 4,
    label: { he: "סיווגים בפנקס הקבלנים", ar: "تصنيفات في سجل المقاولين", en: "Registered classifications" },
    verification: { ...RESEARCH, notes: "G1, G5, B4, B1 per research — confirm the full list." },
  },
];

// ─── Credentials ─────────────────────────────────────────────────────────────
export const credentials: Credential[] = [
  {
    id: "company-number",
    label: { he: "מספר חברה", ar: "رقم الشركة", en: "Company No." },
    value: "513785527",
    detail: { he: "רשם החברות", ar: "مسجّل الشركات", en: "Registrar of Companies" },
    verification: MOF,
  },
  {
    id: "license",
    label: { he: "מספר קבלן", ar: "رقم المقاول", en: "Contractor No." },
    value: "28803",
    detail: { he: "רשם הקבלנים", ar: "مسجّل المقاولين", en: "Registrar of Contractors" },
    verification: RESEARCH,
  },
  {
    id: "class-roads",
    label: { he: "כבישים, תשתיות ופיתוח", ar: "طرق، بنية تحتية وتطوير", en: "Roads, Infrastructure & Development" },
    value: "G5",
    detail: { he: "ענף 200 · סיווג ג׳5", ar: "فرع 200 · تصنيف G5", en: "Branch 200 · Classification G5" },
    verification: { ...RESEARCH, notes: "One public summary described this as group G, classification 4 — confirm G5 against the certificate." },
  },
  {
    id: "class-water",
    label: { he: "מים, ביוב וניקוז", ar: "مياه، صرف صحي وتصريف", en: "Water, Sewer & Drainage" },
    value: "B4",
    detail: { he: "ענף 260 · סיווג ב׳4", ar: "فرع 260 · تصنيف B4", en: "Branch 260 · Classification B4" },
    verification: RESEARCH,
  },
  {
    id: "class-construction",
    label: { he: "בנייה", ar: "بناء", en: "Construction" },
    value: "G1",
    detail: { he: "סיווג ג׳1", ar: "تصنيف G1", en: "Classification G1" },
    verification: RESEARCH,
  },
  {
    id: "class-pumping",
    label: { he: "מערכות אלקטרומכניות לתחנות שאיבה", ar: "أنظمة كهروميكانيكية لمحطات الضخ", en: "Pumping-Station Electromechanical Systems" },
    value: "B1",
    detail: { he: "סיווג ב׳1", ar: "تصنيف B1", en: "Classification B1" },
    verification: RESEARCH,
  },
  {
    id: "recognised-contractor",
    label: { he: "קבלן מוכר — משרד האוצר", ar: "مقاول معترف به — وزارة المالية", en: "Recognised Contractor — Ministry of Finance" },
    value: "11/2026",
    detail: { he: "תוקף התעודה", ar: "صلاحية الشهادة", en: "Certificate valid until" },
    verification: MOF,
  },
];

// ─── Story ───────────────────────────────────────────────────────────────────
export const story = {
  summary: {
    he: "החברה נוסדה על ידי וליד חסן והתפתחה מעבודות עפר לחברת תשתיות ופיתוח המבצעת פרויקטים מלאים עבור יזמים, קבלנים ורשויות. אנחנו מאמינים בביצוע עצמי, בנוכחות של ההנהלה בשטח ובאחריות מלאה מהחפירה הראשונה ועד המסירה.",
    ar: "أسّس وليد حسن الشركة وتطورت من الأعمال الترابية إلى شركة بنية تحتية وتطوير تنفّذ مشاريع كاملة لصالح المطوّرين والمقاولين والسلطات. نؤمن بالتنفيذ الذاتي، وبحضور الإدارة في الميدان، وبالمسؤولية الكاملة من أول حفرية حتى التسليم.",
    en: "Founded by Walid Hasan, the company grew from earthworks into an infrastructure and development contractor delivering complete projects for developers, contractors and public authorities. We believe in self-performed work, management present on site, and full responsibility from the first cut to handover.",
  } satisfies Localized,
  verification: { status: "needs-confirmation", notes: "Draft narrative — company to confirm history and wording." } as Verification,
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
    verification: { status: "needs-confirmation", basis: "prd", notes: "Confirm founding year and story." },
  },
  {
    year: "2024",
    title: { he: "קבלן מוכר", ar: "مقاول معترف به", en: "Recognised contractor" },
    body: {
      he: "תעודת קבלן מוכר ממשרד האוצר (11/2024–11/2026) בענפי כבישים, תשתיות ופיתוח ומים, ביוב וניקוז.",
      ar: "شهادة مقاول معترف به من وزارة المالية (11/2024–11/2026) في فروع الطرق والبنية التحتية والتطوير والمياه والصرف والتصريف.",
      en: "Ministry of Finance recognised-contractor certificate (11/2024–11/2026) for roads, infrastructure & development and water, sewer & drainage.",
    },
    verification: MOF,
  },
];

export const leadership: Person[] = [
  {
    id: "walid-hasan",
    name: { he: "וליד חסן", ar: "وليد حسن", en: "Walid Hasan" },
    role: { he: "מייסד ומנכ״ל", ar: "المؤسس والمدير العام", en: "Founder & CEO" },
    // People are never generated — placeholder until a real portrait is supplied.
    image: {
      status: "missing",
      alt: { he: "וליד חסן", ar: "وليد حسن", en: "Walid Hasan" },
      brief: "Environmental portrait on site",
    },
    verification: { status: "needs-confirmation", notes: "Confirm title and approve photo." },
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
export const valuesVerification: Verification = {
  status: "needs-confirmation",
  notes: "PRD §9: only values demonstrable through actual practice. Company to confirm each with evidence.",
};

// ─── Equipment ───────────────────────────────────────────────────────────────
/**
 * Asset Strategy §6: never present equipment as company-owned without verification.
 * The first two are backed by public posts from the equipment suppliers; the
 * category entries are assumptions to be confirmed (or removed) by the company.
 */
export const equipment: EquipmentItem[] = [
  {
    id: "volvo-ec300e",
    category: "excavators",
    name: { he: "מחפר זחלי Volvo EC300E", ar: "حفّارة مجنزرة Volvo EC300E", en: "Volvo EC300E crawler excavator" },
    manufacturer: "Volvo",
    model: "EC300E",
    description: {
      he: "מחפר זחלי בדרגת 30 טון.",
      ar: "حفّارة مجنزرة من فئة 30 طنًا.",
      en: "30-tonne class crawler excavator.",
    },
    image: {
      status: "missing",
      illustration: "equipment-excavator",
      alt: { he: "מחפר Volvo EC300E", ar: "حفّارة Volvo EC300E", en: "Volvo EC300E excavator" },
      brief: "The company's EC300E on site, logo visible",
      source: {
        url: "https://www.facebook.com/gilboa.volvo/posts/1391925860922845/",
        proves: "Dealer congratulated the company on delivery of a new Volvo EC300E",
        permission: "unknown",
        confidence: "medium",
      },
    },
    verification: {
      status: "needs-confirmation",
      basis: "public-source",
      source: "Volvo dealer (Gilboa) Facebook post congratulating the company on the new EC300E",
      url: "https://www.facebook.com/gilboa.volvo/posts/1391925860922845/",
      checkedAt: "2026-09-24",
      notes: "Confirm the machine is still in the fleet and the quantity.",
    },
  },
  {
    id: "metso-lt1213s",
    category: "specialized",
    name: { he: "מגרסה ניידת Metso LT1213S", ar: "كسّارة متنقلة Metso LT1213S", en: "Metso LT1213S mobile crushing plant" },
    manufacturer: "Metso",
    model: "LT1213S",
    description: {
      he: "מגרסה ניידת על זחלים עם מסננת, לגריסה ומיון של חומרי מילוי באתר.",
      ar: "كسّارة متنقلة على جنازير مع غربال، لتكسير وفرز مواد الردم في الموقع.",
      en: "Track-mounted mobile impact crusher with screen, for on-site crushing and grading of fill material.",
    },
    image: {
      status: "missing",
      illustration: "equipment-crusher",
      alt: { he: "מגרסה Metso LT1213S", ar: "كسّارة Metso LT1213S", en: "Metso LT1213S crusher" },
      brief: "The company's LT1213S crushing on site",
      source: {
        url: "https://www.facebook.com/mbar.ltd/posts/636146386581775/",
        proves: "Supplier (M. Bar) congratulated the company on receiving a Metso LT1213S crusher",
        permission: "unknown",
        confidence: "medium",
      },
    },
    verification: {
      status: "needs-confirmation",
      basis: "public-source",
      source: "Supplier (M. Bar) Facebook post congratulating the company on the LT1213S",
      url: "https://www.facebook.com/mbar.ltd/posts/636146386581775/",
      checkedAt: "2026-09-24",
      notes: "Confirm the machine is still in the fleet.",
    },
  },
  ...(
    [
      ["loaders", "wheel-loaders", "equipment-loader", { he: "שופלים", ar: "جرّافات تحميل", en: "Wheel loaders" }],
      ["dump-trucks", "dump-trucks", "equipment-dump-truck", { he: "משאיות רכינה", ar: "شاحنات قلّابة", en: "Dump trucks" }],
      ["bulldozers", "bulldozers", "equipment-bulldozer", { he: "דחפורים", ar: "جرّافات (بلدوزر)", en: "Bulldozers" }],
      ["rollers", "rollers", "equipment-roller", { he: "מכבשים", ar: "مداحل", en: "Rollers" }],
      ["graders", "graders", "equipment-grader", { he: "מפלסות", ar: "ممهّدات", en: "Motor graders" }],
    ] as const
  ).map(
    ([category, id, illustration, name]): EquipmentItem => ({
      id,
      category,
      name,
      image: { status: "missing", illustration, alt: name, brief: `Company-owned ${name.en.toLowerCase()} with logo visible` },
      verification: {
        status: "needs-confirmation",
        notes: "Assumed category — company to confirm ownership, make/model and quantity, or remove.",
      },
    }),
  ),
];

// ─── Clients & testimonials ──────────────────────────────────────────────────
/** Asset Strategy §9 — empty until a reliable basis and permission exist. Amana (Bruchin) is a candidate. */
export const clients: Client[] = [];

/** Asset Strategy §10 — only real, permitted quotes. */
export const testimonials: Testimonial[] = [];

// ─── Contact ─────────────────────────────────────────────────────────────────
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
  social: {
    // The company's own page (titled with the registered company name).
    facebook: "https://www.facebook.com/100063619101665/",
  },
  verification: {
    status: "needs-confirmation",
    notes:
      "PLACEHOLDER phone / WhatsApp / email / address / hours. Research found a Waze listing and a Dun's Guide entry — take the details from the company, then add googleMapsUrl / wazeUrl / coordinates.",
  },
};
