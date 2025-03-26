import { setup, onChallengeResponse, onChallengeError } from "./lib";

// Export everything as a global object
declare global {
  interface Window {
    GotchaWidgetLib: {
      setup: typeof setup;
      onChallengeResponse: typeof onChallengeResponse;
      onChallengeError: typeof onChallengeError;
    };
  }
}

window.GotchaWidgetLib = {
  setup,
  onChallengeResponse,
  onChallengeError,
};
