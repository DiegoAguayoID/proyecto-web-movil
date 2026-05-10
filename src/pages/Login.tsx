import {
    IonButton, IonContent, IonHeader, IonInput,
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink
} from '@ionic/react';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                const errorText = await response.text();
                alert("Error: " + errorText);
            }
        } catch (error) {
            alert("No se pudo conectar con el server");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión en: "NOMBREDELAPP"</IonTitle>
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
            </IonContent>
        </IonPage>
    );
};

export default Login;
