export default (window) => {
  const document = window.document;
  const table_body = document.getElementById("measuremet_data");
  const listeners = [];

  const listen = (l) => listeners.push(l);

  const addMeasurement = (m) => {
    const tr = table_body.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(m.type));
    tr.insertCell().appendChild(document.createTextNode(m.time));
    tr.insertCell().appendChild(document.createTextNode(m.place));
    tr.insertCell().appendChild(document.createTextNode(m.value));
    tr.insertCell().appendChild(document.createTextNode(m.unit));
  };

  const displayError = (e) => {
    const msg_board = document.getElementById("error messages");
    msg_board.innerText = e;
  };

  const prompt = window.prompt.bind(window);

  return { addMeasurement, listen, prompt, displayError };
};
