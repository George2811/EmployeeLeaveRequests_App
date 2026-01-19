# Frontend (Employee Leave Requests App)

Aplicación web para que empleados creen solicitudes de vacaciones y managers las gestionen.

🧱 Stack Tecnológico

- React 19
- Vite
- TypeScript
- Material UI
- Vitest + Testing Library
- Docker

## Instrucciones para el Setup
⚙️ Requisitos
- Node.js ≥ 19
- npm / pnpm
- Docker (opcional)
- Clonar repositorio

### 1. Instalar dependencias:

Ejecutar en la consola (cmd, powershell, etc.) el siguiente comando:

**npm install**

### 2. Crear el archivo de variables de entorno (.env)

Crear el archivo a la altura de carpetas como "node_modules" o "src"; y colocar las siguiente variables:

**VITE_API_URL = https://localhost:44347/api**

### 3. Ejecutar la aplicación:

Ejecutar en la consola (cmd, powershell, etc.) el siguiente comando:

**npm run dev**

## Decisiones de Diseño
### 1. Enfoque Clean Architecture
Se decidió utilizar este enfoque ya que evidencia una estructura dividida en capas. Ello es muy útil para velar por el desacoplamiento, ya que cada capa tiene un prósito como api, auth, components, pages, router.

### 2. Diseño Responsive con Material UI (MUI)
Se utilizó Material UI como librería de componentes para asegurar un diseño moderno, consistente y responsive. De esta forma mejoramos la experiencia de usuario (UX).

### 3. Autenticación mediante JWT
Existe una pequeña capa de seguridad al implementar la autenticación mediante JWT a los usuarios. El token se envía en cada request para garantizar al backend el usuario que está realizando el request.

### 4. Pruebas Unitarias
Se implementaron pruebas unitarias utilizando Vitest, aprovechando su integración nativa con Vite. Esto incrementa la confiabilidad de la app y previene regresiones.

### 5. Buenas prácticas
- **Validaciones del formulario**: La app incluye validaciones en el frontend para evitar solicitudes inválidas y mejorar la experiencia de usuario.
- **Manejo de errores**: En caso existan errores provenientes del backend se comunican mediante alertas al usuario.
- **Uso de variables de entorno**: La data sensible es recomendable extraerla del código y aprovechar recursos como las varibales de entorno (.env). Además, ello permite mayor personalización en los distintos ambientes y despliegues (pre-producción, producción, etc.)


## Oportunidades de mejora
La app posee buenas bases como software escalable, no obstante; existen algunas oportunidades de mejora que serian muy beneficiosas en entornos de producción:
- **Manejo de estado**: Mantener una única fuente de la verdad es vital para la coherencia de la información presentada. Por ello la importancia de liberías como Zustand o Redux para la gestión del estado global.

- **Mejora de performance**: Técnicas como lazy loading o memorización serían muy utiles para la mejora del rendimiento de la app, brindando así una mejor experiencia de usuario (UX).

- **Pruebas para el formulario**: Añadir más pruebas unitarias para los distintos comportamientos esperados del formulario, así como las validaciones.