export function bounceElement(element) {
  element.style.animation = "none";
  // Trigga reflow, så att animationen körs på nytt
  element.offsetHeight;
  element.style.animation = "bounceIn 1s";
}
