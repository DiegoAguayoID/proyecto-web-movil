<<<<<<< HEAD
# Huellas Seguras 🐾 by Diego Aguayo, Joaquin Diaz y Javier Viera
=======
# Huellas Seguras 🐾
>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f

**Huellas Seguras** es una plataforma integral diseñada para abordar la problemática de la tenencia irresponsable y la proliferación de animales callejeros en zonas urbanas. 
A través de una arquitectura Full-Stack, la aplicación conecta a la ciudadanía con la gestión municipal para mejorar el bienestar animal y la salud pública.

---

## 1.1.1 Requerimientos Funcionales

El sistema se basa en la interacción de dos roles principales: **Usuario (Ciudadano)** y **Administrador (Gestión Municipal)**. Las funcionalidades clave son:

| ID | Requerimiento | Descripción | Rol |
| :--- | :--- | :--- | :--- |
| **RF01** | **Reportar animales** | Registro de animales abandonados incluyendo fotografía descriptiva y ubicación exacta vía GPS. | Usuario |
| **RF02** | **Sistema de adopción** | Catálogo interactivo para encontrar y postular a la adopción de animales rescatados disponibles. | Usuario |
| **RF03** | **Mapa interactivo** | Visualización dinámica de zonas críticas con mayor presencia de animales para facilitar la gestión territorial. | Usuario / Admin |
| **RF04** | **Solicitar rescate** | Canal directo para pedir asistencia a organizaciones de rescate o departamentos municipales especializados. | Usuario |
| **RF05** | **Seguimiento de casos** | Módulo para revisar en tiempo real el estado y los avances de los reportes realizados por el usuario. | Usuario |
| **RF06** | **Perfil de usuario** | Centro de gestión personal donde el usuario administra sus reportes activos, historial y solicitudes de adopción. | General |
| **RF07** | **Solicitud de Esterilización/Chip** | Reserva de turnos para operativos de esterilización o implantación de microchips. | Usuario |


## 1.1.2 Requerimientos NO Funcionales

Para asegurar un software robusto, profesional y eficiente, el sistema cumple con los siguientes estándares:

| ID | Requerimiento | Descripción | Rol |
| :--- | :--- | :--- | :--- |
| **RNF01** | **Seguridad** | Las contraseñas se almacenan en la base de datos PostgreSQL utilizando el algoritmo de hashing **bcrypt**. | Usuario |
| **RNF02** | **Rendimiento** | Consultas optimizadas en PostgreSQL para manejar múltiples reportes georreferenciados simultáneos sin degradar la experiencia de usuario. | Admin |
| **RNF03** | **Usabilidad** | Uso de iconografía clara y flujos de navegación de máximo 3 clics para realizar acciones críticas (como reportar un animal). | Usuario |


<<<<<<< HEAD
=======
### MOCKUPS LINK: https://www.figma.com/design/GaEgGUzTRm7K1F9DxsfeYn/Mockup-Plugin-%E2%80%93-Devices-Mockups--Print-Mockups--Branding-Mockups--Comunidad-?node-id=0-1&t=UNSscuerdPEnrDhV-1


>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
## 1.2 Justificación del Problema y Análisis del Usuario Objetivo

#### Justificación del Problema
La presencia masiva de animales (perros y gatos) en la vía pública no es solo un problema de bienestar animal, sino una crisis de salud pública y ambiental. La falta de control genera:
* **Riesgos Sanitarios:** Proliferación de zoonosis (enfermedades transmitidas de animales a humanos) y parásitos.
* **Seguridad Ciudadana:** Incidentes de mordeduras y accidentes de tránsito.
* **Gestión Insuficiente:** Los municipios suelen carecer de datos en tiempo real para actuar de forma preventiva, limitándose a respuestas reactivas.

**Huellas Seguras** soluciona esto digitalizando el reporte ciudadano y optimizando la respuesta administrativa mediante datos georreferenciados.



#### Análisis del Usuario Objetivo
El proyecto define dos perfiles de usuario con necesidades distintas:

1.  **Usuario General (Ciudadano):**
    * **Perfil:** Personas residentes de la comuna preocupadas por el bienestar animal o dueños de mascotas que buscan servicios municipales.
    * **Necesidad:** Una herramienta fácil de usar desde el móvil para reportar situaciones de riesgo o acceder a beneficios (chips/esterilización) de forma rápida.

2.  **Administrador (Gestión Municipal/Salud):**
    * **Perfil:** Funcionarios del departamento de higiene ambiental o veterinaria municipal.
    * **Necesidad:** Un panel de control centralizado para visualizar la densidad de animales callejeros, gestionar recursos para operativos y validar que las adopciones cumplan con la normativa legal.

---

## 1.4 Arquitectura de Navegación y Experiencia del Usuario

### 1.4.1 Estructura de Rutas y Roles (a, d)
La aplicación utiliza un sistema de rutas protegidas basado en el rol del usuario autenticado:

| Path | Funcionalidad | Acceso |
| :--- | :--- | :--- |
| `/login` | Acceso al sistema | Público |
| `/home` | Dashboard de módulos | Privado (Todos) |
| `/report` | Formulario de reporte GPS/Foto | Privado (Usuario) |
| `/admin/manage` | Validación de casos de rescate | Privado (**Admin**) |
| `/admin/heatmap` | Análisis de zonas críticas | Privado (**Admin**) |

### 1.4.2 Jerarquía de Vistas y Flujo (b, c)
Se implementó un patrón **Hub & Spoke**:
1.  **Nivel Central (Home):** Un panel de control con 6 tarjetas visuales que representan los módulos principales.
2.  **Nivel de Acción:** Pantallas específicas para cada tarea. Al finalizar cualquier flujo (ej. enviar reporte), el sistema retorna automáticamente al "Hub" principal para mantener la orientación del usuario.

### 1.4.3 Flujo de Tarea Principal: Reporte de Animal (e)
1.  **Selección:** El usuario pulsa "Reportar animales" en el Home.
2.  **Captura:** Se activa la cámara y el sensor GPS del dispositivo.
3.  **Registro:** El usuario completa datos mínimos (estado del animal, tipo).
4.  **Sincronización:** El backend (Node.js) procesa la solicitud y la guarda en PostgreSQL.
5.  **Confirmación:** Alerta visual de éxito y redirección a "Seguimiento de casos".

### 1.4.4 Puntos Críticos y Coherencia (f, g)
* **Interacción Crítica:** Gestión de permisos de Cámara/GPS. Se implementaron diálogos informativos para asegurar que el usuario entienda por qué son necesarios.
* **Coherencia Multidispositivo:** Gracias a Ionic, los componentes se adaptan automáticamente: en **iOS** muestran transiciones laterales suaves, en **Android** transiciones hacia arriba, y en **Desktop** el grid de módulos se expande de 2 a 4 columnas para optimizar el espacio.

### 1.4.5 Justificación Técnica (h)
La arquitectura se basa en **Cards Visuales** para maximizar la usabilidad en exteriores (botones grandes para uso con una sola mano). Se utiliza `React Router` para una navegación instantánea (SPA), lo que garantiza **escalabilidad** (añadir nuevos módulos sin romper la estructura actual) y **claridad estructural** para el usuario final.

---

## 2. Stack Tecnológico

* **Frontend:** Ionic Framework con React.
* **Backend:** Node.js con Express.
* **Base de Datos:** PostgreSQL.
* **Control de Versiones:** Git & GitHub.

---

## 3. Instalación y Configuración

### Requisitos previos
* Node.js (v18 o superior)
* PostgreSQL instalado localmente o en la nube.

### Configuración del Backend
1. Entrar a la carpeta `server`.
2. Ejecutar `npm install`.
3. Configurar las variables de entorno en un archivo `.env`.
4. Iniciar con `node index.js`.

### Configuración del Frontend
1. Entrar a la carpeta raíz.
2. Ejecutar `npm install`.
3. Iniciar la aplicación con `ionic serve`.
<<<<<<< HEAD
=======



>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
