import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonSearchbar } from '@ionic/react';

const ListaAnimales: React.FC = () => {
    // 1. Estado de los datos
    const [animales, setAnimales] = useState([]); // Aquí irán todos los animales de tu BD
    const [busqueda, setBusqueda] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('todos');
    const [filtroUbicacion, setFiltroUbicacion] = useState('todos');

    // 2. Aquí haremos el fetch a tu API más adelante
    useEffect(() => {
        // fetch(`${import.meta.env.VITE_API_URL}/animales`).then(...)
    }, []);

    // 3. Lógica de filtrado (esto es lo que muestra la lista)
    const animalesFiltrados = animales.filter((animal: any) => {
        const coincideBusqueda = animal.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideTipo = filtroTipo === 'todos' || animal.tipo === filtroTipo;
        const coincideUbicacion = filtroUbicacion === 'todos' || animal.ubicacion === filtroUbicacion;
        return coincideBusqueda && coincideTipo && coincideUbicacion;
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Encuentra a tu compañero</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {/* ZONA DE FILTROS */}
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" sizeMd="4">
                            <IonSearchbar value={busqueda} onIonInput={e => setBusqueda(e.detail.value!)} placeholder="Buscar por nombre..." />
                        </IonCol>
                        <IonCol size="6" sizeMd="4">
                            <IonSelect label="Tipo" value={filtroTipo} onIonChange={e => setFiltroTipo(e.detail.value)}>
                                <IonSelectOption value="todos">Todos</IonSelectOption>
                                <IonSelectOption value="perro">Perro</IonSelectOption>
                                <IonSelectOption value="gato">Gato</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                        <IonCol size="6" sizeMd="4">
                            <IonSelect label="Ubicación" value={filtroUbicacion} onIonChange={e => setFiltroUbicacion(e.detail.value)}>
                                <IonSelectOption value="todos">Todas</IonSelectOption>
                                <IonSelectOption value="valparaiso">Valparaíso</IonSelectOption>
                                <IonSelectOption value="vina">Viña del Mar</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                {/* ZONA DE RESULTADOS */}
                <IonGrid>
                    <IonRow>
                        {animalesFiltrados.map((animal: any) => (
                            <IonCol key={animal.id} size="12" sizeMd="4">
                                {/* Aquí iría tu Card de animal */}
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ListaAnimales;