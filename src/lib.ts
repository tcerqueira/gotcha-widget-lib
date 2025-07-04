import {
  interactions,
  type Interaction,
  captureInteractions,
} from "./interaction";
import {
  extractSearchParams,
  getSearchParams,
  type SearchParams,
} from "./params";

export { type Interaction } from "./interaction";
export { type SearchParams } from "./params";
/**
 * Message types for widget communication
 */
export type WidgetMessage =
  | { type: "response-callback"; success: boolean; interactions: Interaction[] }
  | { type: "error-callback" };

const DEFAULT_TARGET_ORIGIN = "*";

/**
 * Extracts search params and registers listeners for interaction events.
 * @return clean up function
 */
export async function setup(): Promise<() => void> {
  if (getSearchParams() !== null) return () => {};

  extractSearchParams(window.location.search);
  const cleanupFn = captureInteractions(interactions);
  return cleanupFn;
}

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
    interactions: interactions,
  };
  win.postMessage(message, getSearchParams()?.sv ?? DEFAULT_TARGET_ORIGIN);
}

/**
 * Handles error events in the challenge system
 * @param win - Target window (defaults to window.parent)
 */
export async function onChallengeError(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "error-callback",
  };
  win.postMessage(message, getSearchParams()?.sv ?? DEFAULT_TARGET_ORIGIN);
}

/**
 * Get params extracted by setup
 * @return params extracted
 */
export function getParams(): SearchParams {
  const params = getSearchParams();
  if (!params) {
    throw new Error(
      "Params not yet extracted. Call `setup` before retrieving params",
    );
  }
  return params;
}
