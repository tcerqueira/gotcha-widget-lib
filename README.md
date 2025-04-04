# gotcha-widget-lib - Captcha Challenge Integration Library

A lightweight TypeScript library for integrating custom gotcha captcha challenges into web applications. This library provides a communication bridge between your challenge implementation and the captcha widget system.

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

```typescript
import { onChallengeResponse, onChallengeExpired, onChallengeError } from '@gotcha-widget/lib';

// Call it once in the start to setup the lib
// It'll capture events and metrics that will be appended to the request
await setup();

// Call this when challenge is completed
await onChallengeResponse(true); // successful challenge
// or
await onChallengeResponse(false); // failed challenge

// When an error occurs
await onChallengeError();
```
