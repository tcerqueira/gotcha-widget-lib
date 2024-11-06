export type RenderParams = {
  sitekey: string;
  theme?: "dark" | "light";
  size?: "compact" | "normal" | "invisible";
  badge?: "bottomright" | "bottomleft" | "inline";
  tabindex?: number;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  isolated?: boolean;
};

export const defaultRenderParams: RenderParams = {
  sitekey: "",
  theme: "light",
  size: "normal",
  badge: "bottomright",
  tabindex: 0,
  isolated: false,
};

export type WidgetMessage =
  | { type: "response-callback"; response: string }
  | { type: "expired-callback" }
  | { type: "error-callback" };

const TARGET_ORIGIN = "*";

type ChallengeResponse = {
  token: string;
};

export async function onChallengeResponse(
  origin: string,
  secret: string,
  success: boolean,
  win: Window = window.parent,
) {
  const response = await fetch(`${origin}/api/process-challenge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success, secret }),
  });
  const { token }: ChallengeResponse = await response.json();

  const message: WidgetMessage = {
    type: "response-callback",
    response: token,
  };
  win.postMessage(message, TARGET_ORIGIN);
}

export async function onChallengeExpired(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "expired-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}

export async function onError(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "error-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}
