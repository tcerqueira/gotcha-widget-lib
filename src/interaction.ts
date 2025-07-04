import { extractSearchParams, type SearchParams } from "./params";

export type Interaction = {
  ts: EpochTimeStamp;
  event: MouseMovementEvent | MouseClickEvent | MouseEnterEvent | KeyEvent;
};

type MouseMovementEvent = {
  kind: "mousemovement";
  x: number;
  y: number;
};

type MouseClickEvent = {
  kind: "mouseclick";
  mouse: "up" | "down";
};

type MouseEnterEvent = {
  kind: "mouseenter";
  mouse: "in" | "out";
};

type KeyEvent = {
  kind: "keypress";
  keyMove: "up" | "down";
  key: string;
};

export const interactions: Interaction[] = [];

export function captureInteractions(interactions: Interaction[]): () => void {
  const handlers = {
    mousemove: (evt: MouseEvent) => {
      interactions.push({
        ts: Date.now(),
        event: {
          kind: "mousemovement",
          x: evt.offsetX,
          y: evt.offsetY,
        },
      });
    },
    mouseup: (evt: MouseEvent) => {
      interactions.push({
        ts: Date.now(),
        event: {
          kind: "mouseclick",
          mouse: "up",
        },
      });
    },
    mousedown: (evt: MouseEvent) => {
      interactions.push({
        ts: Date.now(),
        event: {
          kind: "mouseclick",
          mouse: "down",
        },
      });
    },
    mouseenter: (evt: MouseEvent) => {
      interactions.push({
        ts: Date.now(),
        event: {
          kind: "mouseenter",
          mouse: "in",
        },
      });
    },
    mouseleave: (evt: MouseEvent) => {
      interactions.push({
        ts: Date.now(),
        event: {
          kind: "mouseenter",
          mouse: "out",
        },
      });
    },
    keyup: (evt: KeyboardEvent) => {
      interactions.push({
        ts: Date.now(),
        event: {
          kind: "keypress",
          keyMove: "up",
          key: evt.key,
        },
      });
    },
    keydown: (evt: KeyboardEvent) => {
      interactions.push({
        ts: Date.now(),
        event: {
          kind: "keypress",
          keyMove: "down",
          key: evt.key,
        },
      });
    },
  };

  Object.entries(handlers).forEach(([event, handler]) => {
    document.addEventListener(
      event as keyof DocumentEventMap,
      handler as EventListener,
    );
  });

  return () => {
    Object.entries(handlers).forEach(([event, handler]) => {
      document.removeEventListener(
        event as keyof DocumentEventMap,
        handler as EventListener,
      );
    });
  };
}
