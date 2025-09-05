import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registrosPath = path.join(__dirname, "../resources/registros.json");
const departmentsPath = path.join(__dirname, "../resources/departments.json");
const townsPath = path.join(__dirname, "../resources/towns.json");

function leerJSON(ruta) {
  if (!fs.existsSync(ruta)) return [];
  return JSON.parse(fs.readFileSync(ruta, "utf8"));
}

function guardarJSON(ruta, data) {
  fs.writeFileSync(ruta, JSON.stringify(data, null, 2));
}

// Página principal
router.get("/", (req, res) => {
  const registros = leerJSON(registrosPath);
  res.render("index", { registros });
});

// Formulario
router.get("/nuevo", (req, res) => {
  const departamentos = leerJSON(departmentsPath);
  res.render("add-record", { departamentos });
});

// Guardar nuevo
router.post("/guardar", (req, res) => {
  const { fecha, departamento, municipio } = req.body;
  const registros = leerJSON(registrosPath);

  registros.push({ fecha, departamento, municipio });
  guardarJSON(registrosPath, registros);

  res.redirect("/");
});

// API municipios
router.get("/municipios/:departamento", (req, res) => {
  const { departamento } = req.params;
  const towns = leerJSON(townsPath);
  const municipios = towns.filter(t => t.deptCode === departamento).map(t => t.name);
  res.json(municipios);
});

export default router;
