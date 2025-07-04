import { setup, onChallengeResponse, onChallengeError, getParams } from "./lib";

// Export everything as a global object
declare global {
  interface Window {
    GotchaWidgetLib: {
      setup: typeof setup;
      onChallengeResponse: typeof onChallengeResponse;
      onChallengeError: typeof onChallengeError;
      getParams: typeof getParams;
    };
  }
}

window.GotchaWidgetLib = {
  setup,
  onChallengeResponse,
  onChallengeError,
  getParams,
};
