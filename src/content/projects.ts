import type { Project } from "./types";

/**
 * Projects — only entries with a real basis. The invented sample projects used
 * to lay out the first version were removed (Asset Strategy §5: "אין לפרסם
 * עובדות... שלא אומתו"). Each project states where it comes from; visuals fall
 * back to labelled GENERATED illustrations until original photos arrive.
 *
 * Most entries come from the albums on the company Facebook page (album title
 * gives project and developer). Album photos are proof only — the originals are
 * requested from the company before any of them is used on the site.
 */
export const projects: Project[] = [
  {
    slug: "salit-c",
    title: { he: "סלעית שלב ג׳", ar: "سلعيت — المرحلة ج", en: "Sal'it — Phase C" },
    location: { he: "סלעית", ar: "سلعيت", en: "Sal'it" },
    region: "judea-samaria",
    client: { he: "אמפא ישראל", ar: "أمفا إسرائيل", en: "Amfa Israel" },
    categories: ["residential-development", "roads", "infrastructure"],
    capabilities: ["residential-development", "roads", "infrastructure", "earthworks"],
    type: { he: "פיתוח שכונת מגורים", ar: "تطوير حي سكني", en: "Residential Neighborhood Development" },
    summary: {
      he: "פיתוח שלב ג׳ של שכונת מגורים בסלעית עבור אמפא ישראל — מתועד בצילומי רחפן לפני ואחרי הביצוע.",
      ar: "تطوير المرحلة ج من حي سكني في سلعيت لصالح أمفا إسرائيل — موثّق بصور جوية قبل التنفيذ وبعده.",
      en: "Phase C of a residential neighborhood in Sal'it for Amfa Israel — documented in drone photos before and after the works.",
    },
    description: {
      he: "החברה ביצעה את עבודות הפיתוח של שלב ג׳ בשכונת מגורים בסלעית, עבור היזם אמפא ישראל. צילומי הרחפן מראים את השטח לפני הביצוע ואת השכונה המוגמרת — כבישים, מגרשים ובתים צמודי קרקע. היקף העבודות ושנות הביצוע יפורטו לאחר אישור החברה.",
      ar: "نفّذت الشركة أعمال تطوير المرحلة ج في حي سكني في سلعيت لصالح المطوّر أمفا إسرائيل. تُظهر الصور الجوية الموقع قبل التنفيذ والحي المكتمل — طرق وقسائم ومنازل. سيتم تفصيل نطاق الأعمال وسنوات التنفيذ بعد تأكيد الشركة.",
      en: "The company carried out the development works for Phase C of a residential neighborhood in Sal'it, for the developer Amfa Israel. Drone photos show the site before the works and the finished neighborhood — roads, plots and detached homes. Scope and dates will be detailed once confirmed by the company.",
    },
    scope: {
      he: ["פיתוח שכונת מגורים", "כבישים ומגרשים", "היקף מלא — לאישור החברה"],
      ar: ["تطوير حي سكني", "طرق وقسائم", "النطاق الكامل — بانتظار تأكيد الشركة"],
      en: ["Residential neighborhood development", "Roads & plots", "Full scope — pending company confirmation"],
    },
    statistics: [],
    hero: {
      status: "missing",
      illustration: "neighborhood",
      alt: { he: "שכונת המגורים בסלעית", ar: "الحي السكني في سلعيت", en: "The residential neighborhood in Sal'it" },
      brief: "Top-down drone of the finished neighborhood (curved streets, playground) — photo received, file to be added; originals of the 9-photo album (before/after) requested",
      source: {
        url: "https://www.facebook.com/100063619101665/",
        proves: "Company album \"פרויקט- סלעית שלב ג' - יזם אמפא ישראל\" (9 photos, Jan 2020): drone photos before and after the works",
        permission: "requested",
        confidence: "high",
      },
    },
    images: [],
    // Approximate — centre of Sal'it. Replace with the actual site location.
    coordinates: [32.243, 35.043],
    featured: true,
    order: 1,
    verification: {
      status: "needs-confirmation",
      basis: "public-source",
      source: "Company Facebook album \"פרויקט- סלעית שלב ג' - יזם אמפא ישראל\" (published 2 Jan 2020)",
      url: "https://www.facebook.com/100063619101665/",
      checkedAt: "2026-09-25",
      notes: "Company to confirm scope, years, client naming and approve photos. Region naming per language to be confirmed.",
    },
  },
  {
    slug: "nofei-nehemia",
    title: { he: "נופי נחמיה — 14 יח״ד", ar: "نوفي نحميا — 14 وحدة سكنية", en: "Nofei Nehemia — 14 Units" },
    location: { he: "נופי נחמיה", ar: "نوفي نحميا", en: "Nofei Nehemia" },
    region: "judea-samaria",
    client: { he: "אמנה", ar: "أمانا", en: "Amana" },
    categories: ["residential-development", "earthworks", "infrastructure"],
    capabilities: ["residential-development", "retaining-walls", "earthworks", "development"],
    type: { he: "פיתוח וקירות תמך", ar: "تطوير وجدران استنادية", en: "Development & Retaining Walls" },
    summary: {
      he: "עבודות פיתוח וקירות תמך למתחם של 14 יחידות דיור עבור אמנה — מתועד מהביצוע ועד המסירה.",
      ar: "أعمال تطوير وجدران استنادية لمجمّع من 14 وحدة سكنية لصالح أمانا — موثّقة من التنفيذ حتى التسليم.",
      en: "Development works and retaining walls for a 14-unit residential compound for Amana — documented from construction to handover.",
    },
    description: {
      he: "החברה ביצעה את עבודות הפיתוח למתחם של 14 יחידות דיור בנופי נחמיה, עבור אמנה. התמונות מתעדות את שלבי הביצוע — עבודות עפר, בניית קירות תמך מבטון ואבן — ואת המתחם המוגמר על משטח מוגבה המוקף קיר תמך מחופה אבן. היקף העבודות ושנות הביצוע יפורטו לאחר אישור החברה.",
      ar: "نفّذت الشركة أعمال التطوير لمجمّع من 14 وحدة سكنية في نوفي نحميا لصالح أمانا. توثّق الصور مراحل التنفيذ — أعمال ترابية وبناء جدران استنادية من الخرسانة والحجر — والمجمّع المكتمل على منصّة مرتفعة يحيط بها جدار استنادي مكسوّ بالحجر. سيتم تفصيل نطاق الأعمال وسنوات التنفيذ بعد تأكيد الشركة.",
      en: "The company carried out the development works for a 14-unit residential compound in Nofei Nehemia, for Amana. The photos document the construction — earthworks and concrete and stone retaining walls — and the finished compound on a raised platform enclosed by a stone-clad retaining wall. Scope and dates will be detailed once confirmed by the company.",
    },
    scope: {
      he: ["עבודות עפר והכנת משטח", "קירות תמך מבטון וחיפוי אבן", "היקף מלא — לאישור החברה"],
      ar: ["أعمال ترابية وتجهيز المنصّة", "جدران استنادية خرسانية مكسوّة بالحجر", "النطاق الكامل — بانتظار تأكيد الشركة"],
      en: ["Earthworks & platform preparation", "Concrete retaining walls with stone cladding", "Full scope — pending company confirmation"],
    },
    statistics: [{ value: "14", label: { he: "יחידות דיור", ar: "وحدة سكنية", en: "Residential units" } }],
    hero: {
      status: "missing",
      illustration: "retaining",
      alt: { he: "המתחם בנופי נחמיה", ar: "المجمّع في نوفي نحميا", en: "The compound in Nofei Nehemia" },
      brief: "Drone of the finished compound — 7 buildings behind the stone-clad retaining wall — photo received, file to be added; originals of the 12-photo album requested",
      source: {
        url: "https://www.facebook.com/100063619101665/",
        proves: "Company album \"פרויקט - נופי נחמיה 14 יח\"ד יזם - אמנה\" (12 photos, Dec 2019 – Jan 2020): works in progress and finished compound",
        permission: "requested",
        confidence: "high",
      },
    },
    images: [],
    featured: true,
    order: 2,
    verification: {
      status: "needs-confirmation",
      basis: "public-source",
      source: "Company Facebook album \"פרויקט - נופי נחמיה 14 יח\"ד יזם - אמנה\" (published Dec 2019 – Jan 2020)",
      url: "https://www.facebook.com/100063619101665/",
      checkedAt: "2026-09-25",
      notes: "Company to confirm scope, years, client naming and approve photos. Add map coordinates once the site location is confirmed.",
    },
  },
  {
    slug: "bruchin-amana",
    title: { he: "ברוכין שלב ג׳", ar: "بروخين — المرحلة ج", en: "Bruchin — Phase C" },
    location: { he: "ברוכין", ar: "بروخين", en: "Bruchin" },
    region: "judea-samaria",
    client: { he: "אמנה", ar: "أمانا", en: "Amana" },
    categories: ["residential-development", "roads", "infrastructure"],
    capabilities: ["residential-development", "roads", "earthworks", "infrastructure"],
    type: { he: "עבודות תשתית ופיתוח", ar: "أعمال بنية تحتية وتطوير", en: "Infrastructure & Development Works" },
    summary: {
      he: "עבודות תשתית ופיתוח בשלב ג׳ בברוכין עבור אמנה, כפי שתועדו בעמוד הפייסבוק של החברה.",
      ar: "أعمال بنية تحتية وتطوير في المرحلة ج في بروخين لصالح أمانا، كما وُثّقت في صفحة الشركة على فيسبوك.",
      en: "Infrastructure and development works for Phase C in Bruchin for Amana, as documented on the company's Facebook page.",
    },
    description: {
      he: "החברה ביצעה עבודות תשתית ופיתוח בשלב ג׳ בברוכין, עבור אמנה. היקף העבודות ושנות הביצוע יפורטו לאחר אישור החברה.",
      ar: "نفّذت الشركة أعمال بنية تحتية وتطوير في المرحلة ج في بروخين لصالح أمانا. سيتم تفصيل نطاق الأعمال وسنوات التنفيذ بعد تأكيد الشركة.",
      en: "The company carried out infrastructure and development works for Phase C in Bruchin, for Amana. Scope and dates will be detailed once confirmed by the company.",
    },
    scope: {
      he: ["כבישים וכיכר תנועה", "מדרכות ופיתוח", "היקף מלא — לאישור החברה"],
      ar: ["طرق ودوّار", "أرصفة وتطوير", "النطاق الكامل — بانتظار تأكيد الشركة"],
      en: ["Roads & roundabout", "Sidewalks & site development", "Full scope — pending company confirmation"],
    },
    statistics: [],
    hero: {
      status: "missing",
      illustration: "road",
      alt: { he: "עבודות בברוכין", ar: "أعمال في بروخين", en: "Works in Bruchin" },
      brief: "New roundabout with olive tree, fresh asphalt and sidewalks — photo received, file to be added; originals of the 7-photo album requested",
      source: {
        url: "https://www.facebook.com/100063619101665/posts/100757044734540/",
        proves: "Company album \"פרויקט - ברוכין שלב ג' - יזם אמנה\" (7 photos) and post \"עבודות בברוכין פרויקט אמנה\"",
        permission: "requested",
        confidence: "high",
      },
    },
    images: [],
    // Approximate — centre of Bruchin. Replace with the actual site location.
    coordinates: [32.153, 35.086],
    featured: true,
    order: 3,
    verification: {
      status: "needs-confirmation",
      basis: "public-source",
      source: "Company Facebook album \"פרויקט - ברוכין שלב ג' - יזם אמנה\" and post \"עבודות בברוכין פרויקט אמנה\"",
      url: "https://www.facebook.com/100063619101665/posts/100757044734540/",
      checkedAt: "2026-09-25",
      notes: "Company to confirm scope, years, client naming and approve photos. Region naming per language to be confirmed.",
    },
  },
];
