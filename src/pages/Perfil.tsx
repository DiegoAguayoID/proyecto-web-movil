import React, { useState, useEffect } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle,
    IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonItem,
    IonLabel, IonInput, IonList, IonLoading, IonToast
} from '@ionic/react';
import { arrowBackOutline, saveOutline, trashOutline, personCircleOutline, shieldCheckmarkOutline } from 'ionicons/icons';

interface Usuario {
    id: number;
    username: string;
    email: string;
    rut: string;
    comuna: string;
    region: string;
    rol: string;
}

const Perfil: React.FC = () => {
    // Estados del perfil propio (Editables)
    const [username, setUsername] = useState<string>('');
    const [comuna, setComuna] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    
    // Estados del perfil propio (Bloqueados/Lectura)
    const [email, setEmail] = useState<string>('');
    const [rut, setRut] = useState<string>('');
    const [rol, setRol] = useState<string>('user');
    
    // Estados para la gestión de Admin
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [toastMessage, setToastMessage] = useState<string>('');

    const token = localStorage.getItem("token");

    useEffect(() => {
        const cargarDatosPerfil = async () => {
            try {
                const resPerfil = await fetch('http://localhost:3000/api/usuarios/perfil', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (resPerfil.ok) {
                    const datos = await resPerfil.json();
                    setUsername(datos.username || '');
                    setEmail(datos.email || '');
                    setRut(datos.rut || 'No registrado'); // Muestra el RUT
                    setComuna(datos.comuna || '');
                    setRegion(datos.region || '');
                    setRol(datos.rol || 'user');

                    if (datos.rol === 'admin') {
                        const resLista = await fetch('http://localhost:3000/api/usuarios', {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (resLista.ok) {
                            const listaUsers = await resLista.json();
                            setUsuarios(listaUsers.filter((u: Usuario) => u.id !== datos.id));
                        }
                    }
                }
            } catch (error) {
                console.error("Error al cargar perfil:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarDatosPerfil();
    }, [token]);

    const guardarCambios = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/usuarios/actualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Enviamos únicamente los campos permitidos para modificación
                body: JSON.stringify({ username, comuna, region })
            });

            if (res.ok) {
                setToastMessage("¡Perfil actualizado con éxito!");
            } else {
                setToastMessage("Error al actualizar los datos.");
            }
        } catch (error) {
            setToastMessage("Error de conexión con el servidor.");
        }
    };

    const eliminarUsuario = async (userId: number) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar permanentemente a este usuario?")) return;

        try {
            const res = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setUsuarios(usuarios.filter(u => u.id !== userId));
                setToastMessage("Usuario eliminado correctamente.");
            } else {
                setToastMessage("No se pudo eliminar al usuario.");
            }
        } catch (error) {
            setToastMessage("Error al procesar la solicitud.");
        }
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="light" style={{ padding: '8px 20px' }}>
                    <IonButtons slot="start">
                        <IonButton routerLink="/home" color="success">
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle color="success" style={{ fontWeight: 'bold' }}>Mi Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen style={{ '--background': '#f7f8f5' }}>
                <IonLoading isOpen={loading} message="Cargando datos..." />

                <IonGrid style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}>
                    <IonRow>
                        <IonCol size="12">
                            <IonCard style={{ borderRadius: '20px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
                                <IonCardContent style={{ padding: '30px' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                        <IonIcon icon={personCircleOutline} style={{ fontSize: '80px', color: '#2E7D32' }} />
                                        <h2 style={{ fontWeight: 'bold', color: '#2E7D32', marginTop: '10px' }}>
                                            {username} {rol === 'admin' && '👑'}
                                        </h2>
                                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Rol: <strong>{rol.toUpperCase()}</strong></p>
                                    </div>

                                    <IonList lines="none">
                                        {/* RUT - BLOQUEADO */}
                                        <IonItem style={{ '--background': '#e0e0e0', opacity: '0.7', borderRadius: '10px', marginBottom: '12px' }}>
                                            <IonLabel position="stacked" style={{ fontWeight: 'bold', color: '#555' }}>RUT (No modificable)</IonLabel>
                                            <IonInput value={rut} disabled={true} />
                                        </IonItem>

                                        {/* CORREO - BLOQUEADO */}
                                        <IonItem style={{ '--background': '#e0e0e0', opacity: '0.7', borderRadius: '10px', marginBottom: '12px' }}>
                                            <IonLabel position="stacked" style={{ fontWeight: 'bold', color: '#555' }}>Correo Electrónico (No modificable)</IonLabel>
                                            <IonInput type="email" value={email} disabled={true} />
                                        </IonItem>

                                        {/* USERNAME - EDITABLE */}
                                        <IonItem style={{ '--background': '#f4f6f0', borderRadius: '10px', marginBottom: '12px' }}>
                                            <IonLabel position="stacked" color="success" style={{ fontWeight: 'bold' }}>Nombre de Usuario</IonLabel>
                                            <IonInput value={username} onIonInput={(e) => setUsername(e.detail.value!)} />
                                        </IonItem>

                                        {/* REGION - EDITABLE */}
                                        <IonItem style={{ '--background': '#f4f6f0', borderRadius: '10px', marginBottom: '12px' }}>
                                            <IonLabel position="stacked" color="success" style={{ fontWeight: 'bold' }}>Región</IonLabel>
                                            <IonInput value={region} placeholder="Ej: Valparaíso" onIonInput={(e) => setRegion(e.detail.value!)} />
                                        </IonItem>

                                        {/* COMUNA - EDITABLE */}
                                        <IonItem style={{ '--background': '#f4f6f0', borderRadius: '10px', marginBottom: '20px' }}>
                                            <IonLabel position="stacked" color="success" style={{ fontWeight: 'bold' }}>Comuna</IonLabel>
                                            <IonInput value={comuna} placeholder="Ej: Viña del Mar" onIonInput={(e) => setComuna(e.detail.value!)} />
                                        </IonItem>
                                    </IonList>

                                    <IonButton expand="block" color="success" shape="round" onClick={guardarCambios}>
                                        <IonIcon slot="start" icon={saveOutline} />
                                        Guardar Cambios
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>

                        {/* PANEL DE ADMINISTRACIÓN */}
                        {rol === 'admin' && (
                            <IonCol size="12" style={{ marginTop: '20px' }}>
                                <IonCard style={{ borderRadius: '20px', border: '2px solid #c8e6c9', boxShadow: '0 6px 18px rgba(0,0,0,0.05)' }}>
                                    <IonCardContent style={{ padding: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                            <IonIcon icon={shieldCheckmarkOutline} style={{ fontSize: '28px', color: '#2E7D32' }} />
                                            <h3 style={{ fontWeight: 'bold', color: '#2E7D32', margin: '0' }}>Panel de Administración</h3>
                                        </div>
                                        <IonList lines="full">
                                            {usuarios.map((user) => (
                                                <IonItem key={user.id} style={{ '--padding-start': '0' }}>
                                                    <IonLabel>
                                                        <h2 style={{ fontWeight: '600' }}>{user.username}</h2>
                                                        <p>{user.email} — Ubicación: {user.comuna || 'No especificada'}, {user.region || ''}</p>
                                                    </IonLabel>
                                                    <IonButton slot="end" color="danger" fill="clear" onClick={() => eliminarUsuario(user.id)}>
                                                        <IonIcon slot="icon-only" icon={trashOutline} />
                                                    </IonButton>
                                                </IonItem>
                                            ))}
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        )}
                    </IonRow>
                </IonGrid>
                <IonToast isOpen={!!toastMessage} message={toastMessage} duration={2000} onDidDismiss={() => setToastMessage('')} />
            </IonContent>
        </IonPage>
    );
};

export default Perfil;