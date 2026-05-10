import { 
<<<<<<< HEAD
    IonButton, IonContent, IonHeader, IonInput, 
=======
    IonButton, IonContent, IonHeader, IonInput,IonCheckbox, 
>>>>>>> 7c414ee419a90f4cbb9478144ad2b783c75fc19f
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink
} from '@ionic/react';
import React, { useState } from 'react';

const Register: React.FC = () => {
<<<<<<< HEAD
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

=======
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
>>>>>>> 7c414ee419a90f4cbb9478144ad2b783c75fc19f
    };

    return (
        <IonPage>
            <IonHeader> 
                <IonToolbar>
<<<<<<< HEAD
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
=======
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
>>>>>>> 7c414ee419a90f4cbb9478144ad2b783c75fc19f
                </IonItem>

                <IonItem>
                    <IonLabel position='floating'>Contraseña</IonLabel>
<<<<<<< HEAD
                    <IonInput
                        type="password"
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value!)}
                    />
=======
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
>>>>>>> 7c414ee419a90f4cbb9478144ad2b783c75fc19f
                </IonItem>

                <IonButton expand='block' className='ion-margin-top' onClick={handleRegister}>
                    Crear Cuenta
                </IonButton>

                <p style={{ textAlign: 'center'}}> 
<<<<<<< HEAD
                    ¿Tienes Cuenta en "NOMBNRE APP"? <IonRouterLink href='/login'>Inicia Sesión aquí</IonRouterLink>
=======
                    ¿Ya tienes cuenta? <IonRouterLink href='/login'>Inicia Sesión aquí</IonRouterLink>
>>>>>>> 7c414ee419a90f4cbb9478144ad2b783c75fc19f
                </p>
            </IonContent>
        </IonPage>
    );
};

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> 7c414ee419a90f4cbb9478144ad2b783c75fc19f
