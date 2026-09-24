import type { Localized } from "@/i18n/config";
import type { CategoryId, EquipmentCategoryId, RegionId } from "./types";

export const categories: Record<CategoryId, Localized> = {
  "residential-development": { he: "פיתוח שכונות מגורים", ar: "تطوير أحياء سكنية", en: "Residential Development" },
  roads: { he: "כבישים", ar: "طرق", en: "Roads" },
  infrastructure: { he: "תשתיות", ar: "بنية تحتية", en: "Infrastructure" },
  earthworks: { he: "עבודות עפר", ar: "أعمال ترابية", en: "Earthworks" },
  water: { he: "מים", ar: "مياه", en: "Water" },
  sewer: { he: "ביוב", ar: "صرف صحي", en: "Sewer" },
  drainage: { he: "ניקוז", ar: "تصريف", en: "Drainage" },
  "public-infrastructure": { he: "תשתיות ציבוריות", ar: "بنية تحتية عامة", en: "Public Infrastructure" },
};

export const regions: Record<RegionId, Localized> = {
  north: { he: "מחוז צפון", ar: "لواء الشمال", en: "Northern District" },
  haifa: { he: "מחוז חיפה", ar: "لواء حيفا", en: "Haifa District" },
  center: { he: "מחוז מרכז", ar: "لواء المركز", en: "Central District" },
  "tel-aviv": { he: "מחוז תל אביב", ar: "لواء تل أبيب", en: "Tel Aviv District" },
  jerusalem: { he: "מחוז ירושלים", ar: "لواء القدس", en: "Jerusalem District" },
  south: { he: "מחוז דרום", ar: "لواء الجنوب", en: "Southern District" },
  // Naming to be confirmed with the company for each language.
  "judea-samaria": { he: "יהודה ושומרון", ar: "يهودا والسامرة", en: "Judea & Samaria" },
};

export const equipmentCategories: Record<EquipmentCategoryId, Localized> = {
  excavators: { he: "מחפרים", ar: "حفّارات", en: "Excavators" },
  loaders: { he: "שופלים", ar: "جرّافات تحميل", en: "Loaders" },
  "dump-trucks": { he: "משאיות רכינה", ar: "شاحنات قلّابة", en: "Dump trucks" },
  bulldozers: { he: "דחפורים", ar: "جرّافات (بلدوزر)", en: "Bulldozers" },
  graders: { he: "מפלסות", ar: "ممهّدات", en: "Graders" },
  compactors: { he: "מהדקים", ar: "مدكّات", en: "Compactors" },
  rollers: { he: "מכבשים", ar: "مداحل", en: "Rollers" },
  specialized: { he: "ציוד ייעודי", ar: "معدات متخصصة", en: "Specialized equipment" },
};
