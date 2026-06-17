import React from "react";
import { IonContent, IonPage, IonButton, IonIcon, IonText,
    IonGrid, IonRow, IonCol
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { checkmarkCircleOutline, addCircleOutline, homeOutline } from "ionicons/icons";
//import './ReporteExitoso.css'; 

const ReporteExitoso: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent className="ion-padding ion-text-center">
                <IonGrid style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                icon={checkmarkCircleOutline}
                                color="success"
                                style={{fontSize: '96px', marginBottom: '20px'}}
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonText color="dark">
                                <h1>REPORTE ENTREGADO CON ÉXITO</h1>
                            </IonText>
                            <IonText color="medium">
                                <p>Tu reporte ha sido guardado correctamente y la comunidad ya puede revisarlo</p>
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow style ={{marginTop: '40px'}}>
                        <IonCol size="12">
                            <IonButton
                                expand="block"
                                color="primary"
                                onClick={() => history.push('/report')}
                            >
                                <IonIcon slot="start" icon={addCircleOutline} />
                                Hacer otro reporte
                            </IonButton>
                        </IonCol>

                        <IonCol size="12" style={{marginTop: '10px'}}>
                            <IonButton
                                expand="block"
                                color="secondary"
                                fill="outline"
                                onClick={() => history.push('/home')}
                            >
                                <IonIcon slot="start" icon={homeOutline} />
                                Volver al menú principal
                            </IonButton>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ReporteExitoso;