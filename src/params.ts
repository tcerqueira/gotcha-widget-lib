type Theme = "light" | "dark";
type Size = "compact" | "normal" | "invisible";
type Badge = "bottomright" | "bottomleft" | "inline";

export interface SearchParams {
  k: string;
  hl?: string;
  theme?: Theme;
  size?: Size;
  badge?: Badge;
  sv?: string;
}

export function extractSearchParams(
  search: string | URLSearchParams,
): SearchParams {
  const params =
    search instanceof URLSearchParams ? search : new URLSearchParams(search);

  const result: SearchParams = {
    k: params.get("k") ?? "",
    hl: params.get("hl") ?? navigator?.language,
    theme: (params.get("theme") as Theme) ?? "light",
    size: (params.get("size") as Size) ?? "normal",
  };

  const badge = params.get("badge") as Badge;
  if (badge) result.badge = badge;

  const sv = params.get("sv");
  if (sv) result.sv = sv;

  return result;
}
