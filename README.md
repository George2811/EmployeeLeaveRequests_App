# Frontend (Employee Leave Requests App)

## Contexto
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
Enfoque: Clean Architecture
Se decidió utilizar este enfoque ya que evidencia una estructura dividida en capas. Ello es muy útil para velar por la direccionalidad de dependencias, cada capa tiene un prósito (api, auth, components, pages, router).

Asimismo, gracias al uso de librerias como MUI, se ofrece una aplicación con Responsive Design.

Otros puntos claves que velan por el UX de la app, es el manejor de errores, validaciones en el formulario y mensaje de alertas muy informativos.

Por otro lado, data sensible es reomendable extraerla del código y aprovechar recursos como las varibales de entorno (.env).

Por último, existe una pequeña capa de seguridad al implementar la autenticación mediante JWT a los usuarios.

## Oportunidades de mejora
La app posee buenas bases como software escalable, no obstante; existen algunas oportunidades de mejora que serian muy beneficiosas en entornos de producción:
- Manejo de estado: Mantener una única fuente de la verdad es vital para la coherensia de la información presentada. Por ello la importancia de liberías como Zustand o Redux para la gestión del estado global.

- Mejora de performance: Técnicas como lazy loading o memorización serían muy utiles para la mejora del rendimiento de la app, brindando así un mejor UX.



