type Theme = "light" | "dark";
type Size = "compact" | "normal" | "invisible";
type Badge = "bottomright" | "bottomleft" | "inline";

export interface SearchParams {
  k: string;
  hl: string | null;
  theme: Theme | null;
  size: Size | null;
  badge: Badge | null;
  sv: string | null;
  logoUrl: string | null;
}

export let params: SearchParams | null = null;

export function extractSearchParams(search: string | URLSearchParams) {
  const searchParams =
    search instanceof URLSearchParams ? search : new URLSearchParams(search);

  const result: SearchParams = {
    k: searchParams.get("k") ?? "",
    hl: searchParams.get("hl") ?? navigator?.language,
    theme: (searchParams.get("theme") as Theme) ?? "light",
    size: (searchParams.get("size") as Size) ?? "normal",
    badge: searchParams.get("badge") as Badge,
    sv: searchParams.get("sv"),
    logoUrl: searchParams.get("logoUrl"),
  };

  params = result;
}
