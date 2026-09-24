import type { Capability } from "./types";

/**
 * PRD §6.3: "Only capabilities verified with the company should be displayed."
 * All entries below are drafted from the PRD's example list and are `unverified`
 * until the company confirms each one.
 */
const PENDING = {
  status: "needs-confirmation",
  basis: "prd",
  source: "PRD §6.3 example list",
  notes: "Confirm with company that this capability is performed in-house, and approve copy.",
} as const;

/** Registry classifications found in research that support a capability (still to be confirmed). */
const REGISTRY = (classification: string) =>
  ({
    status: "needs-confirmation",
    basis: "public-source",
    source: `Contractor registry — classification ${classification} (research)`,
    notes: "Classification found in research. Confirm with company and against the Registrar of Contractors.",
  }) as const;

export const capabilities: Capability[] = [
  {
    id: "earthworks",
    title: { he: "עבודות עפר", ar: "أعمال ترابية", en: "Earthworks" },
    short: {
      he: "חפירה, מילוי, הידוק ויישור קרקע בהיקפים גדולים.",
      ar: "حفر وردم ودمك وتسوية للأرض على نطاق واسع.",
      en: "Large-scale excavation, fill, compaction and grading.",
    },
    description: {
      he: "כל פרויקט מתחיל בקרקע. אנחנו מבצעים חפירה וחציבה, מילוי מבוקר בשכבות, הידוק ויישור לפי תוכנית — ומכינים את השטח לתשתיות, לכבישים ולבנייה.",
      ar: "كل مشروع يبدأ من الأرض. ننفّذ الحفر والتكسير، والردم المُراقَب على طبقات، والدمك والتسوية وفق المخطط — ونُجهّز الموقع للبنية التحتية والطرق والبناء.",
      en: "Every project starts with the ground. We excavate and break rock, place controlled fill in layers, compact and grade to design — preparing the site for networks, roads and construction.",
    },
    scope: {
      he: ["חפירה וחציבה", "מילוי מבוקר והידוק", "יישור ופילוס שטחים", "הכנת תשתית לכבישים", "פינוי עודפי עפר"],
      ar: ["حفر وتكسير صخور", "ردم مُراقَب ودمك", "تسوية وتسطيح المساحات", "تجهيز طبقات أساس الطرق", "نقل فائض التربة"],
      en: ["Excavation & rock breaking", "Controlled fill & compaction", "Site grading & levelling", "Road subgrade preparation", "Surplus soil removal"],
    },
    equipment: ["excavators", "loaders", "dump-trucks", "bulldozers", "rollers", "graders", "specialized"],
    image: {
      alt: { he: "מחפר בעבודות עפר באתר", ar: "حفّارة في أعمال ترابية بالموقع", en: "Excavator performing earthworks on site" },
      brief: "Drone, top-down: excavator cutting a terraced site, trucks queued",
      status: "missing",
      illustration: "earthworks",
    },
    verification: PENDING,
  },
  {
    id: "infrastructure",
    title: { he: "תשתיות", ar: "بنية تحتية", en: "Infrastructure" },
    short: {
      he: "רשתות תת־קרקעיות מלאות לשכונות ולמתחמים.",
      ar: "شبكات تحت أرضية متكاملة للأحياء والمجمّعات.",
      en: "Complete underground networks for neighborhoods and sites.",
    },
    description: {
      he: "ביצוע מלא של מערכות תשתית תת־קרקעיות — מים, ביוב, ניקוז ותעלות למערכות — בתיאום בין כל הגורמים ובהתאם לדרישות הרשויות.",
      ar: "تنفيذ كامل لشبكات البنية التحتية تحت الأرض — مياه، صرف صحي، تصريف وقنوات للأنظمة — بالتنسيق بين جميع الجهات ووفق متطلبات السلطات.",
      en: "Full execution of underground infrastructure — water, sewer, drainage and utility ducts — coordinated across all stakeholders and to authority requirements.",
    },
    scope: {
      he: ["תשתיות מים וביוב", "ניקוז ותיעול", "תעלות ושרוולים למערכות", "תאים וחיבורים", "בדיקות ומסירה לרשות"],
      ar: ["شبكات مياه وصرف صحي", "تصريف وقنوات", "أنابيب وقنوات للأنظمة", "غرف تفتيش ووصلات", "فحوصات وتسليم للسلطة"],
      en: ["Water & sewer networks", "Drainage & channels", "Utility ducts & sleeves", "Manholes & connections", "Testing & authority handover"],
    },
    equipment: ["excavators", "loaders", "rollers", "dump-trucks"],
    image: {
      alt: { he: "הנחת צנרת תשתית בתעלה", ar: "مدّ أنابيب بنية تحتية في خندق", en: "Infrastructure pipes laid in a trench" },
      brief: "Low angle: open trench with pipes, crew, excavator arm in frame",
      status: "missing",
      illustration: "network",
    },
    verification: REGISTRY("G5"),
  },
  {
    id: "roads",
    title: { he: "כבישים", ar: "طرق", en: "Roads" },
    short: {
      he: "סלילה, מצעים, אבני שפה ופיתוח דרכים.",
      ar: "شق وتعبيد طرق، طبقات أساس، أرصفة وتطوير.",
      en: "Road building, base layers, curbs and road development.",
    },
    description: {
      he: "הקמה ושדרוג של כבישים ודרכי גישה: עבודות עפר, מצעים, אבני שפה, מדרכות וניקוז — עד לשכבות האספלט ולסימון.",
      ar: "إنشاء وتطوير الطرق وطرق الوصول: أعمال ترابية، طبقات أساس، حجارة رصيف، أرصفة وتصريف — حتى طبقات الإسفلت والتخطيط.",
      en: "New and upgraded roads and access roads: earthworks, base courses, curbs, sidewalks and drainage — through to asphalt layers and marking.",
    },
    scope: {
      he: ["מבנה כביש ומצעים", "אבני שפה ומדרכות", "ניקוז כבישים", "תיאום עבודות אספלט", "הסדרי תנועה זמניים"],
      ar: ["هيكل الطريق وطبقات الأساس", "حجارة رصيف وأرصفة", "تصريف الطرق", "تنسيق أعمال الإسفلت", "ترتيبات سير مؤقتة"],
      en: ["Road structure & base courses", "Curbs & sidewalks", "Road drainage", "Asphalt works coordination", "Temporary traffic arrangements"],
    },
    equipment: ["graders", "rollers", "loaders", "dump-trucks"],
    image: {
      alt: { he: "כביש חדש בשלבי סלילה", ar: "طريق جديد في مراحل التعبيد", en: "New road under construction" },
      brief: "Drone, long diagonal: fresh road cutting through terrain at golden hour",
      status: "missing",
      illustration: "road",
    },
    verification: REGISTRY("G5"),
  },
  {
    id: "water",
    title: { he: "מים", ar: "مياه", en: "Water" },
    short: {
      he: "קווי מים, חיבורים ומערכות אספקה.",
      ar: "خطوط مياه، وصلات وأنظمة تزويد.",
      en: "Water mains, connections and supply systems.",
    },
    description: {
      he: "הנחת קווי מים ראשיים ומשניים, חיבורי מגרשים, מגופים והידרנטים — כולל בדיקות לחץ ושטיפה לפני מסירה לתאגיד.",
      ar: "مدّ خطوط مياه رئيسية وفرعية، وصلات قسائم، محابس وحنفيات حريق — بما في ذلك فحوصات الضغط والغسيل قبل التسليم لشركة المياه.",
      en: "Primary and secondary water mains, plot connections, valves and hydrants — including pressure testing and flushing before handover to the water utility.",
    },
    scope: {
      he: ["קווי מים ראשיים", "חיבורי מגרשים", "מגופים והידרנטים", "בדיקות לחץ ושטיפה"],
      ar: ["خطوط مياه رئيسية", "وصلات قسائم", "محابس وحنفيات حريق", "فحوصات ضغط وغسيل"],
      en: ["Water mains", "Plot connections", "Valves & hydrants", "Pressure testing & flushing"],
    },
    equipment: ["excavators", "rollers"],
    image: {
      alt: { he: "צנרת מים בהתקנה", ar: "أنابيب مياه قيد التركيب", en: "Water main being installed" },
      brief: "Detail: blue water main with fittings in trench",
      status: "missing",
      illustration: "water",
    },
    verification: REGISTRY("B4"),
  },
  {
    id: "sewer",
    title: { he: "ביוב", ar: "صرف صحي", en: "Sewer" },
    short: {
      he: "קווי גרביטציה, תאים וחיבורים.",
      ar: "خطوط انسيابية، غرف تفتيش ووصلات.",
      en: "Gravity lines, manholes and connections.",
    },
    description: {
      he: "ביצוע קווי ביוב גרביטציוניים ולחץ, תאי בקרה וחיבורי מגרשים — בשיפועים מדויקים ובבדיקות אטימות מלאות.",
      ar: "تنفيذ خطوط صرف صحي انسيابية وضاغطة، غرف تفتيش ووصلات قسائم — بميول دقيقة وفحوصات إحكام كاملة.",
      en: "Gravity and pressure sewer lines, inspection manholes and plot connections — laid to precise gradients with full leak testing.",
    },
    scope: {
      he: ["קווי ביוב גרביטציוניים", "קווי סניקה", "תאי בקרה", "חיבורי מגרשים", "צילום ובדיקות אטימות"],
      ar: ["خطوط صرف انسيابية", "خطوط ضخ", "غرف تفتيش", "وصلات قسائم", "تصوير وفحوصات إحكام"],
      en: ["Gravity sewer lines", "Pressure mains", "Inspection manholes", "Plot connections", "CCTV & leak testing"],
    },
    equipment: ["excavators", "rollers", "dump-trucks"],
    image: {
      alt: { he: "התקנת תא ביוב", ar: "تركيب غرفة تفتيش للصرف الصحي", en: "Sewer manhole installation" },
      brief: "Crane placing precast manhole ring, crew guiding",
      status: "missing",
      illustration: "sewer",
    },
    verification: REGISTRY("B4"),
  },
  {
    id: "drainage",
    title: { he: "ניקוז", ar: "تصريف", en: "Drainage" },
    short: {
      he: "תיעול, קולטנים ומערכות ניקוז עילי.",
      ar: "قنوات، مصارف وأنظمة تصريف سطحي.",
      en: "Stormwater pipes, inlets and surface drainage.",
    },
    description: {
      he: "מערכות ניקוז ותיעול למי נגר: קווי תיעול, קולטנים, מעבירי מים ותעלות — להגנה על כבישים, מבנים ושטחים ציבוריים.",
      ar: "أنظمة تصريف مياه الأمطار: خطوط تصريف، مصارف، عبّارات وقنوات — لحماية الطرق والمباني والمساحات العامة.",
      en: "Stormwater systems: drainage lines, inlets, culverts and channels — protecting roads, buildings and public spaces.",
    },
    scope: {
      he: ["קווי תיעול", "קולטני מים", "מעבירי מים", "תעלות ניקוז פתוחות"],
      ar: ["خطوط تصريف", "مصارف مياه", "عبّارات", "قنوات تصريف مفتوحة"],
      en: ["Storm drains", "Inlets", "Culverts", "Open drainage channels"],
    },
    equipment: ["excavators", "loaders", "rollers"],
    image: {
      alt: { he: "מעביר מים בטון", ar: "عبّارة مياه خرسانية", en: "Concrete stormwater culvert" },
      brief: "Wide: large concrete culvert under new road",
      status: "missing",
      illustration: "drainage",
    },
    verification: REGISTRY("B4"),
  },
  {
    id: "development",
    title: { he: "פיתוח", ar: "تطوير", en: "Development" },
    short: {
      he: "פיתוח שטח מלא לשכונות ולמבני ציבור.",
      ar: "تطوير موقع كامل للأحياء والمباني العامة.",
      en: "Full site development for neighborhoods and public buildings.",
    },
    description: {
      he: "פיתוח שטח מקצה לקצה: הכנת מגרשים, תשתיות, כבישים, מדרכות, ריצוף וגינון בסיסי — כדי שהשכונה תהיה מוכנה לאכלוס.",
      ar: "تطوير الموقع من البداية للنهاية: تجهيز القسائم، البنية التحتية، الطرق، الأرصفة، التبليط والتنسيق الأساسي — لتصبح الحارة جاهزة للسكن.",
      en: "End-to-end site development: plot preparation, networks, roads, sidewalks, paving and base landscaping — so a neighborhood is ready for residents.",
    },
    scope: {
      he: ["הכנת מגרשים", "תשתיות מלאות", "כבישים ומדרכות", "ריצוף ופיתוח נופי", "מסירה לרשות המקומית"],
      ar: ["تجهيز القسائم", "بنية تحتية كاملة", "طرق وأرصفة", "تبليط وتنسيق", "تسليم للسلطة المحلية"],
      en: ["Plot preparation", "Complete networks", "Roads & sidewalks", "Paving & landscape works", "Handover to local authority"],
    },
    equipment: ["excavators", "loaders", "graders", "rollers", "dump-trucks"],
    image: {
      alt: { he: "שכונת מגורים בשלבי פיתוח", ar: "حي سكني في مراحل التطوير", en: "Residential neighborhood under development" },
      brief: "Drone, high: whole neighborhood grid with roads and plots prepared",
      status: "missing",
      illustration: "neighborhood",
    },
    verification: REGISTRY("G5"),
  },
  {
    id: "retaining-walls",
    title: { he: "קירות תומכים", ar: "جدران استنادية", en: "Retaining Walls" },
    short: {
      he: "קירות תומכים ודיפון בשטח משופע.",
      ar: "جدران استنادية ودعم للمنحدرات.",
      en: "Retaining walls and slope support on steep terrain.",
    },
    description: {
      he: "קירות תומכים מבטון ומאבן, קירות כובד ומערכות ייצוב — המאפשרים בנייה בטופוגרפיה משופעת ומורכבת.",
      ar: "جدران استنادية من الخرسانة والحجر، جدران ثقلية وأنظمة تثبيت — تتيح البناء في طبوغرافيا منحدرة ومعقّدة.",
      en: "Concrete and stone retaining walls, gravity walls and stabilization systems — enabling construction on steep, complex topography.",
    },
    scope: {
      he: ["קירות בטון מזוין", "קירות אבן וכובד", "ניקוז מאחורי קירות", "מילוי והידוק"],
      ar: ["جدران خرسانة مسلّحة", "جدران حجرية وثقلية", "تصريف خلف الجدران", "ردم ودمك"],
      en: ["Reinforced concrete walls", "Stone & gravity walls", "Wall back-drainage", "Backfill & compaction"],
    },
    equipment: ["excavators", "loaders", "rollers"],
    image: {
      alt: { he: "קיר תומך מאבן", ar: "جدار استنادي حجري", en: "Stone retaining wall" },
      brief: "Tall stone retaining wall with terraced plots above",
      status: "missing",
      illustration: "retaining",
    },
    verification: PENDING,
  },
  {
    id: "residential-development",
    title: { he: "פיתוח שכונות מגורים", ar: "تطوير أحياء سكنية", en: "Residential Development" },
    short: {
      he: "כל מה שצריך כדי ששכונה חדשה תהיה מוכנה לבנייה ולמגורים.",
      ar: "كل ما يلزم ليصبح الحي الجديد جاهزًا للبناء والسكن.",
      en: "Everything a new neighborhood needs to be ready for building and living.",
    },
    description: {
      he: "ביצוע התשתיות והפיתוח לשכונות מגורים חדשות — מהכשרת הקרקע והמגרשים, דרך רשתות המים, הביוב והניקוז ועד הכבישים והמדרכות.",
      ar: "تنفيذ البنية التحتية والتطوير للأحياء السكنية الجديدة — من تجهيز الأرض والقسائم، مرورًا بشبكات المياه والصرف والتصريف، حتى الطرق والأرصفة.",
      en: "Infrastructure and development for new residential neighborhoods — from preparing the land and plots, through water, sewer and drainage networks, to roads and sidewalks.",
    },
    scope: {
      he: ["הכשרת מגרשים", "רשתות מים, ביוב וניקוז", "כבישים ומדרכות", "תיאום מול יזמים ורשויות"],
      ar: ["تجهيز القسائم", "شبكات مياه وصرف وتصريف", "طرق وأرصفة", "التنسيق مع المطوّرين والسلطات"],
      en: ["Plot preparation", "Water, sewer & drainage networks", "Roads & sidewalks", "Coordination with developers & authorities"],
    },
    equipment: ["excavators", "loaders", "dump-trucks", "rollers", "graders"],
    image: {
      alt: { he: "שכונת מגורים בפיתוח", ar: "حي سكني قيد التطوير", en: "Residential neighborhood under development" },
      brief: "Drone: new neighborhood with prepared plots and fresh roads",
      status: "missing",
      illustration: "residential",
    },
    verification: {
      status: "needs-confirmation",
      basis: "public-source",
      source: "Company Facebook page — works for Amana in Bruchin (research)",
      notes: "Confirm residential development scope with the company.",
    },
  },
  {
    id: "public-infrastructure",
    title: { he: "תשתיות ציבוריות", ar: "بنية تحتية عامة", en: "Public Infrastructure" },
    short: {
      he: "עבודות תשתית ופיתוח עבור רשויות ומועצות.",
      ar: "أعمال بنية تحتية وتطوير لصالح السلطات والمجالس.",
      en: "Infrastructure and development works for local authorities and councils.",
    },
    description: {
      he: "ביצוע עבודות תשתית ופיתוח במרחב הציבורי — רחובות, שטחים פתוחים, ניקוז ומבני ציבור — בהתאם לדרישות הרשות המזמינה.",
      ar: "تنفيذ أعمال البنية التحتية والتطوير في الحيّز العام — شوارع، مساحات مفتوحة، تصريف ومبانٍ عامة — وفق متطلبات السلطة صاحبة المشروع.",
      en: "Infrastructure and development in the public realm — streets, open spaces, drainage and public buildings — to the requirements of the commissioning authority.",
    },
    scope: {
      he: ["רחובות ומדרכות", "שטחים ציבוריים פתוחים", "ניקוז", "עבודה מול רשויות"],
      ar: ["شوارع وأرصفة", "مساحات عامة مفتوحة", "تصريف", "العمل مع السلطات"],
      en: ["Streets & sidewalks", "Public open spaces", "Drainage", "Working with authorities"],
    },
    equipment: ["excavators", "loaders", "rollers"],
    image: {
      alt: { he: "פיתוח מרחב ציבורי", ar: "تطوير الحيّز العام", en: "Public space development" },
      brief: "Completed public street or square delivered for a council",
      status: "missing",
      illustration: "public",
    },
    verification: {
      status: "needs-confirmation",
      basis: "prd",
      source: "Asset Strategy §4 capability list",
      notes: "Research mentions municipal / regional-council documents — link specific projects.",
    },
  },
  {
    id: "pumping-stations",
    title: { he: "תחנות שאיבה", ar: "محطات ضخ", en: "Pumping Stations" },
    short: {
      he: "מערכות אלקטרומכניות לתחנות שאיבה.",
      ar: "أنظمة كهروميكانيكية لمحطات الضخ.",
      en: "Electromechanical systems for pumping stations.",
    },
    description: {
      he: "התקנת מערכות אלקטרומכניות בתחנות שאיבה למים ולביוב.",
      ar: "تركيب الأنظمة الكهروميكانيكية في محطات ضخ المياه والصرف الصحي.",
      en: "Installation of electromechanical systems in water and sewage pumping stations.",
    },
    scope: {
      he: ["משאבות וצנרת", "לוחות חשמל ובקרה", "הרצה ומסירה"],
      ar: ["مضخات وأنابيب", "لوحات كهرباء وتحكم", "تشغيل تجريبي وتسليم"],
      en: ["Pumps & pipework", "Electrical & control panels", "Commissioning & handover"],
    },
    equipment: ["specialized"],
    image: {
      alt: { he: "תחנת שאיבה", ar: "محطة ضخ", en: "Pumping station" },
      brief: "Pumping station interior with pumps and manifolds",
      status: "missing",
      illustration: "water",
    },
    // Asset Strategy §4: "Pumping Stations — only if verified".
    verification: {
      status: "do-not-publish",
      basis: "public-source",
      source: "Contractor registry — classification B1 (research)",
      notes: "Hidden until the company confirms it actually performs pumping-station work.",
    },
  },
];
