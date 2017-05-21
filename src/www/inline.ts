//

import "./base.scss";

const fistScriptEl = document.getElementsByTagName("script")[0];
const webfontScriptEl = document.createElement("script");
webfontScriptEl.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
webfontScriptEl.type = "text/javascript";
webfontScriptEl.async = true;

document.addEventListener("DOMContentLoaded", function launchLongExecution() {
  fistScriptEl.parentNode.insertBefore(webfontScriptEl, fistScriptEl);
});
