const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

function makeid(length) {
  let result = '';

  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const inputClasses = "z-[1] peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-150 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0";
const labelClasses = "z-[1] pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-150 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary";

class FormInput extends HTMLElement {

  input;
  formDiv;

  constructor() {
    super();

    let id = this.id ?? makeid(8);
    let placeholder = this.getAttribute("placeholder");

    // let classList = this.classList;
    // this.classList.split(" ").forEach((element) => classList.add(element));

    // this.attachShadow({mode: 'open'});

    const div = document.createElement('div');

    div.classList.add("relative");
    div.classList.add("mb-3");
    const input = document.createElement('input');
    input.id = id + "-input";
    input.type = this.getAttribute("type") ?? "text";
    input.placeholder = placeholder;
    input.name = this.getAttribute("name");
    input.value = this.getAttribute("value");
    input.maxLength = Number(this.getAttribute("maxlength"));
    input.max = this.getAttribute("max");
    input.min = this.getAttribute("min");
    input.step = this.getAttribute("step");
    input.disabled = this.getAttribute("disabled") != null;
    input.readOnly = this.getAttribute("readOnly") != null;



    if (input.maxLength) {
      input.oninput = () => this.onInput(input);
    }

    inputClasses.split(" ").forEach((element) => input.classList.add(element));

    const label = document.createElement( 'label');
    label.htmlFor = input.id;
    label.innerText = placeholder;
    labelClasses.split(" ").forEach((element) => label.classList.add(element));

    div.appendChild(input);
    div.appendChild(label);

    this.appendChild(div);
    div.setAttribute("data-te-input-wrapper-init", "");
    div.setAttribute("data-te-validate", "input");

    let inputError = this.getAttribute("input-error")?.trim();
    if (inputError && inputError.length > 0) {
      div.setAttribute("data-te-invalid-feedback", inputError);
      div.setAttribute("data-te-validation-state", "invalid");
      this.removeAttribute("input-error");
    }

    this.input = input;
    this.formDiv = div;
  }

  onInput(input) {
    limitInputToMaxLength(input);

    if (!(input.step)) {
      
    }
  }

  connectedCallback() {
    //console.log("Custom element added to page.");

    this.addEventListener("clear", evt => {
      //console.log("Clearing input");

      this.input.value = this.input.type === "number" ? this.input.min ? this.input.min : "0" : "";
      this.input.value = "";
      //console.log("Input value is now {}", this.input.value);
      this.formDiv.removeAttribute("data-te-invalid-feedback");
      this.formDiv.removeAttribute("data-te-validation-state");

    })
  }

  disconnectedCallback() {
    //console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    //console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    //console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("cm-form-input", FormInput);