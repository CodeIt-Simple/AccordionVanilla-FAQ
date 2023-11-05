class Accordion {
  constructor(element) {
    this.element = element;
    this.summary = element.querySelector("summary");
    this.content = element.querySelector(".answer");
    this.expandIcon = this.summary.querySelector(".expandIcon");
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener("click", (e) => this.handleClick(e));
  }

  handleClick(e) {
    e.preventDefault();
    this.element.style.overflow = "hidden";

    if (this.isClosing || !this.element.open) {
      this.open();
    } else if (this.isExpanding || this.element.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;
    const startHeight = `${this.element.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    if (this.animation) {
      this.animation.cancel();
    }
    this.animation = this.element.animate(
      { height: [startHeight, endHeight] },
      { duration: 400, easing: "ease-out" }
    );

    this.animation.onfinish = () => {
      this.expandIcon.setAttribute("src", "./images/plus.svg");
      return this.onAnimationFinish(false);
    };
    this.animation.onCancel = () => {
      this.expandIcon.setAttribute("src", "./images/plus.svg");
      return (this.isClosing = false);
    };
  }

  open() {
    this.element.style.height = `${this.element.offsetHeight}px`;
    this.element.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand(){
    this.isExpanding = true;
    const startHeight = `${this.element.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    if (this.animation) {
      this.animation.cancel();
    }
    this.animation = this.element.animate(
      { height: [startHeight, endHeight] },
      { duration: 350, easing: "ease-out" }
    );
    this.animation.onfinish = () => {
      this.expandIcon.setAttribute("src", "./images/minus.svg");
      return this.onAnimationFinish(true);
    };
    this.animation.onCancel = () => {
      this.expandIcon.setAttribute("src", "./images/minus.svg");
      return (this.isExpanding = false);
    };
  }
  onAnimationFinish(open){
      this.element.open = open;
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.element.style.height = "";
      this.element.style.overflow = "";
  }

}
document.querySelectorAll("details").forEach((el) => new Accordion(el))
