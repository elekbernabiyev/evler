export type Deal = "Satış" | "Kirayə";
export type PropType = "Bina evi" | "Həyət evi" | "Villa" | "Obyekt" | "Torpaq";
export type Repair = "Əla" | "Orta" | "Təmirsiz";
export const DEALS: Deal[] = ["Satış", "Kirayə"];
export const TYPES: PropType[] = ["Bina evi", "Həyət evi", "Villa", "Obyekt", "Torpaq"];
export const REPAIRS: Repair[] = ["Əla", "Orta", "Təmirsiz"];
export const FEATURES = ["Kupça var", "İpotekaya yararlı", "Qaz var", "Mebelli", "Qaraj"] as const;
export const LOCATIONS: Record<string, string[]> = {
  Bakı: ["Nərimanov", "Yasamal", "Nəsimi", "Xətai", "Səbail", "Binəqədi", "Xəzər"],
  Sumqayıt: ["9-cu mikrorayon", "Mərkəz"],
  Gəncə: ["Kəpəz", "Nizami"],
};
export const METROS = ["28 May", "Nərimanov", "Gənclik", "Elmlər Akademiyası", "Nizami", "Xətai", "Əhmədli"];
export interface Listing {
  id: string; title: string; deal: Deal; type: PropType; price: number;
  city: string; district: string; metro?: string; rooms: number; area: number;
  floor: number; totalFloors: number; repair: Repair; features: string[]; badges: string[];
  image: string; description: string; phone: string; createdAt: number;
}
