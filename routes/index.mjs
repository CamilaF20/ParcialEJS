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

router.get("/", (req, res) => {
  const registros = leerJSON(registrosPath);
  res.render("index", { registros });
});

router.get("/nuevo", (req, res) => {
  const departments = leerJSON(departmentsPath);  
  res.render("add-record", { departments });      
});


router.post("/guardar", (req, res) => {
  const { fecha, departamento, municipio } = req.body;
  const registros = leerJSON(registrosPath);

  registros.push({ fecha, departamento, municipio });
  guardarJSON(registrosPath, registros);

  res.redirect("/");
});

router.get("/municipios/:departamento", (req, res) => {
  const { departamento } = req.params;
  const towns = leerJSON(townsPath);

  const municipios = towns
    .filter(t => t.department === departamento)   
    .map(t => ({ code: t.code, name: t.name }));

  res.json(municipios);
});


export default router;
