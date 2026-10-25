"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Listing } from "./types";
import { SEED } from "./data";

const KEY = "evler:ads:v1";
interface Ctx { listings: Listing[]; addListing: (l: Listing) => void }
const C = createContext<Ctx>({ listings: SEED, addListing: () => {} });

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Listing[]>([]);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setUser(JSON.parse(raw)); } catch {}
  }, []);
  const addListing = (l: Listing) => {
    setUser((prev) => {
      const next = [l, ...prev];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return <C.Provider value={{ listings: [...user, ...SEED], addListing }}>{children}</C.Provider>;
}
export const useListings = () => useContext(C);
