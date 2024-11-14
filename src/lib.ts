/**
 * Message types for widget communication
 */
export type WidgetMessage =
  | { type: "response-callback"; success: boolean }
  | { type: "expired-callback" }
  | { type: "error-callback" };

const TARGET_ORIGIN = "*";

/**
 * Handles the challenge response and communicates with the parent window
 * @param success - Whether the challenge was successful
 * @param win - Target window (defaults to window.parent)
 */
export async function onChallengeResponse(
  success: boolean,
  win: Window = window.parent,
) {
  const message: WidgetMessage = {
    type: "response-callback",
    success,
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
export async function onChallengeError(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "error-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}
