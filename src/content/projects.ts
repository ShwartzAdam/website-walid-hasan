import type { Project } from "./types";

/**
 * Project content.
 *
 * IMPORTANT — every entry below is DRAFT content used to build and review the
 * experience. `enav` comes from the PRD example (§6.4); the other entries are
 * SAMPLE placeholders and must be replaced with researched, company-approved
 * projects (PRD §15, §24). With CONTENT_MODE=strict none of them is published.
 */

const SAMPLE = {
  status: "unverified",
  source: "Sample content",
  notes: "SAMPLE — replace with a real, verified project before launch.",
} as const;

export const projects: Project[] = [
  {
    slug: "enav",
    title: { he: "עינב", ar: "عيناف", en: "Enav" },
    location: { he: "מיקום ייקבע בהמשך", ar: "الموقع سيُحدَّد لاحقًا", en: "Location to be confirmed" },
    region: "north",
    categories: ["residential-development", "infrastructure"],
    capabilities: ["infrastructure", "development", "earthworks"],
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
      alt: { he: "מבט אווירי על פרויקט עינב", ar: "منظر جوي لمشروع عيناف", en: "Aerial view of the Enav project" },
      brief: "Drone: finished neighborhood roads and plots, late afternoon light",
      rightsConfirmed: false,
    },
    images: [
      {
        alt: { he: "עבודות תשתית בעינב", ar: "أعمال بنية تحتية في عيناف", en: "Infrastructure works at Enav" },
        brief: "Trench and pipe laying mid-project",
        rightsConfirmed: false,
      },
      {
        alt: { he: "כביש שכונתי בעינב", ar: "شارع الحي في عيناف", en: "Neighborhood road at Enav" },
        brief: "Completed street with curbs and sidewalks",
        rightsConfirmed: false,
      },
    ],
    featured: true,
    order: 1,
    verification: {
      status: "unverified",
      source: "PRD §6.4 example (\"01 ENAV — Infrastructure & Development — 28 Residential Units\")",
      notes: "Confirm project name spelling, location, client, year and scope with the company.",
    },
  },
  {
    slug: "sample-northern-neighborhood",
    title: { he: "שכונת מגורים — צפון", ar: "حي سكني — الشمال", en: "Northern Residential Neighborhood" },
    location: { he: "מחוז צפון", ar: "لواء الشمال", en: "Northern District" },
    region: "north",
    year: 2023,
    client: { he: "רשות מקומית (לדוגמה)", ar: "سلطة محلية (مثال)", en: "Local authority (sample)" },
    categories: ["residential-development", "earthworks", "infrastructure"],
    capabilities: ["development", "earthworks", "infrastructure", "retaining-walls"],
    type: { he: "פיתוח שכונת מגורים", ar: "تطوير حي سكني", en: "Residential Development" },
    summary: {
      he: "פיתוח שטח מלא לשכונה חדשה על מדרון תלול.",
      ar: "تطوير كامل لحي جديد على منحدر شديد.",
      en: "Full site development for a new neighborhood on a steep hillside.",
    },
    description: {
      he: "פיתוח שכונת מגורים חדשה בטופוגרפיה הררית: דירוג המגרשים, קירות תומכים, תשתיות מלאות ומערכת כבישים פנימית.",
      ar: "تطوير حي سكني جديد في طبوغرافيا جبلية: مدرّجات القسائم، جدران استنادية، بنية تحتية كاملة وشبكة طرق داخلية.",
      en: "A new residential neighborhood on hilly terrain: terraced plots, retaining walls, complete networks and an internal road system.",
    },
    challenge: {
      he: "הפרשי גובה של עשרות מטרים בין קצוות האתר חייבו תכנון מחדש של איזון העפר וביצוע קירות תומכים לפני פתיחת הכבישים.",
      ar: "فروق ارتفاع بعشرات الأمتار بين أطراف الموقع استلزمت إعادة موازنة كميات التربة وتنفيذ جدران استنادية قبل فتح الطرق.",
      en: "Level differences of tens of meters across the site required rebalancing cut and fill and building retaining walls before roads could open.",
    },
    execution: {
      he: "העבודה חולקה לשלבים לפי מתחמים, כך שתשתיות מים וביוב הונחו במקביל להתקדמות עבודות העפר — וצמצמו תנועת משאיות מחוץ לאתר.",
      ar: "قُسّم العمل إلى مراحل حسب المناطق، بحيث مُدّت شبكات المياه والصرف بالتوازي مع تقدّم الأعمال الترابية — مما قلّل حركة الشاحنات خارج الموقع.",
      en: "Work was phased by zone so water and sewer lines followed directly behind the earthworks — keeping truck movements off public roads to a minimum.",
    },
    result: {
      he: "המגרשים נמסרו מוכנים לבנייה עם כל התשתיות מחוברות.",
      ar: "سُلّمت القسائم جاهزة للبناء مع جميع الشبكات موصولة.",
      en: "Plots were handed over build-ready with every network connected.",
    },
    scope: {
      he: ["עבודות עפר ודירוג", "קירות תומכים", "מים, ביוב וניקוז", "כבישים ומדרכות"],
      ar: ["أعمال ترابية ومدرّجات", "جدران استنادية", "مياه وصرف صحي وتصريف", "طرق وأرصفة"],
      en: ["Earthworks & terracing", "Retaining walls", "Water, sewer & drainage", "Roads & sidewalks"],
    },
    statistics: [
      { value: "120", label: { he: "מגרשים (לדוגמה)", ar: "قسيمة (مثال)", en: "Plots (sample)" } },
      { value: "3.2", label: { he: "ק״מ כבישים (לדוגמה)", ar: "كم طرق (مثال)", en: "km of roads (sample)" } },
    ],
    hero: {
      alt: { he: "שכונה בפיתוח על מדרון", ar: "حي قيد التطوير على منحدر", en: "Neighborhood under development on a hillside" },
      brief: "Drone: terraced hillside plots with retaining walls",
      rightsConfirmed: false,
    },
    images: [
      { alt: { he: "קירות תומכים", ar: "جدران استنادية", en: "Retaining walls" }, brief: "Stone walls between terraces", rightsConfirmed: false },
      { alt: { he: "הנחת צנרת", ar: "مدّ الأنابيب", en: "Pipe laying" }, brief: "Crew laying sewer pipe", rightsConfirmed: false },
      { alt: { he: "כביש פנימי", ar: "طريق داخلي", en: "Internal road" }, brief: "Road base compaction", rightsConfirmed: false },
    ],
    coordinates: [32.92, 35.3],
    featured: true,
    order: 2,
    verification: SAMPLE,
  },
  {
    slug: "sample-regional-road",
    title: { he: "שדרוג כביש אזורי", ar: "تطوير طريق إقليمي", en: "Regional Road Upgrade" },
    location: { he: "מחוז חיפה", ar: "لواء حيفا", en: "Haifa District" },
    region: "haifa",
    year: 2022,
    categories: ["roads", "drainage", "public-infrastructure"],
    capabilities: ["roads", "drainage", "earthworks"],
    type: { he: "כבישים", ar: "طرق", en: "Roads" },
    summary: {
      he: "הרחבת כביש, ניקוז והסדרי תנועה תחת תנועה פעילה.",
      ar: "توسيع طريق وتصريف وترتيبات سير تحت حركة مرور نشطة.",
      en: "Road widening, drainage and traffic works under live traffic.",
    },
    description: {
      he: "הרחבה ושדרוג של קטע כביש אזורי, כולל מבנה כביש חדש, מעבירי מים ואבני שפה.",
      ar: "توسيع وتطوير مقطع من طريق إقليمي، يشمل هيكل طريق جديد وعبّارات مياه وحجارة رصيف.",
      en: "Widening and upgrade of a regional road section, including new road structure, culverts and curbs.",
    },
    challenge: {
      he: "ביצוע לצד תנועה פעילה, בלי לסגור את הכביש.",
      ar: "التنفيذ بجانب حركة سير نشطة دون إغلاق الطريق.",
      en: "Building alongside live traffic without closing the road.",
    },
    scope: {
      he: ["מבנה כביש ומצעים", "מעבירי מים", "אבני שפה", "הסדרי תנועה זמניים"],
      ar: ["هيكل الطريق وطبقات الأساس", "عبّارات", "حجارة رصيف", "ترتيبات سير مؤقتة"],
      en: ["Road structure & base", "Culverts", "Curbs", "Temporary traffic arrangements"],
    },
    statistics: [{ value: "4.5", label: { he: "ק״מ (לדוגמה)", ar: "كم (مثال)", en: "km (sample)" } }],
    hero: {
      alt: { he: "כביש אזורי בעבודות", ar: "طريق إقليمي قيد العمل", en: "Regional road under construction" },
      brief: "Drone, long diagonal: widened road with traffic on one side",
      rightsConfirmed: false,
    },
    images: [
      { alt: { he: "מפלסת בעבודה", ar: "ممهّدة أثناء العمل", en: "Grader at work" }, brief: "Grader shaping base course", rightsConfirmed: false },
      { alt: { he: "מעביר מים", ar: "عبّارة مياه", en: "Culvert" }, brief: "Precast culvert installation", rightsConfirmed: false },
    ],
    coordinates: [32.62, 35.08],
    featured: true,
    order: 3,
    verification: SAMPLE,
  },
  {
    slug: "sample-sewer-trunk-line",
    title: { he: "קו ביוב מאסף", ar: "خط صرف صحي رئيسي", en: "Sewer Trunk Line" },
    location: { he: "מחוז מרכז", ar: "لواء المركز", en: "Central District" },
    region: "center",
    year: 2024,
    categories: ["sewer", "infrastructure"],
    capabilities: ["sewer", "infrastructure", "earthworks"],
    type: { he: "תשתיות ביוב", ar: "بنية صرف صحي", en: "Sewer Infrastructure" },
    summary: {
      he: "קו ביוב מאסף בקוטר גדול בעומק רב.",
      ar: "خط صرف صحي رئيسي بقطر كبير وعمق كبير.",
      en: "Large-diameter deep sewer trunk line.",
    },
    description: {
      he: "הנחת קו ביוב מאסף בקוטר גדול, כולל תאי בקרה עמוקים וחיבור למערכת הקיימת.",
      ar: "مدّ خط صرف صحي رئيسي بقطر كبير، يشمل غرف تفتيش عميقة ووصلة بالشبكة القائمة.",
      en: "Installation of a large-diameter sewer trunk line with deep inspection manholes and connection to the existing network.",
    },
    scope: {
      he: ["חפירה עמוקה ודיפון", "צנרת בקוטר גדול", "תאי בקרה", "בדיקות וצילום"],
      ar: ["حفر عميق ودعم الجوانب", "أنابيب بقطر كبير", "غرف تفتيش", "فحوصات وتصوير"],
      en: ["Deep excavation & shoring", "Large-diameter pipe", "Inspection manholes", "Testing & CCTV"],
    },
    statistics: [{ value: "2.1", label: { he: "ק״מ (לדוגמה)", ar: "كم (مثال)", en: "km (sample)" } }],
    hero: {
      alt: { he: "צנרת ביוב בקוטר גדול", ar: "أنابيب صرف بقطر كبير", en: "Large-diameter sewer pipe" },
      brief: "Deep shored trench with large pipe being lowered",
      rightsConfirmed: false,
    },
    images: [
      { alt: { he: "תא בקרה", ar: "غرفة تفتيش", en: "Inspection manhole" }, brief: "Manhole ring placement", rightsConfirmed: false },
    ],
    coordinates: [32.18, 34.95],
    featured: false,
    verification: SAMPLE,
  },
  {
    slug: "sample-stormwater-network",
    title: { he: "רשת ניקוז עירונית", ar: "شبكة تصريف حضرية", en: "Urban Stormwater Network" },
    location: { he: "מחוז צפון", ar: "لواء الشمال", en: "Northern District" },
    region: "north",
    year: 2021,
    categories: ["drainage", "public-infrastructure"],
    capabilities: ["drainage", "infrastructure"],
    type: { he: "ניקוז", ar: "تصريف", en: "Drainage" },
    summary: {
      he: "מערכת תיעול חדשה להפחתת הצפות במרכז יישוב.",
      ar: "نظام تصريف جديد للحد من الفيضانات في مركز البلدة.",
      en: "New storm-drain system to reduce flooding in a town center.",
    },
    description: {
      he: "תכנון מחדש של זרימת מי הנגר והקמת קווי תיעול וקולטנים ברחובות מרכזיים.",
      ar: "إعادة توجيه جريان مياه الأمطار وإنشاء خطوط تصريف ومصارف في الشوارع الرئيسية.",
      en: "Rerouting of surface runoff with new storm drains and inlets along main streets.",
    },
    scope: {
      he: ["קווי תיעול", "קולטנים", "שיקום כבישים"],
      ar: ["خطوط تصريف", "مصارف", "إعادة تأهيل الطرق"],
      en: ["Storm drains", "Inlets", "Road reinstatement"],
    },
    statistics: [],
    hero: {
      alt: { he: "קווי ניקוז ברחוב", ar: "خطوط تصريف في الشارع", en: "Storm drains in a street" },
      brief: "Street-level: drainage trench along town main street",
      rightsConfirmed: false,
    },
    images: [],
    coordinates: [32.7, 35.3],
    featured: true,
    order: 4,
    verification: SAMPLE,
  },
  {
    slug: "sample-public-park-walls",
    title: { he: "פארק ציבורי וקירות תומכים", ar: "حديقة عامة وجدران استنادية", en: "Public Park & Retaining Walls" },
    location: { he: "מחוז ירושלים", ar: "لواء القدس", en: "Jerusalem District" },
    region: "jerusalem",
    year: 2025,
    ongoing: true,
    categories: ["earthworks", "public-infrastructure"],
    capabilities: ["retaining-walls", "earthworks", "development"],
    type: { he: "פיתוח ציבורי", ar: "تطوير عام", en: "Public Development" },
    summary: {
      he: "דירוג מדרון, קירות אבן ופיתוח לפארק שכונתי.",
      ar: "مدرّجات منحدر، جدران حجرية وتطوير لحديقة حيّ.",
      en: "Slope terracing, stone walls and site works for a neighborhood park.",
    },
    description: {
      he: "הפיכת מדרון לא מנוצל לפארק ציבורי מדורג, עם קירות אבן, שבילים וניקוז.",
      ar: "تحويل منحدر غير مستغل إلى حديقة عامة مدرّجة، مع جدران حجرية وممرات وتصريف.",
      en: "Turning an unused slope into a terraced public park with stone walls, paths and drainage.",
    },
    scope: {
      he: ["עבודות עפר ודירוג", "קירות אבן", "שבילים וניקוז"],
      ar: ["أعمال ترابية ومدرّجات", "جدران حجرية", "ممرات وتصريف"],
      en: ["Earthworks & terracing", "Stone walls", "Paths & drainage"],
    },
    statistics: [],
    hero: {
      alt: { he: "קירות אבן מדורגים", ar: "جدران حجرية مدرّجة", en: "Terraced stone walls" },
      brief: "Terraced stone walls on a slope, city in background",
      rightsConfirmed: false,
    },
    images: [],
    coordinates: [31.78, 35.2],
    featured: false,
    verification: SAMPLE,
  },
];
