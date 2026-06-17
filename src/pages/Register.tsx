import { 
    IonButton, IonContent, IonHeader, IonInput, IonCheckbox, 
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink, useIonRouter, 
    IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonText, IonButtons, IonMenuButton
} from '@ionic/react';
import { 
    personOutline, mailOutline, lockClosedOutline, locationOutline, 
    idCardOutline, personAddOutline, checkboxOutline 
} from 'ionicons/icons';
import React, { useState } from 'react';

const Register: React.FC = () => {
    // Mantenemos los mismos estados para la base de datos
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
        return String(correo)
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
            return;
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
            const response = await fetch('https://proyecto-web-movil.onrender.com/register', {
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
            <IonHeader className="ion-no-border"> 
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle style={{ fontWeight: 'bold' }}>Crear Cuenta</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding' style={{ '--background': '#f4f5f8' }}>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
                            
                            <IonCard style={{ borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', margin: '0' }}>
                                <div className="ion-text-center ion-padding-top">
                                    <IonIcon icon={personAddOutline} style={{ fontSize: '60px', color: '#2E7D32' }} />
                                    <h1 style={{ fontWeight: 'bold', fontSize: '1.8rem', marginTop: '10px' }}>Únete a la comunidad</h1>
                                    <p style={{ color: '#666' }}>Ayúdanos a proteger a los animales de tu zona</p>
                                </div>

                                <IonCardContent>
                                    {/* RUT */}
                                    <IonItem mode="md" className="ion-margin-bottom" lines="none" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                        <IonIcon icon={idCardOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                        <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>RUT (sin puntos y con guion)</IonLabel>
                                        <IonInput 
                                            value={rut} 
                                            placeholder="12345678-9" 
                                            onIonInput={(e) => setRut(e.detail.value!)} 
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </IonItem>

                                    {/* Nombre de Usuario */}
                                    <IonItem mode="md" className="ion-margin-bottom" lines="none" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                        <IonIcon icon={personOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                        <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>Nombre de Usuario</IonLabel>
                                        <IonInput 
                                            value={username}  
                                            placeholder="Ej: JuanPerez2024" 
                                            onIonInput={(e) => setUsername(e.detail.value!)} 
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </IonItem>

                                    {/* Correo Electrónico */}
                                    <IonItem mode="md" className="ion-margin-bottom" lines="none" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                        <IonIcon icon={mailOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                        <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>Correo Electrónico</IonLabel>
                                        <IonInput 
                                            type="email" 
                                            placeholder="usuario@ejemplo.com" 
                                            value={email} 
                                            onIonInput={(e) => setEmail(e.detail.value!)} 
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </IonItem>

                                    {/* Región y Comuna en la misma fila para PC, apilados en Móvil */}
                                    <IonRow>
                                        <IonCol size="12" sizeMd="6" style={{ padding: '0' }}>
                                            <IonItem mode="md" className="ion-margin-bottom" lines="none" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px', margin: '0 5px 15px 0' }}>
                                                <IonIcon icon={locationOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                                <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold' }}>Región</IonLabel>
                                                <IonInput value={region} onIonInput={(e) => setRegion(e.detail.value!)} style={{ marginLeft: '10px' }} />
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="12" sizeMd="6" style={{ padding: '0' }}>
                                            <IonItem mode="md" className="ion-margin-bottom" lines="none" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                                <IonIcon icon={locationOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                                <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold' }}>Comuna</IonLabel>
                                                <IonInput value={comuna} onIonInput={(e) => setComuna(e.detail.value!)} style={{ marginLeft: '10px' }} />
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>

                                    {/* Contraseña */}
                                    <IonItem mode="md" className="ion-margin-bottom" lines="none" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                        <IonIcon icon={lockClosedOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                        <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>Contraseña</IonLabel>
                                        <IonInput type="password" value={password} onIonInput={(e) => setPassword(e.detail.value!)} style={{ marginLeft: '10px' }} />
                                    </IonItem>

                                    {/* Confirmar Contraseña */}
                                    <IonItem mode="md" className="ion-margin-bottom" lines="none" style={{ background: '#f9f9f9', borderRadius: '12px', padding: '5px' }}>
                                        <IonIcon icon={lockClosedOutline} slot="start" color="success" style={{ marginLeft: '10px' }} />
                                        <IonLabel position='stacked' style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>Confirmar Contraseña</IonLabel>
                                        <IonInput type="password" value={confirmPassword} onIonInput={(e) => setConfirmPassword(e.detail.value!)} style={{ marginLeft: '10px' }} />
                                    </IonItem>

                                    <IonItem className='ion-margin-top' lines="none" style={{ marginBottom: '20px' }}>
                                        <IonCheckbox checked={terms} onIonChange={e => setTerms(e.detail.checked)} slot="start" color="success" />
                                        <IonLabel style={{ fontSize: '0.9rem', whiteSpace: 'normal' }}>
                                            Acepto los términos y condiciones de uso.
                                        </IonLabel>
                                    </IonItem>

                                    <IonButton expand='block' shape="round" color="success" style={{ height: '55px', fontSize: '1.2rem', fontWeight: 'bold' }} onClick={handleRegister}>
                                        Crear Cuenta
                                    </IonButton>

                                    <p style={{ textAlign: 'center', marginTop: '20px' }}> 
                                        ¿Ya tienes cuenta? <IonRouterLink href='/login' style={{ color: '#2E7D32', fontWeight: 'bold', textDecoration: 'none' }}>Inicia Sesión aquí</IonRouterLink>
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

export default Register;
