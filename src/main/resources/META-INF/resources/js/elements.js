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

const inputClasses = "peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-150 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0";
const labelClasses = "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-150 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary";

class FormInput extends HTMLElement {
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
    input.min = this.getAttribute("min");
    input.step = this.getAttribute("step");

    if (input.maxLength) {
      input.oninput = limitInputToMaxLength(input);
    }

    inputClasses.split(" ").forEach((element) => input.classList.add(element));

    const label = document.createElement('label');
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
      div.setAttribute("data-te-validation-state", "invalid")
      this.removeAttribute("input-error");
    }
  }
}

customElements.define("cm-form-input", FormInput);