import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonBadge, IonButton, IonIcon } from '@ionic/react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { arrowBackOutline, medicalOutline } from 'ionicons/icons';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Arreglo de iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapRefresher = () => {
    const map = useMap();
    useEffect(() => { setTimeout(() => map.invalidateSize(), 500); }, [map]);
    return null;
};

const DetalleAnimal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [animal, setAnimal] = useState<any>(null);

    useEffect(() => {
        fetch(`https://proyecto-web-movil.onrender.com/animales/${id}`)
            .then(res => res.json())
            .then(data => setAnimal(data));
    }, [id]);

    if (!animal) return <IonContent>Cargando detalles...</IonContent>;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButton slot="start" fill="clear" routerLink="/lista"><IonIcon icon={arrowBackOutline} /></IonButton>
                    <IonTitle>Detalle</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" style={{ '--background': '#f4f5f8' }}>
                <IonGrid>
                    {/* Fila principal: Foto a la izquierda, Info a la derecha */}
                    <IonRow>
                        <IonCol size="12" sizeMd="6">
                            <div style={{ height: '300px', borderRadius: '15px', overflow: 'hidden', background: '#000' }}>
                                <img src={animal.foto_url} alt="Animal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                        </IonCol>
                        <IonCol size="12" sizeMd="6" style={{ padding: '20px' }}>
                            <IonBadge color={animal.estado === 'Herido' ? 'danger' : 'success'} style={{ marginBottom: '10px' }}>
                                <IonIcon icon={medicalOutline} /> {animal.estado}
                            </IonBadge>
                            <h1 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{animal.tipo_animal.toUpperCase()}</h1>
                            <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6' }}>{animal.descripcion}</p>
                            <p style={{ color: '#999' }}>Reportado por: <b>{animal.reportado_por}</b></p>
                        </IonCol>
                    </IonRow>

                    {/* Fila del mapa */}
                    <IonRow>
                        <IonCol size="12">
                            <h3 style={{ marginTop: '20px' }}>Ubicación del avistamiento</h3>
                            <div style={{ height: '400px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                                <MapContainer center={[animal.latitud, animal.longitud]} zoom={16} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[animal.latitud, animal.longitud]} />
                                    <MapRefresher />
                                </MapContainer>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};
export default DetalleAnimal;