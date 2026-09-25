import type { Project } from "./types";

/**
 * Projects — only entries with a real basis. The invented sample projects used
 * to lay out the first version were removed (Asset Strategy §5: "אין לפרסם
 * עובדות... שלא אומתו"). Each project states where it comes from; visuals fall
 * back to labelled GENERATED illustrations until original photos arrive.
 */
export const projects: Project[] = [
  {
    slug: "bruchin-amana",
    title: { he: "ברוכין — פרויקט אמנה", ar: "بروخين — مشروع أمانا", en: "Bruchin — Amana Project" },
    location: { he: "ברוכין", ar: "بروخين", en: "Bruchin" },
    region: "judea-samaria",
    client: { he: "אמנה (לאישור)", ar: "أمانا (بانتظار التأكيد)", en: "Amana (to be confirmed)" },
    categories: ["residential-development", "infrastructure"],
    capabilities: ["residential-development", "earthworks", "infrastructure"],
    type: { he: "עבודות תשתית ופיתוח", ar: "أعمال بنية تحتية وتطوير", en: "Infrastructure & Development Works" },
    summary: {
      he: "עבודות בברוכין במסגרת פרויקט של אמנה, כפי שתועדו בעמוד הפייסבוק של החברה.",
      ar: "أعمال في بروخين ضمن مشروع لأمانا، كما وُثّقت في صفحة الشركة على فيسبوك.",
      en: "Works in Bruchin as part of an Amana project, as documented on the company's Facebook page.",
    },
    description: {
      he: "החברה ביצעה עבודות בברוכין במסגרת פרויקט של אמנה. היקף העבודות, שנות הביצוע ותפקיד המזמין יפורטו לאחר אישור החברה.",
      ar: "نفّذت الشركة أعمالًا في بروخين ضمن مشروع لأمانا. سيتم تفصيل نطاق الأعمال وسنوات التنفيذ ودور الجهة المالكة بعد تأكيد الشركة.",
      en: "The company carried out works in Bruchin as part of an Amana project. Scope, dates and the client's role will be detailed once confirmed by the company.",
    },
    scope: {
      he: ["היקף העבודות — לאישור החברה"],
      ar: ["نطاق الأعمال — بانتظار تأكيد الشركة"],
      en: ["Scope of works — pending company confirmation"],
    },
    statistics: [],
    hero: {
      status: "missing",
      illustration: "network",
      alt: { he: "עבודות בברוכין", ar: "أعمال في بروخين", en: "Works in Bruchin" },
      brief: "Request originals of the Bruchin photos posted on the company Facebook page; drone of the neighborhood",
      source: {
        url: "https://www.facebook.com/100063619101665/posts/100757044734540/",
        proves: "Company posted photos of its works in Bruchin (Amana project)",
        permission: "requested",
        confidence: "medium",
      },
    },
    images: [],
    // Approximate — centre of Bruchin. Replace with the actual site location.
    coordinates: [32.153, 35.086],
    featured: true,
    order: 1,
    verification: {
      status: "needs-confirmation",
      basis: "public-source",
      source: "Company Facebook page post \"עבודות בברוכין פרויקט אמנה\"",
      url: "https://www.facebook.com/100063619101665/posts/100757044734540/",
      checkedAt: "2026-09-24",
      notes: "Company to confirm scope, years, client role, statistics and approve photos. Region naming per language to be confirmed.",
    },
  },
  {
    slug: "enav",
    title: { he: "עינב", ar: "عيناف", en: "Enav" },
    location: { he: "מיקום ייקבע בהמשך", ar: "الموقع سيُحدَّد لاحقًا", en: "Location to be confirmed" },
    categories: ["residential-development", "infrastructure"],
    capabilities: ["infrastructure", "residential-development", "earthworks"],
    type: { he: "תשתיות ופיתוח", ar: "بنية تحتية وتطوير", en: "Infrastructure & Development" },
    summary: {
      he: "תשתיות ופיתוח לשכונת מגורים בת 28 יחידות דיור.",
      ar: "بنية تحتية وتطوير لحي سكني يضم 28 وحدة سكنية.",
      en: "Infrastructure and site development for a 28-unit residential neighborhood.",
    },
    description: {
      he: "ביצוע עבודות התשתית והפיתוח לשכונת מגורים חדשה בת 28 יחידות דיור — מהכנת הקרקע ועד מסירת השטח המפותח.",
      ar: "تنفيذ أعمال البنية التحتية والتطوير لحي سكني جديد يضم 28 وحدة سكنية — من تجهيز الأرض حتى تسليم الموقع المطوَّر.",
      en: "Infrastructure and development works for a new 28-unit residential neighborhood — from ground preparation to handover of the developed site.",
    },
    scope: {
      he: ["עבודות עפר והכנת מגרשים", "תשתיות מים, ביוב וניקוז", "כבישים ומדרכות"],
      ar: ["أعمال ترابية وتجهيز القسائم", "شبكات مياه وصرف صحي وتصريف", "طرق وأرصفة"],
      en: ["Earthworks & plot preparation", "Water, sewer & drainage networks", "Roads & sidewalks"],
    },
    statistics: [{ value: "28", label: { he: "יחידות דיור", ar: "وحدة سكنية", en: "Residential units" } }],
    hero: {
      status: "missing",
      illustration: "neighborhood",
      alt: { he: "פרויקט עינב", ar: "مشروع عيناف", en: "The Enav project" },
      brief: "Drone: finished neighborhood roads and plots, late afternoon light",
    },
    images: [],
    featured: true,
    order: 2,
    verification: {
      status: "needs-confirmation",
      basis: "prd",
      source: "PRD §6.4 example (\"01 ENAV — Infrastructure & Development — 28 Residential Units\")",
      notes:
        "Confirm name spelling (possibly the community of Einav — not assumed), location, client, year and scope.",
    },
  },
];
