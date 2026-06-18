import React, { useEffect, useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonBadge, IonSpinner, IonText, IonThumbnail, IonItem, IonLabel, IonList
} from '@ionic/react';

interface Reporte {
  id: number;
  tipo: string;
  estado: string;
  descripcion: string;
  photo_url: string;
  create_at: string;
}

const MisReportes: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://proyecto-web-movil.onrender.com';

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/mis-reportes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token ? token.replace(/"/g, '') : ''}`
          }
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar tus reportes');
        }

        const resData = await response.json();
        setReportes(resData.data || []);
      } catch (err: any) {
        setError(err.message || 'Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    obtenerReportes();
  }, []);

  // Función auxiliar para darle color al Badge según el estado del reporte
  const getColorEstado = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'warning';
      case 'en revision': case 'en revisión': return 'primary';
      case 'resuelto': return 'success';
      default: return 'medium';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Reportes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {loading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <p>Cargando tus reportes...</p>
          </div>
        )}

        {error && (
          <IonText color="danger" className="ion-text-center">
            <p>{error}</p>
          </IonText>
        )}

        {!loading && reportes.length === 0 && !error && (
          <div className="ion-text-center ion-padding">
            <IonText color="medium">
              <p>Aún no has realizado ningún reporte de animales. 🐾</p>
            </IonText>
          </div>
        )}

        <IonList lines="none">
          {reportes.map((reporte) => (
            <IonCard key={reporte.id}>
              <IonItem>
                {reporte.photo_url && (
                  <IonThumbnail slot="start">
                    <img src={reporte.photo_url} alt={reporte.tipo} style={{ borderRadius: '8px' }} />
                  </IonThumbnail>
                )}
                <IonLabel>
                  <IonCardTitle style={{ fontSize: '1.1rem', marginTop: '8px' }}>
                    {reporte.tipo}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {new Date(reporte.create_at).toLocaleDateString('es-CL')}
                  </IonCardSubtitle>
                </IonLabel>
                <IonBadge slot="end" color={getColorEstado(reporte.estado)}>
                  {reporte.estado}
                </IonBadge>
              </IonItem>
              
              <IonCardContent>
                {reporte.descripcion}
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default MisReportes;