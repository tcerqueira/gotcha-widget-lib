/**
 * Configuration parameters for rendering the captcha widget
 */
export type RenderParams = {
  /** API key for site verification */
  sitekey: string;
  /** Widget theme appearance */
  theme?: "dark" | "light";
  /** Widget size configuration */
  size?: "compact" | "normal" | "invisible";
  /** Badge position in the widget */
  badge?: "bottomright" | "bottomleft" | "inline";
  /** Tab index for accessibility */
  tabindex?: number;
  /** Callback function on successful verification */
  callback?: (token: string) => void;
  /** Callback function when challenge expires */
  "expired-callback"?: () => void;
  /** Callback function on error */
  "error-callback"?: () => void;
  /** For plugin owners to not interfere with existing reCAPTCHA installations on a page.
   * If true, this reCAPTCHA instance will be part of a separate ID space
   */
  isolated?: boolean;
};

/**
 * Default configuration parameters for the widget
 */
export const defaultRenderParams: RenderParams = {
  sitekey: "",
  theme: "light",
  size: "normal",
  badge: "bottomright",
  tabindex: 0,
  isolated: false,
};

/**
 * Message types for widget communication
 */
export type WidgetMessage =
  | { type: "response-callback"; response: string }
  | { type: "expired-callback" }
  | { type: "error-callback" };

const TARGET_ORIGIN = "*";

type ChallengeResponse = {
  token: string;
};

/**
 * Handles the challenge response and communicates with the parent window
 * @param origin - Gotcha server origin (e.g: https://gotcha.com)
 * @param secret - Site api secret
 * @param success - Whether the challenge was successful
 * @param win - Target window (defaults to window.parent)
 */
export async function onChallengeResponse(
  origin: string,
  secret: string,
  success: boolean,
  win: Window = window.parent,
) {
  const response = await fetch(`${origin}/api/challenge/process`, {
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

/**
 * Handles challenge expiration event
 * @param win - Target window (defaults to window.parent)
 */
export async function onChallengeExpired(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "expired-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}

/**
 * Handles error events in the challenge system
 * @param win - Target window (defaults to window.parent)
 */
export async function onError(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "error-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}
