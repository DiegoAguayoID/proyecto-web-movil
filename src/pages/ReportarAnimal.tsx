import { 
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton 
} from '@ionic/react';
import React from 'react';

const ReportarAnimal: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Reportar Animal</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>Ingresar nuevo caso</h2>
                <IonItem>
                    <IonLabel position="floating">Descripción del animal</IonLabel>
                    <IonInput placeholder="Ej: Perro negro mediano..." />
                </IonItem>
                <IonButton expand="block" className="ion-margin-top">
                    Subir Reporte
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ReportarAnimal;