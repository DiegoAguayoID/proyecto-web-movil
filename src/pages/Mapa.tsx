import React, { useEffect, useState, useRef } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonLoading } from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para forzar el tamaño del mapa cuando carga
const MapAutoResizer = () => {
    const map = useMap();
    useEffect(() => {
        const timer = setTimeout(() => map.invalidateSize(), 300);
        return () => clearTimeout(timer);
    }, [map]);
    return null;
};

const Mapa: React.FC = () => {
    const [animales, setAnimales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://proyecto-web-movil.onrender.com/animales')
            .then(res => res.json())
            .then(data => {
                setAnimales(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="success">
                    <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
                    <IonTitle>Mapa de Avistamientos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen={loading} message={'Cargando mapa...'} />
                
                {/* Contenedor del mapa con tamaño forzado por CSS */}
                <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                    <MapContainer 
                        center={[-33.0472, -71.6127]} 
                        zoom={13} 
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer 
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <MapAutoResizer />
                        {animales.map((animal) => (
                            <Marker 
                                key={animal.id} 
                                position={[parseFloat(animal.latitud), parseFloat(animal.longitud)]}
                            >
                                {/* COPIA Y PEGA ESTO EXACTAMENTE */}
                                <Popup>
                                    <div style={{ textAlign: 'center', width: '150px' }}>
                                        <img 
                                            src={animal.foto_url} 
                                            alt="Animal" 
                                            style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} 
                                        />
                                        <h4 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                                            {animal.tipo_animal.toUpperCase()}
                                        </h4>
                                        <a 
                                            href={`/detalle/${animal.id}`} 
                                            style={{ 
                                                textDecoration: 'none', background: '#2E7D32', color: 'white', 
                                                padding: '5px 10px', borderRadius: '5px', fontSize: '11px', display: 'block' 
                                            }}
                                        >
                                            Ver más
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Mapa;