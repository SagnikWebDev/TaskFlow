export function ArgumentErrorHandling(msg, variable) {
  if (!variable) {
    if (!msg) throw new Error("Invalid Argument On Method!");
    throw new Error(msg);
  }
}

export function displayElement(action, element) {
  if (action == "hide") {
    element.style.display = "none";
    element.setAttribute("id", "hide");
  }
  if (action == "unhide") {
    element.style.display = "flex";
    element.setAttribute("id", "unhide");
  }
}
