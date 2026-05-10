import { 
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
    IonButtons, IonBackButton, IonText, IonIcon, IonButton 
} from '@ionic/react';
import { constructOutline, hammerOutline } from 'ionicons/icons';
import React from 'react';

const Construccion: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Módulo en Desarrollo</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding ion-text-center">
                <div style={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    <IonIcon 
                        icon={constructOutline} 
                        style={{ fontSize: '100px', color: '#2E7D32', marginBottom: '20px' }} 
                    />
                    
                    <IonText color="dark">
                        <h1 style={{ fontWeight: 'bold' }}>Pestaña en Construcción</h1>
                        <p style={{ fontSize: '1.2rem', maxWidth: '400px', margin: '0 auto 30px auto' }}>
                            Estamos trabajando duro para implementar esta funcionalidad. 
                            ¡Vuelve pronto para ver las novedades!
                        </p>
                    </IonText>

                    <IonButton routerLink="/home" color="success" shape="round">
                        Volver al Inicio
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Construccion;