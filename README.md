# Huellas Seguras 🐾

**Huellas Seguras** es una plataforma integral diseñada para abordar la problemática de la tenencia irresponsable y la proliferación de animales callejeros en zonas urbanas. 
A través de una arquitectura Full-Stack, la aplicación conecta a la ciudadanía con la gestión municipal para mejorar el bienestar animal y la salud pública.

---

## 1.1 Requerimientos Funcionales

El sistema se basa en la interacción de dos roles principales: **Usuario (Ciudadano)** y **Administrador (Gestión Municipal)**. Las funcionalidades clave son:

| ID | Requerimiento | Descripción | Rol |
| :--- | :--- | :--- | :--- |
| **RF01** | **Reporte Georreferenciado** | Marcado en mapa de la ubicación exacta de animales callejeros con fotos y estado de salud. | Usuario |
| **RF02** | **Gestión de Casos de Zoonosis** | Registro y seguimiento de reportes de mordeduras o focos infecciosos con notificación a salud. | Admin |
| **RF03** | **Solicitud de Esterilización/Chip** | Reserva de turnos para operativos de esterilización o implantación de microchips. | Usuario |
| **RF04** | **Panel de Operativos** | Creación y control de campañas masivas de vacunación y desparasitación territorial. | Admin |
| **RF05** | **Módulo de Adopción** | Catálogo interactivo de animales rescatados con filtros de compatibilidad y edad. | Usuario |
| **RF06** | **Validación de Adopciones** | Revisión y gestión de formularios de postulación para asegurar hogares responsables. | Admin |
| **RF07** | **Mapa de Calor de Abandono** | Visualización de datos históricos para identificar zonas críticas y enfocar recursos. | Admin |

## 1.1 Requerimientos NO Funcionales

| ID | Requerimiento | Descripción | Rol |
| :--- | :--- | :--- | :--- |
| **RNF01** | **Seguridad** | ... | Usuario |
| **RNF02** | **Rendimiento** | ... | Admin |
| **RNF03** | **Usabilidad** | ... | Usuario |


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
