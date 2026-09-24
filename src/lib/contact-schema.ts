/** Shared (client + server) validation for the project inquiry form (PRD §11). */

export const MAX_FILES = 5;
/** Kept under typical serverless request-body limits (e.g. Vercel's 4.5 MB). */
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = ["pdf", "dwg", "dxf", "jpg", "jpeg", "png", "webp", "heic", "zip", "doc", "docx", "xls", "xlsx"];
export const SCOPE_OPTIONS = ["small", "medium", "large", "xlarge", "unknown"] as const;

export type InquiryField = "name" | "company" | "phone" | "email" | "location" | "type" | "scope" | "message";
export type FieldError = "required" | "email" | "phone" | "files";

export interface InquiryInput {
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  type: string;
  scope: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-()]{7,20}$/;

export function validateInquiry(input: InquiryInput): Partial<Record<InquiryField, FieldError>> {
  const errors: Partial<Record<InquiryField, FieldError>> = {};
  if (!input.name.trim()) errors.name = "required";
  if (!input.phone.trim()) errors.phone = "required";
  else if (!PHONE_RE.test(input.phone.trim())) errors.phone = "phone";
  if (!input.email.trim()) errors.email = "required";
  else if (!EMAIL_RE.test(input.email.trim())) errors.email = "email";
  return errors;
}

export function validateFiles(files: { name: string; size: number }[]): FieldError | null {
  if (files.length > MAX_FILES) return "files";
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) return "files";
  const bad = files.some((f) => !ALLOWED_EXTENSIONS.includes(f.name.split(".").pop()?.toLowerCase() ?? ""));
  return bad ? "files" : null;
}
