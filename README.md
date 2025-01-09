# 📄 Invoice Manager

¡Bienvenido a **Invoice Manager**! 🎉 Una aplicación web diseñada para gestionar usuarios, permisos y facturas de manera sencilla y eficiente.

---

## 🚀 Funcionalidades principales

### 🔐 Autenticación
- Inicio de sesión y cierre de sesión seguro con tokens (Laravel Sanctum).
- Mantenimiento de sesión autenticada utilizando `localStorage`.
- Protección de rutas mediante permisos específicos (Spatie).

### 🧑‍🤝‍🧑 Gestión de usuarios
- **🔎 Ver usuarios:** Lista de usuarios registrados.
- **➕ Crear usuarios:** Agrega nuevos usuarios asignándoles permisos específicos.
- **🔄 Asignar permisos:** Gestiona dinámicamente los permisos de cada usuario.
- **🗑️ Eliminar usuarios:** Elimina usuarios de manera permanente.

### 📋 Gestión de permisos
- **🔎 Ver permisos:** Consulta los permisos existentes.
- **➕ Crear permisos:** Agrega nuevos permisos personalizados.
- **🔄 Asignar permisos a usuarios.**

### 🧾 Gestión de facturas
- **📂 Subir facturas:** Permite cargar archivos XML para registrar facturas en el sistema.
- **📄 Ver facturas:** Consulta una lista detallada de todas las facturas registradas.
- **🗑️ Eliminar facturas:** Elimina facturas de manera permanente.

### 📊 Dashboard
Un **dashboard visual e interactivo** con:
- **📊 Gráficos:**
  - Usuarios con permisos vs. usuarios sin permisos.
  - Ingresos totales vs. promedio por factura.
- **📋 Estadísticas clave:**
  - Usuarios totales.
  - Usuarios con permisos.
  - Usuarios sin permisos.
  - Facturas totales.

---

## 🛠️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Composer** (v2.0 o superior) 
- **Laravel** (v11 o superior) 🌐
- **NPM** (v8 o superior) 📦
- **Gestor de BD:** Asegúrate de tener configurado y en ejecución el servicio de base de datos para importar la BD.

---

## 🖥️ Configuración y ejecución del proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/GCesenas/invoiceManager.git
cd invoiceManager
```
### 2️⃣ Instalar dependencias
```bash
composer install
npm install
```
### 3️⃣ Configurar variables de entorno y base de datos
Únicamente crea una base de datos con el nombre "invoicemanager", importa o ejecuta las migraciones con `php artisan migrate` y copia lo que contiene .env.example

### 4️⃣ Ejecutar el proyecto
Ejecuta el proyecto back end:
```bash
php artisan serve
```
Y el frontend:
```bash
npm start
```
El proyecto estará disponible en http://localhost:3000 🚀

## 🛠️ Tecnologías utilizadas

- React ⚛️ - Framework de interfaz de usuario.
- React Router 🛣️ - Navegación entre páginas y rutas protegidas.
- Chart.js 📊 - Visualización de datos mediante gráficos.
- SweetAlert2 🍬 - Notificaciones y alertas estilizadas.
- Tailwind CSS 🎨 - Diseño y estilización.
- Axios 🌐 - Realización de solicitudes HTTP.
- Laravel 🔴 - Framework PHP de lado del servidor.
- Y otras librerías de composer que integran el framework y hacen posible que todo funcione (Sanctum, Spatie, etc.) :)

## 🛡️ Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más información.

## 💬 Contacto
Si tienes alguna duda o sugerencia, ¡no dudes en contactarme! 📩

🔗 LinkedIn: linkedin.com/in/gcesenas