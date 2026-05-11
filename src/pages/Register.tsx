import { 
    IonButton, IonContent, IonHeader, IonInput,IonCheckbox, 
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink, useIonRouter, 
    IonNote, IonText, UseIonRouterResult
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
    const router = useIonRouter();


const validarEmail = (correo: string) => {
    return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const validarRut = (rutTexto: string) => {
    const regexRut = /^[0-9]{7,8}-[0-9kK]{1}$/;
    return regexRut.test(rutTexto);
};

const handleRegister = async () => {
        if (!validarRut(rut)) {
            alert("El RUT no es válido. Usa el formato: 12345678-9 (sin puntos y con guion)");
            return;
        }

        if (!validarEmail(email)) {
            alert("Por favor, ingresa un correo electrónico válido (ejemplo@correo.com)");
        }
        
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        if (!terms) {
            alert("Debes aceptar los términos y condiciones");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, rut, email, region, comuna, password })
            });

            if (response.ok) {
                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                router.push('/login', 'forward', 'replace');
                return; 
            }

            const errorText = await response.text();
            alert("Error del servidor: " + errorText);
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor");
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
                    <IonInput value={username}  placeholder="Ej: JuanPerez2024" onIonInput={(e) => setUsername(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>RUT (sin puntos y con guion)</IonLabel>
                    <IonInput value={rut} placeholder="12345678-9" onIonInput={(e) => setRut(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Correo Electrónico</IonLabel>
                    <IonInput type="email" placeholder="usuario@ejemplo.com" value={email} onIonInput={(e) => setEmail(e.detail.value!)} />
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
                    <IonLabel position='floating'>Contraseña (mínimo 6 caracteres)</IonLabel>
                    <IonInput type="password" value={password} onIonInput={(e) => setPassword(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Confirmar Contraseña (mínimo 6 caracteres)</IonLabel>
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
