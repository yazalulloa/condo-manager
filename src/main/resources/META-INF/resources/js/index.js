import {
  Carousel,
  Datepicker,
  initTE,
  Input,
  Ripple,
  Select,
  Sidenav,
  Timepicker,
  Validation,
} from "tw-elements";

import './loader.js';
import './sse.js';

import _hyperscript from 'hyperscript.org';
import './elements.js';

_hyperscript.browserInit();

window.initComponents = function () {
  // console.log("INIT TW-ELEMENTS")
  initTE({
        Carousel,
        Datepicker,
        Input,
        Ripple,
        Select,
        Sidenav,
        Timepicker,
        Validation,
      },
      {allowReinits: true}, true); // set second parameter to true if you want to use a debugger

  let forms = document.getElementsByTagName('form');
  // console.log("forms: {}", forms.length);
  for (let i = 0; i < forms.length; i++) {
    let form = forms[i];
    let validation = new Validation(form);
    form.addEventListener("dispose-validation", evt => {
      evt.preventDefault();
      // console.log("disposing validation");
      validation.dispose();
      validation.init();
    });
  }
}

initComponents();

htmx.config.useTemplateFragments = true;
// htmx.logAll();

window.onload = function () {
  const inputs = document.getElementsByTagName('input');
  // console.log("inputs: {}", inputs.length);
  for (let i = 0; i < inputs.length; i++) {
    // console.log("input type: {}", inputs[i].type);
    if (inputs[i].type === 'search') {
      // console.log("setting trim")
      inputs[i].onchange = function () {
        let value = this.value;
        // console.log("trimming {}", value);
        this.value = this.value.replace(/^\s+/, '').replace(/\s+$/, '').trim();
        let val2 = this.value;
        // console.log("trimmed {}", val2);
      };
    }
  }

  addDisableEventToButtons();
}

document.body.addEventListener("htmx:afterProcessNode", function (configEvent) {
  initComponents();
  addDisableEventToButtons();
  disableBtnInsideForm();

  let selectElem = document.getElementsByTagName("select");
  for (let i = 0; i < selectElem.length; i++) {
    let select = selectElem[i];
    if (select.hasAttribute("data-te-select-init")) {
      const instance = Select.getInstance(select);
      select.addEventListener("clear-value-cm", function (evt) {
        evt.preventDefault();
        instance.setValue([]);
      });
    }

  }

})

window.addDisableEventToButtons = function () {
  const buttons = document.getElementsByTagName('button');

  for (let i = 0; i < buttons.length; i++) {
    disableButton(buttons[i]);
  }
}

function disableButton(button) {
  if (!button) {
    throw new Error("form without button");
  }

  disableOnHtmxEvents(button, button);
}

function disableOnHtmxEvents(eventElement, btn) {
  btn.removeAttribute("disabled");
  eventElement.addEventListener("htmx:beforeRequest", function () {
    btn.toggleAttribute("disabled", true);
  })

  eventElement.addEventListener("htmx:afterRequest", function () {
    btn.toggleAttribute("disabled", false);
  })

  eventElement.addEventListener("htmx:beforeSwap", function () {
    btn.toggleAttribute("disabled", true);
  })

}

window.disableBtnInsideForm = function () {
  const forms = document.getElementsByTagName('form');
  for (let i = 0; i < forms.length; i++) {
    const form = forms[i];
    const buttons = form.getElementsByTagName('button');
    for (let j = 0; j < buttons.length; j++) {
      const button = buttons[j];
      disableOnHtmxEvents(form, button);
    }
  }
}

window.getLastUrlSegmentCurrent = function () {
  return getLastUrlSegment(window.location.href);
}

window.getQueryParam = function (name) {
  let params = (new URL(document.location)).searchParams;
  return params.get(name);
}

window.limitInputToMaxLength = function (input) {
  input.value = input.value.trim();
  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0,
        input.maxLength);
  }
}

function getLastUrlSegment(url) {
  return new URL(url).pathname.split('/').filter(Boolean).pop();
}

window.redirectTo = function (url) {
  window.location.href = '.' + url;
}

window.initNav = function () {
  let lastUrlSegmentCurrent = getLastUrlSegmentCurrent();

  if (!lastUrlSegmentCurrent || lastUrlSegmentCurrent === ''
      || lastUrlSegmentCurrent === 'index.html'
      || lastUrlSegmentCurrent === 'index'
      || lastUrlSegmentCurrent === '/') {
    let item = localStorage.getItem("current-nav");
    //console.log("current-nav: {}", item);
    if (item) {
      let elem = document.getElementById(item);
      elem?.dispatchEvent(new Event('navigate'));
      return;
    }
    let navbar = document.getElementsByClassName("navbar-start");
    if (navbar.length > 0) {
      let nav = navbar[0];
      let anchors = nav.getElementsByTagName("a");
      if (anchors.length > 0) {
        let anchor = anchors[0];
        localStorage.setItem("current-nav", anchor.id);
        anchor.dispatchEvent(new Event('navigate'));
      }
    }

  }
}

window.saveNavState = function (anchor) {
  //console.log("saving nav state {}", anchor.id);
  localStorage.setItem("current-nav", anchor.id);
}

window.saveToLocalStorage = function (key, value) {
  localStorage.setItem(key, value);
}

window.getFromLocalStorage = function (key) {
  return localStorage.getItem(key);
}

function trimInput(el) {
  // console.log("trimming {}", el.value)
  el.value = el.value.trim();
  // console.log("trimmed {} | ", el.value)
}

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=')
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
}

// document.body.addEventListener("htmx:configRequest", function (configEvent) {
//
//   let token = getCookie('XSRF-TOKEN');
//   if (token != null) {
//     configEvent.detail.headers['X-XSRF-TOKEN'] = token;
//   }
//
// })

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

let datePicker = document.querySelector("#datepicker-translated");
if (datePicker) {
  const datepickerTranslated = new Datepicker(
      datePicker,
      {
        title: "Seleccione una fecha",
        monthsFull: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        monthsShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        weekdaysFull: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysNarrow: ["D", "L", "M", "M", "J", "V", "S"],
        okBtnText: "Ok",
        clearBtnText: "Borrar",
        cancelBtnText: "Cancelar",
      }
  );
}

document
.getElementById("slim-toggler")
?.addEventListener("click", () => {
  const instance = Sidenav.getInstance(
      document.getElementById("sidenav-4")
  );
  instance.toggleSlim();
});

const sidenav2 = document.getElementById("sidenav-1");
if (sidenav2) {
  const sidenavInstance2 = Sidenav.getInstance(sidenav2);
  let innerWidth2 = null;
  const setMode2 = (e) => {
    // Check necessary for Android devices
    if (window.innerWidth === innerWidth2) {
      return;
    }

    innerWidth2 = window.innerWidth;

    if (window.innerWidth < sidenavInstance2.getBreakpoint("xl")) {
      sidenavInstance2.changeMode("over");
      sidenavInstance2.hide();
    } else {
      sidenavInstance2.changeMode("side");
      sidenavInstance2.show();
    }
  };

  if (window.innerWidth < sidenavInstance2.getBreakpoint("sm")) {
    setMode2();
  }

  // Event listeners
  window.addEventListener("resize", setMode2);

}