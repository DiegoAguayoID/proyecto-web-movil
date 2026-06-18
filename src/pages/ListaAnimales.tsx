import React, { useState, useEffect } from 'react';
import { 
    IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, 
    IonSelect, IonSelectOption, IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, 
    IonCardTitle, IonCardContent, IonButton, IonIcon, IonBadge 
} from '@ionic/react';
import { callOutline, mailOutline } from 'ionicons/icons';

const ListaAnimales: React.FC = () => {
    // 1. Estado de los datos
    const [animales, setAnimales] = useState<any[]>([]); 
    const [busqueda, setBusqueda] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('todos');
    const [filtroUbicacion, setFiltroUbicacion] = useState('todos');

    // Añade esto después de tus estados iniciales
    const usuarioLogueado = JSON.parse(localStorage.getItem('user') || '{}');
    const esAdmin = usuarioLogueado.rol === 'admin';

    const API_URL = 'https://proyecto-web-movil.onrender.com'; // Tu url local de desarrollo

    // 2. Fetch a la API para cargar datos reales de la BD
    useEffect(() => {
        const cargarAnimales = async () => {
            try {
                const response = await fetch(`${API_URL}/animales`);
                if (response.ok) {
                    const data = await response.json();
                    setAnimales(data);
                }
            } catch (error) {
                console.error("Error al cargar animales:", error);
            }
        };
        cargarAnimales();
    }, []);

    // 3. Lógica de filtrado adaptada a las variables de tu BD
    const animalesFiltrados = animales.filter((animal: any) => {
        // Filtro por descripción o tipo
        const coincideBusqueda = animal.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        const coincideTipo = filtroTipo === 'todos' || animal.tipo_animal.toLowerCase() === filtroTipo.toLowerCase();
        
        // Simulación de ubicación por rango/zona (para simplificar con tus select, o puedes añadir una columna comuna a futuro)
        // Por ahora, asumimos que latitudes cercanas a cierto rango representan Valpo o Viña si no guardas la comuna en texto string.
        let coincideUbicacion = true;
        if (filtroUbicacion === 'valparaiso') {
            coincideUbicacion = parseFloat(animal.latitud) < -33.03; // Ejemplo aproximado geográfico
        } else if (filtroUbicacion === 'vina') {
            coincideUbicacion = parseFloat(animal.latitud) >= -33.03;
        }

        return coincideBusqueda && coincideTipo && coincideUbicacion;
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Encuentra a tu compañero</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding">
                {/* ZONA DE FILTROS */}
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" sizeMd="4">
                            <IonSearchbar value={busqueda} onIonInput={e => setBusqueda(e.detail.value!)} placeholder="Buscar en la descripción..." />
                        </IonCol>
                        <IonCol size="6" sizeMd="4">
                            <IonSelect label="Tipo" interface="popover" value={filtroTipo} onIonChange={e => setFiltroTipo(e.detail.value)}>
                                <IonSelectOption value="todos">Todos</IonSelectOption>
                                <IonSelectOption value="perro">Perro</IonSelectOption>
                                <IonSelectOption value="gato">Gato</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                        <IonCol size="6" sizeMd="4">
                            <IonSelect label="Ubicación" interface="popover" value={filtroUbicacion} onIonChange={e => setFiltroUbicacion(e.detail.value)}>
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
                        {animalesFiltrados.length === 0 ? (
                            <IonCol size="12" className="ion-text-center">
                                <p style={{ color: 'gray', marginTop: '20px' }}>No hay reportes que coincidan con los filtros.</p>
                            </IonCol>
                        ) : (
                            animalesFiltrados.map((animal: any) => (
                                <IonCol key={animal.id} size="12" sizeMd="4">
                                    <IonCard>
                                        {/* Renderizado directo de la foto almacenada en TEXT de Render */}
                                        <img 
                                            src={animal.foto_url} 
                                            alt="Animal reportado" 
                                            style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                                        />
                                        <IonCardHeader>
                                            <IonCardSubtitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Por: {animal.reportado_por}</span>
                                                <IonBadge color={animal.estado === 'Pendiente' ? 'warning' : 'success'}>
                                                    {animal.estado}
                                                </IonBadge>
                                            </IonCardSubtitle>
                                            <IonCardTitle>{animal.tipo_animal.toUpperCase()}</IonCardTitle>
                                        </IonCardHeader>

                                        <IonCardContent>
                                            <p>{animal.descripcion}</p>
                                            <p style={{ fontSize: '12px', color: 'gray', marginTop: '8px' }}>
                                                📍 Lat: {parseFloat(animal.latitud).toFixed(5)} | Lng: {parseFloat(animal.longitud).toFixed(5)}
                                            </p>
                                            
                                            {/* Botón de acción para llamar al usuario que reportó */}
                                            <IonButton 
                                                expand="block" 
                                                color="secondary" 
                                                style={{ marginTop: '15px' }}
                                                href={`mailto:${animal.correo_contacto}?subject=Contacto por reporte de ${animal.tipo_animal}`}
                                            >
                                                <IonIcon slot="start" icon={mailOutline} />
                                                Contactar por Correo
                                            </IonButton>
                                            {/* BOTÓN PARA ADMINS */}
                                            {esAdmin && (
                                                <IonButton 
                                                    expand="block" 
                                                    color="danger" 
                                                    style={{ marginTop: '10px' }}
                                                    onClick={async () => {
                                                        const token = localStorage.getItem('token')?.replace(/"/g, '');
                                                        const response = await fetch(`https://proyecto-web-movil.onrender.com/api/reportes/${animal.id}`, {
                                                            method: 'DELETE',
                                                            headers: { 'Authorization': `Bearer ${token}` }
                                                        });
                                                        
                                                        if (response.ok) {
                                                            window.location.reload(); // Recarga para ver el cambio
                                                        } else {
                                                            const errorData = await response.json();
                                                            alert("Error al eliminar: " + (errorData.message || "Error desconocido"));
                                                        }
                                                    }}
                                                >
                                                    Eliminar Reporte
                                                </IonButton>
                                            )}
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

export default ListaAnimales;