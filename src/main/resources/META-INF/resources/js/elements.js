function printclass(value, key, parent) {
  console.log("class: {}", value)
}

class FormInput extends HTMLElement {
  constructor() {
    super();
    let classes = "peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-150 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0";
    let classList = this.classList;
    classes.split(" ")
    .forEach((element) => classList.add(element));
  }
}

customElements.define("cm-form-input", FormInput);