import { importShared } from './__federation_fn_import-Dl1rSZ_s.js';
import ChatApp, { j as jsxRuntimeExports } from './__federation_expose_App-B06RqucU.js';
import { r as reactDomExports } from './index-Q4xVpOTH.js';

var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}

const {StrictMode} = await importShared('react');
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChatApp, {}) })
  );
}
