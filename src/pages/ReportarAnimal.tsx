import { 
<<<<<<< HEAD
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton 
} from '@ionic/react';
=======
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, 
    IonLabel, IonInput, IonButton, IonIcon, IonGrid, IonRow, 
    IonCol, IonCard, IonCardContent, IonSelect, IonSelectOption, 
    IonTextarea, IonButtons, IonMenuButton, IonText
} from '@ionic/react';
import { 
    cameraOutline, 
    locationOutline, 
    pawOutline, 
    alertCircleOutline,
    sendOutline,
    informationCircleOutline
} from 'ionicons/icons';
>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
import React from 'react';

const ReportarAnimal: React.FC = () => {
    return (
        <IonPage>
<<<<<<< HEAD
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
=======
            {/* Header con estilo consistente */}
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
                                <h2 style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>
                                    Nuevo Reporte
                                </h2>
                                <IonText color="medium">
                                    <p>Completa los datos para ayudar al animal</p>
                                </IonText>
                            </div>

                            <IonCard style={{ borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', margin: '0' }}>
                                <IonCardContent>
                                    
                                    {/* Área de Fotografía (Placeholder visual para la cámara) */}
                                    <div style={{ 
                                        width: '100%', 
                                        height: '200px', 
                                        background: '#f0f4ef', 
                                        borderRadius: '20px', 
                                        border: '2px dashed #2E7D32',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        cursor: 'pointer'
                                    }}>
                                        <IonIcon icon={cameraOutline} style={{ fontSize: '56px', color: '#2E7D32' }} />
                                        <IonText color="success">
                                            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Subir foto del animal</p>
                                        </IonText>
                                    </div>

                                    {/* Tipo de Animal y Estado en una fila */}
                                    <IonRow>
                                        <IonCol size="12" sizeSm="6" style={{ padding: '0 5px 0 0' }}>
                                            <IonItem mode="md" lines="none" style={{ background: '#f9f9f9', borderRadius: '14px', marginBottom: '15px' }}>
                                                <IonIcon icon={pawOutline} slot="start" color="success" />
                                                <IonLabel position="stacked" style={{ fontWeight: 'bold' }}>Animal</IonLabel>
                                                <IonSelect placeholder="¿Qué es?">
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
                                                <IonSelect placeholder="Condición">
                                                    <IonSelectOption value="herido">Herido</IonSelectOption>
                                                    <IonSelectOption value="abandono">Abandono</IonSelectOption>
                                                    <IonSelectOption value="extraviado">Extraviado</IonSelectOption>
                                                </IonSelect>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>

                                    {/* Ubicación (Simulada con GPS) */}
                                    <IonItem mode="md" lines="none" style={{ background: '#f9f9f9', borderRadius: '14px', marginBottom: '15px' }}>
                                        <IonIcon icon={locationOutline} slot="start" color="danger" />
                                        <IonLabel position="stacked" style={{ fontWeight: 'bold' }}>Ubicación actual</IonLabel>
                                        <IonInput value="Valparaíso, Chile (Detectado)" readonly style={{ color: '#666' }} />
                                    </IonItem>

                                    {/* Descripción del animal (El campo que ya tenías) */}
                                    <IonItem mode="md" lines="none" style={{ background: '#f9f9f9', borderRadius: '14px', marginBottom: '20px' }}>
                                        <IonIcon icon={informationCircleOutline} slot="start" color="success" />
                                        <IonLabel position="stacked" style={{ fontWeight: 'bold' }}>Descripción del animal</IonLabel>
                                        <IonTextarea 
                                            placeholder="Ej: Perro negro mediano, collar azul, parece desorientado..." 
                                            rows={3}
                                        />
                                    </IonItem>

                                    {/* Botón de envío mejorado */}
                                    <IonButton 
                                        expand="block" 
                                        color="success" 
                                        shape="round" 
                                        style={{ height: '55px', fontWeight: 'bold', fontSize: '1.1rem' }}
                                    >
                                        <IonIcon slot="start" icon={sendOutline} />
                                        Subir Reporte
                                    </IonButton>

                                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                        <IonText color="medium">
                                            <p style={{ fontSize: '0.85rem' }}>
                                                Tu reporte será revisado por la comunidad
                                            </p>
                                        </IonText>
                                    </div>

                                </IonCardContent>
                            </IonCard>

                        </IonCol>
                    </IonRow>
                </IonGrid>
>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
            </IonContent>
        </IonPage>
    );
};

export default ReportarAnimal;