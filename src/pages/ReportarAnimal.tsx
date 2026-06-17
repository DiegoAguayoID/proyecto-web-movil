import { 
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, 
    IonLabel, IonInput, IonButton, IonIcon, IonGrid, IonRow, 
    IonCol, IonCard, IonCardContent, IonSelect, IonSelectOption, 
    IonTextarea, IonButtons, IonMenuButton, IonText, useIonToast
} from '@ionic/react';
import { 
    cameraOutline, locationOutline, pawOutline, alertCircleOutline,
    sendOutline, informationCircleOutline
} from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

// Plugins de Capacitor
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

// Importaciones del Mapa (Leaflet)
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // ¡Muy importante para que el mapa no se vea roto!
import L from 'leaflet';

// Arreglo nativo para que el ícono rojo del marcador de Leaflet cargue bien en React
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- COMPONENTE INTERNO DEL MAPA ---
// Este componente maneja los clics en el mapa y el auto-centrado del GPS
// --- COMPONENTE INTERNO DEL MAPA ---
const MapHandler = ({ location, setLocation, setLocationText }: any) => {
    const map = useMap();

    // 1. EL TRUCO PARA IONIC: Recalcular el tamaño del mapa una vez que la vista cargó
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 400); // Esperamos 400ms a que termine la animación de Ionic
    }, [map]);

    // 2. Si la ubicación cambia desde afuera (ej. botón Auto GPS), centramos el mapa
    useEffect(() => {
        if (location) {
            map.flyTo([location.lat, location.lng], 16);
        }
    }, [location, map]);

    // 3. Si el usuario hace clic en el mapa, actualizamos la ubicación a mano
    useMapEvents({
        click(e) {
            setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
            setLocationText(`Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`);
        },
    });

    return location ? <Marker position={[location.lat, location.lng]} /> : null;
};
// -----------------------------------
// -----------------------------------


const ReportarAnimal: React.FC = () => {
    const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
    // Ubicación por defecto al abrir la app (Ej: Centro de Valparaíso o Santiago)
    const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
    const [locationText, setLocationText] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    
    const [presentToast] = useIonToast();

    const tomarFoto = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 80,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt 
            });
            setPhotoUrl(image.dataUrl);
        } catch (error) {
            console.error("Error al capturar la foto:", error);
        }
    };

    const obtenerUbicacion = async () => {
        setLocationText('Obteniendo ubicación del GPS...');
        try {
            // Agregamos { enableHighAccuracy: true } para forzar la máxima precisión
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000 // Le damos hasta 10 segundos para enganchar bien el satélite
            });
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            setLocationText(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        } catch (error) {
            console.error("Error al obtener ubicación:", error);
            setLocationText('Error al obtener ubicación');
            presentToast({
                message: 'Asegúrate de dar permisos de ubicación en tu navegador.',
                duration: 3000,
                color: 'danger'
            });
        }
    };
// Función para buscar la dirección escrita y mover el mapa
    const buscarDireccion = async () => {
        if (!locationText || locationText.includes('Lat:')) {
            presentToast({ message: 'Escribe una dirección válida primero', duration: 2000, color: 'warning' });
            return;
        }
        
        try {
            presentToast({ message: 'Buscando...', duration: 1000 });
            
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}&countrycodes=cl&limit=1`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);
                setLocation({ lat, lng });

                // Extraemos el nombre corto de lo que la API realmente encontró
                const nombreEncontrado = data[0].display_name.split(',')[0]; 
                
                presentToast({ 
                    message: `Ubicación aproximada: ${nombreEncontrado}. Ajusta el pin si es necesario.`, 
                    duration: 4000, 
                    color: 'success' 
                });
            } else {
                presentToast({ 
                    message: 'Dirección no encontrada. Intenta buscar solo tu comuna y luego ajusta el pin en el mapa.', 
                    duration: 4000, 
                    color: 'warning' 
                });
            }
        } catch (error) {
            console.error("Error buscando dirección:", error);
            presentToast({ message: 'Error de conexión al buscar', duration: 2000, color: 'danger' });
        }
    };

const enviarReporte = async () => {
    // 1. Validaciones
    if (!tipo || !estado || !descripcion || !photoUrl || !location) {
        presentToast({
            message: 'Por favor completa todos los campos, foto y elige un punto en el mapa.',
            duration: 3000, color: 'warning'
        });
        return;
    }

    // 2. URL de tu backend en la nube
    const API_URL = 'https://proyecto-web-movil.onrender.com';

    try {
        const response = await fetch(`${API_URL}/reportar`, { // Asegúrate que esta ruta coincida con tu backend
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // Si tu backend requiere login, descomenta la siguiente línea:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                tipo,
                estado,
                descripcion,
                photoUrl,
                location // lat y lng
            })
        });

        if (response.ok) {
            presentToast({ message: '¡Reporte subido con éxito!', duration: 3000, color: 'success' });
            // Aquí podrías limpiar los campos después de subirlo
        } else {
            throw new Error('Error al enviar el reporte');
        }
    } catch (error) {
        console.error("Error:", error);
        presentToast({ message: 'No se pudo conectar al servidor. Inténtalo de nuevo.', duration: 3000, color: 'danger' });
    }
};

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle style={{ fontWeight: 'bold' }}>Huellas Seguras</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" style={{ '--background': '#f4f5f8' }}>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6">
                            
                            <div className="ion-padding-bottom">
                                <h2 style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>Nuevo Reporte</h2>
                                <IonText color="medium"><p>Completa los datos para ayudar al animal</p></IonText>
                            </div>

                            <IonCard style={{ borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', margin: '0' }}>
                                <IonCardContent>
                                    
                                    {/* Fotografía */}
                                    <div onClick={tomarFoto} style={{ 
                                        width: '100%', height: '200px', background: '#f0f4ef', 
                                        borderRadius: '20px', border: '2px dashed #2E7D32',
                                        display: 'flex', flexDirection: 'column', justifyContent: 'center', 
                                        alignItems: 'center', marginBottom: '20px', cursor: 'pointer', overflow: 'hidden'
                                    }}>
                                        {photoUrl ? (
                                            <img src={photoUrl} alt="Animal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <>
                                                <IonIcon icon={cameraOutline} style={{ fontSize: '56px', color: '#2E7D32' }} />
                                                <IonText color="success"><p style={{ fontWeight: 'bold' }}>Tocar para tomar foto</p></IonText>
                                            </>
                                        )}
                                    </div>

                                    {/* Selectores */}
                                    <IonRow>
                                        <IonCol size="12" sizeSm="6" style={{ padding: '0 5px 0 0' }}>
                                            <IonItem mode="md" lines="none" style={{ background: '#f9f9f9', borderRadius: '14px', marginBottom: '15px' }}>
                                                <IonIcon icon={pawOutline} slot="start" color="success" />
                                                <IonLabel position="stacked" style={{ fontWeight: 'bold' }}>Animal</IonLabel>
                                                <IonSelect value={tipo} onIonChange={e => setTipo(e.detail.value)} placeholder="¿Qué es?">
                                                    <IonSelectOption value="perro">Perro</IonSelectOption>
                                                    <IonSelectOption value="gato">Gato</IonSelectOption>
                                                    <IonSelectOption value="otro">Otro</IonSelectOption>
                                                </IonSelect>
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="12" sizeSm="6" style={{ padding: '0 0 0 5px' }}>
                                            <IonItem mode="md" lines="none" style={{ background: '#f9f9f9', borderRadius: '14px', marginBottom: '15px' }}>
                                                <IonIcon icon={alertCircleOutline} slot="start" color="warning" />
                                                <IonLabel position="stacked" style={{ fontWeight: 'bold' }}>Estado</IonLabel>
                                                <IonSelect value={estado} onIonChange={e => setEstado(e.detail.value)} placeholder="Condición">
                                                    <IonSelectOption value="herido">Herido</IonSelectOption>
                                                    <IonSelectOption value="abandono">Abandono</IonSelectOption>
                                                    <IonSelectOption value="extraviado">Extraviado</IonSelectOption>
                                                </IonSelect>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>

                                    {/* --- SECCIÓN DEL MAPA --- */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <IonLabel style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px', color: '#333' }}>
                                            Indica la ubicación en el mapa
                                        </IonLabel>
                                        
                                        <div style={{ height: '250px', width: '100%', borderRadius: '14px', overflow: 'hidden', border: '1px solid #ccc', marginBottom: '10px' }}>
                                            <MapContainer 
                                                center={[-33.0456, -71.6197]} // Coordenadas de Valparaíso por defecto
                                                zoom={13} 
                                                style={{ height: '100%', width: '100%' }}
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <MapHandler location={location} setLocation={setLocation} setLocationText={setLocationText} />
                                            </MapContainer>
                                        </div>

                                        <IonRow className="ion-align-items-center">
                                            <IonCol size="12" style={{ padding: '0' }}>
                                                <IonItem mode="md" lines="none" style={{ background: '#f9f9f9', borderRadius: '14px', marginBottom: '10px' }}>
                                                    <IonIcon icon={locationOutline} slot="start" color="danger" />
                                                    {/* Quitamos el readonly y agregamos onIonInput para que se pueda escribir */}
                                                    <IonInput 
                                                        value={locationText} 
                                                        onIonInput={e => setLocationText(e.detail.value!)}
                                                        placeholder="Escribe una dirección (Ej: Condell 123, Valparaíso)" 
                                                        style={{ fontSize: '0.95rem' }} 
                                                    />
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="6" style={{ padding: '0 5px 0 0' }}>
                                                <IonButton expand="block" color="primary" fill="outline" shape="round" onClick={buscarDireccion}>
                                                    Buscar Dirección
                                                </IonButton>
                                            </IonCol>
                                            <IonCol size="6" style={{ padding: '0 0 0 5px' }}>
                                                <IonButton expand="block" color="danger" shape="round" onClick={obtenerUbicacion}>
                                                    Auto GPS
                                                </IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </div>
                                    {/* ------------------------ */}

                                    <IonItem mode="md" lines="none" style={{ background: '#f9f9f9', borderRadius: '14px', marginBottom: '20px' }}>
                                        <IonIcon icon={informationCircleOutline} slot="start" color="success" />
                                        <IonLabel position="stacked" style={{ fontWeight: 'bold' }}>Descripción del animal</IonLabel>
                                        <IonTextarea 
                                            value={descripcion}
                                            onIonInput={e => setDescripcion(e.detail.value!)}
                                            placeholder="Ej: Perro negro mediano..." 
                                            rows={3}
                                        />
                                    </IonItem>

                                    <IonButton expand="block" color="success" shape="round" style={{ height: '55px', fontWeight: 'bold', fontSize: '1.1rem' }} onClick={enviarReporte}>
                                        <IonIcon slot="start" icon={sendOutline} />
                                        Subir Reporte
                                    </IonButton>

                                </IonCardContent>
                            </IonCard>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ReportarAnimal;