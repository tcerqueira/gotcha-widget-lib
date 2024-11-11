# gotcha-widget-lib - Captcha Challenge Integration Library

A lightweight TypeScript library for integrating custom captcha challenges into web applications. This library provides a communication bridge between your challenge implementation and the captcha widget system.

## Installation

Add dependency in `package.json`
```json
"dependencies": {
  "@gotcha-widget/lib": "github:tcerqueira/gotcha-widget-lib#master"
}
```

## Usage

The library exposes several functions and types to handle captcha challenge responses and events.

### Basic Usage

The challenge implementation can be hosted anywhere only. The challenge is defined as a URL, width and height.
The Gotcha implementation will render your challenge inside an `iframe` by your given URL.
The `src` attribute of the `iframe` will look something like this

`https://your-challenge.com/tik-tak-toe.html?secret=website_api_secret`

The `secret` query param will be required so you can communicate with the gotcha server.

```typescript
import { onChallengeResponse, onChallengeExpired, onError } from '@gotcha-widget/lib';

// Call this when challenge is completed successfully. The secret from the URL is passed here
await onChallengeResponse('https://origin-of-gotcha.com', 'api-secret', true);

// When challenge expires
await onChallengeExpired();

// When an error occurs
await onError();
```
