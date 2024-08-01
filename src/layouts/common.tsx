import pkg from 'animate-css-grid';
const {wrapGrid} = pkg;

// @ts-ignore
globalThis.wrapGrid = wrapGrid;
// add to window if present
if (typeof window !== "undefined") {
  // @ts-ignore
  window.wrapGrid = wrapGrid;
}

export { wrapGrid };
