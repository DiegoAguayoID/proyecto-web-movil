import {
    IonButton, IonContent, IonHeader, IonInput,
<<<<<<< HEAD
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink
} from '@ionic/react';
import React, {useState} from 'react';
=======
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon, IonText
} from '@ionic/react';
import { mailOutline, lockClosedOutline, logInOutline, personCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
<<<<<<< HEAD
    const hisotry = useHistory(); // permite navegar programaticamente

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            });

            if (response.ok) {
                alert("¡Bienvenido de nuevo!");
                hisotry.push('/home'); //Permite que te lleve al home
            }else {
=======
    const history = useHistory();

    const handleLogin = async () => {
        try {
            // Nota: He mantenido tu lógica de fetch al localhost:3000 
            // Si vas a usar Supabase más adelante, cambiaremos esta URL.
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                history.push('/home');
            } else {
>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
                const errorText = await response.text();
                alert("Error: " + errorText);
            }
        } catch (error) {
<<<<<<< HEAD
            alert("No se pudo conectar con el server");
        }
    };
//hola
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión en: Huellas Seguras</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonItem>
                    <IonLabel position='floating'>Correo Electrónico</IonLabel>
                    <IonInput 
                        type="email"
                        onIonInput={(e) => setEmail(e.detail.value!)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position='floating'>Contraseña</IonLabel>
                    <IonInput 
                        type="password"
                        onIonInput={(e) => setPassword(e.detail.value!)}
                    />
                </IonItem>

                <IonButton expand='block' className='ion-margin-top' onClick={handleLogin}>
                    Ingresar
                </IonButton>

                <p style={{ textAlign: 'center'}}> 
                    ¿No tienes cuenta? <IonRouterLink href='/register'> Regístrate aquí</IonRouterLink>
                </p>
=======
            alert("No se pudo conectar con el servidor. Verifica que tu backend esté corriendo.");
        }
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="success">
                    <IonTitle style={{ fontWeight: 'bold' }}>Huellas Seguras</IonTitle>
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
>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
            </IonContent>
        </IonPage>
    );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 5f237961bec7d521a200f30a2b5b08db424e181f
