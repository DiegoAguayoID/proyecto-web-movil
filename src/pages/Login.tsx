import {
    IonButton, IonContent, IonHeader, IonInput,
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink, IonButtons,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon, IonText,
    IonMenuButton
} from '@ionic/react';
import { mailOutline, lockClosedOutline, logInOutline, personCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Por favor rellena todos los campos");
            return;
        }

        try {
            const API_URL = 'https://proyecto-web-movil.onrender.com';
            //window.location.hostname === '192.168.1.3' 
              //  ? 'http://192.168.1.3:3000' 
                //: 'https://TU-BACKEND-EN-RENDER.onrender.com';

            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token, data.user);
                
                console.log("Login exitoso, redirigiendo...");
                window.location.href = '/home';
            } else {
                const errorText = await response.text();
                alert("Error: " + errorText);
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor. Verifica que tu backend esté corriendo.");
        }
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="success">
                    <IonButtons>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle style={{ fontWeight: 'bold'}}>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding' style={{ '--background': '#f4f5f8' }}>
                <IonGrid style={{ height: '100%' }}>
                    <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
                        <IonCol size="12" sizeMd="8" sizeLg="5" sizeXl="4">
                            
                            <IonCard style={{ borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                                <div className="ion-text-center ion-padding-top">
                                    <IonIcon icon={personCircleOutline} style={{ fontSize: '70px', color: '#2E7D32' }} />
                                    <h1 style={{ fontWeight: 'bold', marginTop: '10px' }}>¡Bienvenido!</h1>
                                    <p style={{ color: '#666' }}>Inicia sesión para continuar</p>
                                </div>

                                <IonCardContent>
                                    <IonItem mode="md" lines="none" className="ion-margin-bottom" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                        <IonIcon icon={mailOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                        <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold' }}>Correo Electrónico</IonLabel>
                                        <IonInput 
                                            type="email"
                                            placeholder="ejemplo@correo.com"
                                            onIonInput={(e) => setEmail(e.detail.value!)}
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </IonItem>

                                    <IonItem mode="md" lines="none" className="ion-margin-bottom" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                        <IonIcon icon={lockClosedOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                        <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold' }}>Contraseña</IonLabel>
                                        <IonInput 
                                            type="password"
                                            placeholder="********"
                                            onIonInput={(e) => setPassword(e.detail.value!)}
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </IonItem>

                                    <IonButton expand='block' shape="round" color="success" style={{ height: '50px', marginTop: '20px' }} onClick={handleLogin}>
                                        <IonIcon slot="start" icon={logInOutline} />
                                        Ingresar
                                    </IonButton>

                                    <p style={{ textAlign: 'center', marginTop: '20px' }}> 
                                        ¿No tienes cuenta? <IonRouterLink href='/register' style={{ color: '#2E7D32', fontWeight: 'bold', textDecoration: 'none' }}> Regístrate aquí</IonRouterLink>
                                    </p>
                                </IonCardContent>
                            </IonCard>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
