import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent } from '@ionic/react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DetalleAnimal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [animal, setAnimal] = useState<any>(null);

    useEffect(() => {
        // Obtenemos los datos del animal específico
        fetch(`https://proyecto-web-movil.onrender.com/animales/${id}`)
            .then(res => res.json())
            .then(data => setAnimal(data));
    }, [id]);

    if (!animal) return <IonContent>Cargando...</IonContent>;

    return (
        <IonPage>
            <IonHeader><IonToolbar><IonTitle>{animal.tipo_animal}</IonTitle></IonToolbar></IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <img src={animal.foto_url} alt="Animal" />
                    <IonCardContent>
                        <h2>{animal.descripcion}</h2>
                        <div style={{ height: '300px' }}>
                            <MapContainer center={[animal.latitud, animal.longitud]} zoom={15} style={{ height: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[animal.latitud, animal.longitud]} />
                            </MapContainer>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};
export default DetalleAnimal;
