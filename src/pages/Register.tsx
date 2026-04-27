import { 
    IonButton, IonContent, IonHeader, IonInput, 
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink
} from '@ionic/react';
import React, { useState } from 'react';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            });

            if (response.ok) {
                alert("¡Usuario Guardado en POSTGRESQL!");
            } else {
                alert("Algo salio mal en el server");
            }
        } catch (error) {
            console.error("Error de conexion:", error);
            alert("No se pudo conectar con el server");
        }

    };

    return (
        <IonPage>
            <IonHeader> 
                <IonToolbar>
                    <IonTitle>Registrarme en: "NOMBREDELAPP"</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonItem>
                    <IonLabel position='floating'>Correo Electrónico</IonLabel>
                    <IonInput
                        type = "email"
                        value= {email}
                        onIonInput={(e) => setEmail(e.detail.value!)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Contraseña</IonLabel>
                    <IonInput
                        type="password"
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value!)}
                    />
                </IonItem>

                <IonButton expand='block' className='ion-margin-top' onClick={handleRegister}>
                    Crear Cuenta
                </IonButton>

                <p style={{ textAlign: 'center'}}> 
                    ¿Tienes Cuenta en "NOMBNRE APP"? <IonRouterLink href='/login'>Inicia Sesión aquí</IonRouterLink>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Register;