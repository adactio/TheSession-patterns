!function(a,b){"use strict";function c(c){c=c||a.event,g=c.target||c.srcElement,g.hasAttribute("aria-controls")&&(d=g.getAttribute("aria-controls"),b.getElementById(d)&&(e=b.getElementById(d),"true"==e.getAttribute("aria-hidden")?(e.setAttribute("aria-hidden","false"),g.setAttribute("aria-expanded","true"),e.focus()):(e.setAttribute("aria-hidden","true"),g.setAttribute("aria-expanded","false"))))}if(b.querySelectorAll&&a.addEventListener){var d,e,f,g,h=b.querySelectorAll(".toggle button[aria-controls]"),i=h.length;for(f=0;i>f;f+=1)d=h[f].getAttribute("aria-controls"),b.getElementById(d)&&(e=b.getElementById(d),e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex","-1"),h[f].setAttribute("aria-expanded","false"));b.addEventListener("click",c,!1)}}(this,this.document);