document.getElementById("departamento").addEventListener("change", async (e) => {
  const depto = e.target.value;

  const res = await fetch("/municipios/" + depto);
  const municipios = await res.json();

  const municipioSelect = document.getElementById("municipio");
  municipioSelect.innerHTML = "<option value=''>Seleccione</option>";

  municipios.forEach(m => {
    municipioSelect.innerHTML += `<option value="${m.code}">${m.name}</option>`;
  });
});
