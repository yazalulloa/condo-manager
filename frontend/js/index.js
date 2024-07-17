// import 'htmx.org';
//
// import './loader.js';


// import './sse.js';
// import './components.js';
// import './elements.js';
import Alpine from 'alpinejs'
import _hyperscript from 'hyperscript.org';

window.Alpine = Alpine
Alpine.start();

_hyperscript.browserInit();

window.initComponents = function () {

}

window.disableScrollWhenHover = function (element) {
  element.onmouseover = () => {
    document.body.classList.add('noYScroll')
  }
  element.onmouseout = () => {
    document.body.classList.remove('noYScroll')
  }

}

window.addEventListener("popstate", (event) => {

  // console.log("popstate event: ", event);
  window.location.reload();
});

initComponents();

// htmx.config.useTemplateFragments = true;
// htmx.logAll();

window.trimInput = function (input) {
  if (input && input.value) {
    // console.log("trimming {}", input.value);
    input.value = input.value.replace(/^\s+/, '').replace(/\s+$/, '').trim();
    // console.log("trimmed {}", input.value);
  }
}

window.isInputEmpty = function (input) {
  trimInput(input);
  // console.log("isInputEmpty: {}", input);
  return !input || !input.value || input.value === '';
}

window.getLastUrlSegmentCurrent = function () {
  return getLastUrlSegment(window.location.href) ?? "";
}

window.getQueryParam = function (name) {
  let params = (new URL(document.location)).searchParams;
  return params.get(name);
}

window.limitInputToMaxLength = function (input) {
  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0,
        input.maxLength);
  }
}

function getLastUrlSegment(url) {
  return new URL(url).pathname.split('/').filter(Boolean).pop();
}

window.getPathName = function () {
  return window.location.pathname;
}

window.redirectTo = function (url) {
  window.location.href = '.' + url;
}

window.initNav = function () {
  let pathname = window.location.pathname;
  // console.log("pathname: {}", pathname);
  if (pathname.length === 0) {

    let lastUrlSegmentCurrent = getLastUrlSegmentCurrent();

    if (!lastUrlSegmentCurrent || lastUrlSegmentCurrent === ''
        || lastUrlSegmentCurrent === 'index'
        || lastUrlSegmentCurrent === '/') {
      let item = localStorage.getItem("current-nav");
      //console.log("current-nav: {}", item);
      if (item) {
        let elem = document.getElementById(item);
        elem?.dispatchEvent(new CustomEvent('navigate'));
        return;
      }
      let navbar = document.getElementsByClassName("navbar-start");
      if (navbar.length > 0) {
        let nav = navbar[0];
        let anchors = nav.getElementsByTagName("a");
        if (anchors.length > 0) {
          let anchor = anchors[0];
          localStorage.setItem("current-nav", anchor.id);
          anchor.dispatchEvent(new CustomEvent('navigate'));
        }
      }

    }
  } else if (pathname === '/') {

    let lastUrlSegmentCurrent = getLastUrlSegmentCurrent();

    if (!lastUrlSegmentCurrent || lastUrlSegmentCurrent === ''
        || lastUrlSegmentCurrent === 'index'
        || lastUrlSegmentCurrent === '/') {
      let item = localStorage.getItem("current-nav");
      //console.log("current-nav: {}", item);
      if (item) {
        let elem = document.getElementById(item);
        elem?.dispatchEvent(new CustomEvent('navigate'));
        return;
      }
      let navbar = document.getElementsByClassName("navbar-start");
      if (navbar.length > 0) {
        let nav = navbar[0];
        let anchors = nav.getElementsByTagName("a");
        if (anchors.length > 0) {
          let anchor = anchors[0];
          localStorage.setItem("current-nav", anchor.id);
          anchor.dispatchEvent(new CustomEvent('navigate'));
        }
      }

    }
  } else {
    let element = document.getElementById("nav-helper");
    if (element) {
      element.dispatchEvent(new CustomEvent('navigate'));
    }
  }
}

window.saveNavState = function (anchor) {
  //console.log("saving nav state {}", anchor.id);
  localStorage.setItem("current-nav", anchor.id);
  modifyUrl(anchor);
}

window.modifyUrl = function (elem) {
  let pathname = elem.getAttribute("hx-get")
  .replaceAll("/stc", "");

  window.history.pushState(window.history.state, document.title, pathname);
  //window.history.pushState(window.history.state, document.title, pathname);
  //window.location.pathname = pathname;
}

window.removeStc = function (elem) {
  let href = window.location.href;
  let newHref = href.replaceAll("/stc", "");
  window.history.replaceState(window.history.state, document.title, newHref);
  //window.history.pushState(window.history.state, document.title, newHref);
}

window.saveToLocalStorage = function (key, value) {
  localStorage.setItem(key, value);
}

window.getFromLocalStorage = function (key) {
  return localStorage.getItem(key);
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

window.monthsToStr = function (months) {
  let str = "";
  for (let i = 0; i < months.length; i++) {
    let month = months[i];
    str += integerToMonth(month);
    if (i < months.length - 1) {
      str += ", ";
    }
  }
  return str;

}

window.integerToMonth = function (month) {

  if (!month) {
    return "N/A"
  }

  switch (month) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Abril";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Diciembre";
    default:
      return "N/A"
  }
}

window.openTab = function (evt, cityName) {

  let tabcontent = document.getElementsByClassName("tab-cm-content");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" btn-active", "");
  }
  document.getElementById(cityName).style.display = "block";

  if (evt) {
    evt.className += " btn-active";
  }
}

window.slideTo = function (id, direction) {
  let elem = document.getElementById(id);
  if (elem) {
    elem.scrollBy({
      left: direction === 'left' ? -500 : 500,
      behavior: 'smooth'
    });
  }
}

window.scrollDiv = function (elem) {
  elem.addEventListener("wheel", (event) => {
    elem.scrollBy({
      left: event.deltaY > 0 ? -400 : 400,
      behavior: 'smooth'
    });
  }, {
    passive: true
  });
}

window.validateEmail = function (value) {

  if (value) {
    if (value.length > 0) {
      let atIndex = value.indexOf("@");
      let dotIndex = value.indexOf(".");

      if (atIndex > 0 && dotIndex > atIndex && dotIndex < value.length - 1) {
        return true;
      }
    }
  }

  return false;
}

window.sendEvent = function (id, eventName) {
  let elem = document.getElementById(id);
  if (elem) {
    elem.dispatchEvent(new CustomEvent(eventName));
  }
}

window.saveResource = function (key, value) {
  saveToLocalStorage(key, value);
}

window.getResource = function (key, path) {
  let storageValue = getFromLocalStorage(key);
  let segmentValue = getLastUrlSegmentCurrent();
  localStorage.removeItem(key);

  let value = storageValue ?? segmentValue;

  if (storageValue && path) {
    let pathname = window.location.href + path + value;
    window.history.pushState(window.history.state, document.title, pathname);
  }

  return value;
}

