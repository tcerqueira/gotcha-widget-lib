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

export let params: SearchParams | null = null;
export const interactions: Interaction[] = [];

export async function setup() {
  if (interactions.length > 0) return;
  params = extractSearchParams(window.location.search);

  document.addEventListener("mousemove", (evt: MouseEvent) => {
    interactions.push({
      ts: Date.now(),
      event: {
        kind: "mousemovement",
        x: evt.offsetX,
        y: evt.offsetY,
      },
    });
  });

  document.addEventListener("mouseup", (evt: MouseEvent) => {
    interactions.push({
      ts: Date.now(),
      event: {
        kind: "mouseclick",
        mouse: "up",
      },
    });
  });

  document.addEventListener("mousedown", (evt: MouseEvent) => {
    interactions.push({
      ts: Date.now(),
      event: {
        kind: "mouseclick",
        mouse: "down",
      },
    });
  });

  document.addEventListener("mouseenter", (evt: MouseEvent) => {
    interactions.push({
      ts: Date.now(),
      event: {
        kind: "mouseenter",
        mouse: "in",
      },
    });
  });

  document.addEventListener("mouseleave", (evt: MouseEvent) => {
    interactions.push({
      ts: Date.now(),
      event: {
        kind: "mouseenter",
        mouse: "out",
      },
    });
  });

  document.addEventListener("keyup", (evt: KeyboardEvent) => {
    interactions.push({
      ts: Date.now(),
      event: {
        kind: "keypress",
        keyMove: "up",
        key: evt.key,
      },
    });
  });

  document.addEventListener("keydown", (evt: KeyboardEvent) => {
    interactions.push({
      ts: Date.now(),
      event: {
        kind: "keypress",
        keyMove: "down",
        key: evt.key,
      },
    });
  });
}
