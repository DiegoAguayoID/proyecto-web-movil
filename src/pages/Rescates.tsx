import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonMenuButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonBadge,
    IonSelect,
    IonSelectOption,
    IonLoading
} from '@ionic/react';
import { 
    mailOutline, 
    locationOutline, 
    calendarOutline, 
    alertCircleOutline,
    arrowBackOutline
} from 'ionicons/icons';

interface Reporte {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    ubicacion: string;
    estado: string;
    imagen: string;
}

const Rescates: React.FC = () => {
    // 1. Estados para la API
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [destinatarios, setDestinatarios] = useState<{ [key: number]: string }>({});

    const organizaciones = [
        { nombre: "Municipalidad de Valparaíso (Dpto. Ambiental)", email: "medioambiente@munivalpo.cl" },
        { nombre: "Organización Rescate Patitas Valpo", email: "contacto@patitasvalpo.org" },
        { nombre: "Protectora de Animales Regional", email: "ayuda@protectorayanimales.cl" }
    ];

    // 2. useEffect para traer los reportes desde tu Backend en Node.js
    useEffect(() => {
        const cargarMisReportes = async () => {
            try {
                const token = localStorage.getItem("token");
                
                // Ajusta esta URL al puerto y ruta real de tu API backend
                const respuesta = await fetch('http://localhost:3000/api/reportes/mis-reportes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Enviamos el token para identificar al usuario
                    }
                });

                if (respuesta.ok) {
                    const textoRaw = await respuesta.text(); // Leemos primero como texto plano
                    console.log("TEXTO EXACTO QUE LLEGA DEL BACKEND:", textoRaw);
                    const datos = JSON.parse(textoRaw);
                    setReportes(datos);
                } else {
                    console.error("Error al obtener los reportes del servidor");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarMisReportes();
    }, []);

    const handleSelectOrganizacion = (reporteId: number, email: string) => {
        setDestinatarios(prev => ({ ...prev, [reporteId]: email }));
    };

    const enviarPorCorreo = (reporte: Reporte) => {
        const emailDestino = destinatarios[reporte.id];
        
        if (!emailDestino) {
            alert("Por favor, selecciona una organización o municipalidad antes de enviar.");
            return;
        }

        const asunto = encodeURIComponent(`SOLICITUD DE RESCATE URGENTE: ${reporte.titulo}`);
        const cuerpo = encodeURIComponent(
            `Estimados,\n\n` +
            `Me pongo en contacto para solicitar formalmente su apoyo con un caso de rescate animal registrado en nuestra plataforma Huellas Seguras:\n\n` +
            `• Caso: ${reporte.titulo}\n` +
            `• Descripción: ${reporte.descripcion}\n` +
            `• Fecha de Avistamiento: ${reporte.fecha}\n` +
            `• Ubicación/Referencia: ${reporte.ubicacion}\n\n` +
            `Agradecemos de antemano su gestión y pronta respuesta para acudir en ayuda del animal.\n\n` +
            `Atentamente,\nComunidad Huellas Seguras.`
        );

        const link = document.createElement('a');
        link.href = `mailto:${emailDestino}?subject=${asunto}&body=${cuerpo}`;
        link.target = '_blank'; // Evita que se congele la pestaña actual
        link.click(); // Simula el clic
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="light" style={{ padding: '8px 20px' }}>
                    <IonButtons slot="start">
                        <IonButton routerLink="/home" color="success">
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle color="success" style={{ fontWeight: 'bold' }}>
                        Solicitar Rescates
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton color="success" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen style={{ '--background': '#f7f8f5' }}>
                {/* Spinner de carga mientras responde el servidor */}
                <IonLoading isOpen={loading} message="Cargando tus reportes..." />

                <div
                    style={{
                        background: 'linear-gradient(90deg, #1d5b2d, #2E7D32)',
                        color: 'white',
                        padding: '40px 20px',
                        textAlign: 'center',
                        marginBottom: '30px'
                    }}
                >
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                        Tus Reportes de Avistamientos
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: '0.9', maxWidth: '700px', margin: '0 auto' }}>
                        Selecciona uno de tus reportes activos y envíalo formalmente por correo electrónico.
                    </p>
                </div>

                <IonGrid style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '50px' }}>
                    <IonRow>
                        {/* Si ya terminó de cargar y está vacío, muestra la pantalla de alerta */}
                        {!loading && reportes.length === 0 ? (
                            <IonCol size="12" className="ion-text-center" style={{ padding: '40px' }}>
                                <IonIcon icon={alertCircleOutline} style={{ fontSize: '60px', color: '#888' }} />
                                <h2>No registras reportes creados todavía</h2>
                                <p style={{ color: '#666' }}>Ve a la sección 'Reportar Animal' para añadir un caso al mapa.</p>
                                <IonButton routerLink="/report" color="success" shape="round" style={{ marginTop: '15px' }}>
                                    Crear Reporte
                                </IonButton>
                            </IonCol>
                        ) : (
                            reportes.map((reporte) => (
                                <IonCol size="12" key={reporte.id}>
                                    <IonCard style={{ borderRadius: '20px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', margin: '10px 0', overflow: 'hidden' }}>
                                        <IonCardContent style={{ padding: '0' }}>
                                            <IonRow>
                                                <IonCol size="12" sizeMd="4" style={{ padding: '0' }}>
                                                    <div style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        minHeight: '200px',
                                                        backgroundImage: `url('${reporte.imagen || 'https://via.placeholder.com/600x400?text=Sin+Foto'}')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }} />
                                                </IonCol>

                                                <IonCol size="12" sizeMd="8" style={{ padding: '25px', display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                            <h2 style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#2E7D32', margin: '0' }}>
                                                                {reporte.titulo}
                                                            </h2>
                                                            <IonBadge color={reporte.estado === 'Pendiente' ? 'warning' : 'success'} style={{ borderRadius: '8px', padding: '6px 12px' }}>
                                                                {reporte.estado}
                                                            </IonBadge>
                                                        </div>

                                                        <p style={{ color: '#444', lineHeight: '1.6', marginBottom: '15px' }}>
                                                            {reporte.descripcion}
                                                        </p>

                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                <IonIcon icon={calendarOutline} color="success" />
                                                                {reporte.fecha}
                                                            </span>
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                <IonIcon icon={locationOutline} color="success" />
                                                                {reporte.ubicacion}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div style={{ background: '#f4f6f0', padding: '15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                        <IonSelect 
                                                            placeholder="Seleccionar Organización o Municipalidad" 
                                                            interface="popover"
                                                            style={{ '--background': 'white', '--border-radius': '8px', 'padding': '10px', width: '100%' }}
                                                            value={destinatarios[reporte.id] || ''}
                                                            onIonChange={(e) => handleSelectOrganizacion(reporte.id, e.detail.value)}
                                                        >
                                                            {organizaciones.map((org, i) => (
                                                                <IonSelectOption key={i} value={org.email}>
                                                                    {org.nombre}
                                                                </IonSelectOption>
                                                            ))}
                                                        </IonSelect>

                                                        <IonButton expand="block" color="success" shape="round" onClick={() => enviarPorCorreo(reporte)}>
                                                            <IonIcon slot="start" icon={mailOutline} />
                                                            Solicitar Auxilio por Correo
                                                        </IonButton>
                                                    </div>
                                                </IonCol>
                                            </IonRow>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))
                        )}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Rescates;