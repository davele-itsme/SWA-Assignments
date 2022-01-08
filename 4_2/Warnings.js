export let messages = [];

export function Warnings() {
  let initBol = true;

  const retrieveData = (message) => {
    let data = JSON.parse(message.data);

    console.log("HEYY");

    if (initBol) {
      initData(data);
    } else {
      let element = document.getElementById(`${data.id}`);

      if (element === null) {
        addWarning(data);
      } else {
        updateWarning(element, data);
      }
    }
    console.log("HYE");
  };

  const initData = (data) => {
    console.log("YOOooo");
    console.log(data);
    data.warnings.forEach((warning) => {
      addWarning(warning);
    });
    initBol = false;
  };

  const addWarning = (text) => {
    console.log(text);
    messages.push(text);

    let severity = document.getElementById("fname");

    if (text.severity >= severity) {
      const li = document.createElement("li");
      li.setAttribute("id", `${text.id}`);
      li.innerText = JSON.stringify(text);
      document.querySelector("#warnings").appendChild(li);
    }
  };

  const updateWarning = (element, newData) => {
    messages.push(newData);

    let severity = document.getElementById("fname").value;
    console.log(newData.severity + "sev" + severity);
    if (newData.severity >= severity) {
      const a = document.createElement("a");
      a.innerText = JSON.stringify(newData);
      element.appendChild(a);
    }
  };

  return {
    retrieveData,
    addWarning,
  };
}
