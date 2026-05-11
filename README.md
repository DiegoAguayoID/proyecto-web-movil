# Huellas Seguras 🐾

**Huellas Seguras** es una plataforma integral diseñada para abordar la problemática de la tenencia irresponsable y la proliferación de animales callejeros en zonas urbanas. 
A través de una arquitectura Full-Stack, la aplicación conecta a la ciudadanía con la gestión municipal para mejorar el bienestar animal y la salud pública.

---

## 1.1 Requerimientos Funcionales

El sistema se basa en la interacción de dos roles principales: **Usuario (Ciudadano)** y **Administrador (Gestión Municipal)**. Las funcionalidades clave son:

| ID | Requerimiento | Descripción | Rol | Implementado?
| :--- | :--- | :--- | :--- |
| **RF01** | **Reportar animales** | Registro de animales abandonados incluyendo fotografía descriptiva y ubicación exacta vía GPS. | Usuario |
| **RF02** | **Sistema de adopción** | Catálogo interactivo para encontrar y postular a la adopción de animales rescatados disponibles. | Usuario |
| **RF03** | **Mapa interactivo** | Visualización dinámica de zonas críticas con mayor presencia de animales para facilitar la gestión territorial. | Usuario / Admin |
| **RF04** | **Solicitar rescate** | Canal directo para pedir asistencia a organizaciones de rescate o departamentos municipales especializados. | Usuario |
| **RF05** | **Seguimiento de casos** | Módulo para revisar en tiempo real el estado y los avances de los reportes realizados por el usuario. | Usuario |
| **RF06** | **Perfil de usuario** | Centro de gestión personal donde el usuario administra sus reportes activos, historial y solicitudes de adopción. | Usuario |
| **RF07** | **Solicitud de Esterilización/Chip** | Reserva de turnos para operativos de esterilización o implantación de microchips. | Usuario |


## 1.1 Requerimientos NO Funcionales

Para asegurar un software robusto, profesional y eficiente, el sistema cumple con los siguientes estándares:

| ID | Requerimiento | Descripción | Rol | Implementado?
| :--- | :--- | :--- | :--- |
| **RNF01** | **Seguridad** | Las contraseñas se almacenan en la base de datos PostgreSQL utilizando el algoritmo de hashing **bcrypt**. | Usuario | Sí 
| **RNF02** | **Rendimiento** | Consultas optimizadas en PostgreSQL para manejar múltiples reportes georreferenciados simultáneos sin degradar la experiencia de usuario. | Admin | Sí 
| **RNF03** | **Usabilidad** | Uso de iconografía clara y flujos de navegación de máximo 3 clics para realizar acciones críticas (como reportar un animal). | Usuario | Sí


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
