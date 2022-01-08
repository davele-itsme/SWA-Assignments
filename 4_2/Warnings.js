export let warnings = [];

export const addWarning = (warning) => {
  warnings.push(warning);

  let severity = document.getElementById("sev").value;

  if (warning.severity >= severity) {
    const li = document.createElement("li");
    li.setAttribute("id", `${warning.id}`);
    li.innerText =
      `Severity: ${warning.severity} ` + JSON.stringify(warning.prediction);
    document.querySelector("#warnings").appendChild(li);
  }
};

export const updateWarning = (warning) => {
  let exists = false;
  warnings.forEach((element, index) => {
    if (element.id === warning.id) {
      exists = true;
      warnings[index] = warning;
      replaceDocument(warning);
    }
  });

  if (!exists) {
    addWarning(warning);
  }
};

export const resetWarnings = () => {
  warnings = [];
};

const replaceDocument = (warning) => {
  let severity = document.getElementById("sev").value;
  if (warning.severity >= severity) {
    if (document.getElementById(warning.id)) {
      //If <li> exists, it should be replaced with new information
      document.getElementById(warning.id).innerText =
        `Severity: ${warning.severity} ` + JSON.stringify(warning.prediction);
    } else {
      //Create a new <li> warning
      addWarning(warning);
    }
  }
};
