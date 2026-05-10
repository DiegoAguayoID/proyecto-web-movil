import { 
    IonButton, IonContent, IonHeader, IonInput,IonCheckbox, 
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink
} from '@ionic/react';
import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [rut, setRut] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);

const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        if (!terms) {
            alert("Debes aceptar los términos y condiciones");
            return;
        }

        try {
            // Aquí luego irá tu conexión real al backend
            console.log("Datos a enviar:", { username, rut, email, region, comuna, password });
            alert("¡Formulario validado! (Simulación de guardado)");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <IonPage>
            <IonHeader> 
                <IonToolbar>
                    <IonTitle>Registro de Ciudadano</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                
                <IonItem>
                    <IonLabel position='floating'>Nombre de Usuario</IonLabel>
                    <IonInput value={username} onIonInput={(e) => setUsername(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>RUT</IonLabel>
                    <IonInput value={rut} onIonInput={(e) => setRut(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Correo Electrónico</IonLabel>
                    <IonInput type="email" value={email} onIonInput={(e) => setEmail(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Región</IonLabel>
                    <IonInput value={region} onIonInput={(e) => setRegion(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Comuna</IonLabel>
                    <IonInput value={comuna} onIonInput={(e) => setComuna(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Contraseña</IonLabel>
                    <IonInput type="password" value={password} onIonInput={(e) => setPassword(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Confirmar Contraseña</IonLabel>
                    <IonInput type="password" value={confirmPassword} onIonInput={(e) => setConfirmPassword(e.detail.value!)} />
                </IonItem>

                <IonItem className='ion-margin-top' lines="none">
                    <IonCheckbox checked={terms} onIonChange={e => setTerms(e.detail.checked)} slot="start" />
                    <IonLabel style={{ fontSize: '0.9em', whiteSpace: 'normal' }}>
                        Acepto los términos y condiciones
                    </IonLabel>
                </IonItem>

                <IonButton expand='block' className='ion-margin-top' onClick={handleRegister}>
                    Crear Cuenta
                </IonButton>

                <p style={{ textAlign: 'center'}}> 
                    ¿Ya tienes cuenta? <IonRouterLink href='/login'>Inicia Sesión aquí</IonRouterLink>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Register;
