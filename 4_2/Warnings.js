export let warnings = [];

export const addWarning = (warning, htmlOnly = false) => {
  if (!htmlOnly) {
    warnings.push(warning);
  }

  let severity = document.getElementById("sev").value;

  if (warning.severity >= severity) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", warning.id);
    tr.innerHTML = `
    <tr>
       <td>${warning.severity}</td>
       <td>${warning.prediction.type}</td>
       <td>${warning.prediction.place}</td>
       <td>${warning.prediction.from}</td>
       <td>${warning.prediction.to}</td>
       <td>${warning.prediction.unit}</td>
    </tr>
    `;
    document.querySelector("#body").appendChild(tr);
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
      //If <tr> with the id exists, it should be replaced with new information
      document.getElementById(warning.id).innerHTML = `
         <td>${warning.severity}</td>
         <td>${warning.prediction.type}</td>
         <td>${warning.prediction.place}</td>
         <td>${warning.prediction.from}</td>
         <td>${warning.prediction.to}</td>
         <td>${warning.prediction.unit}</td>
      `;
    } else {
      //Create a new <tr> warning
      addWarning(warning);
    }
  }
};
