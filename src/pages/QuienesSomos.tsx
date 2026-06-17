import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonText,
    IonButtons,
    IonBackButton
} from '@ionic/react';
import { homeOutline, searchOutline, heartOutline, businessOutline } from 'ionicons/icons';

const QuienesSomos: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" text="Volver" />
                    </IonButtons>
                    <IonTitle>Conoce Huellas Seguras</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {/* IMAGEN DE CABECERA (HERO) */}
                <div style={{
                    width: '100%',
                    height: '250px',
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div>
                        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', margin: '0 0 10px 0' }}>Nuestra Misión</h1>
                        <p style={{ fontSize: '1.2rem', margin: 0 }}>Salvando huellas, conectando corazones</p>
                    </div>
                </div>

                <IonGrid style={{ maxWidth: '1000px', marginTop: '30px', paddingBottom: '40px' }}>
                    
                    {/* SECCIÓN: QUIÉNES SOMOS + IMAGEN LATERAL */}
                    <IonRow className="ion-align-items-center">
                        <IonCol size="12" sizeMd="6" className="ion-padding">
                            <IonText color="dark">
                                <h2 style={{ fontWeight: 'bold', color: '#2E7D32', marginTop: '0' }}>¿Quiénes Somos?</h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' }}>
                                    Somos un equipo de desarrolladores y amantes de los animales unidos por una causa común. 
                                    Este proyecto nace de la necesidad de dar visibilidad a los peludos en situación de calle 
                                    y facilitar su rescate mediante el uso de la tecnología.
                                </p>

                                <h2 style={{ fontWeight: 'bold', color: '#2E7D32' }}>¿Qué Queremos?</h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
                                    Nuestra misión es reducir la cantidad de animales abandonados. Queremos crear una red solidaria 
                                    donde reportar un animal perdido, encontrar mascotas en adopción y conectar con refugios sea 
                                    rápido, seguro y accesible para todos.
                                </p>
                            </IonText>
                        </IonCol>

                        <IonCol size="12" sizeMd="6" className="ion-padding">
                            {/* NUEVA IMAGEN INLINE */}
                            <img 
                                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80" 
                                alt="Perrito rescatado y feliz" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    borderRadius: '15px', 
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                                    objectFit: 'cover',
                                    maxHeight: '400px'
                                }} 
                            />
                        </IonCol>
                    </IonRow>

                    {/* LÍNEA SEPARADORA VISUAL */}
                    <hr style={{ borderTop: '1px solid #e0e0e0', margin: '40px 20px' }} />

                    {/* TÍTULO: PARA QUÉ SIRVE */}
                    <IonRow>
                        <IonCol size="12">
                            <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: '#444', marginBottom: '25px' }}>
                                ¿Qué puedes hacer en nuestra plataforma?
                            </h3>
                        </IonCol>
                    </IonRow>

                    {/* TARJETAS DE PROPÓSITO */}
                    <IonRow>
                        <IonCol size="12" sizeMd="6">
                            <IonCard style={{ height: '100%', margin: '0' }}>
                                <IonCardHeader>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '50%' }}>
                                            <IonIcon icon={homeOutline} style={{ fontSize: '28px', color: '#2E7D32' }} />
                                        </div>
                                        <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Adopciones</IonCardTitle>
                                    </div>
                                </IonCardHeader>
                                <IonCardContent>
                                    Facilitamos el proceso para que encuentres a tu nuevo mejor amigo. Busca entre los animalitos disponibles y dales una segunda oportunidad de tener un hogar.
                                </IonCardContent>
                            </IonCard>
                        </IonCol>

                        <IonCol size="12" sizeMd="6">
                            <IonCard style={{ height: '100%', margin: '0' }}>
                                <IonCardHeader>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ padding: '12px', background: '#fff3e0', borderRadius: '50%' }}>
                                            <IonIcon icon={searchOutline} style={{ fontSize: '28px', color: '#e65100' }} />
                                        </div>
                                        <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Mascotas Extraviadas</IonCardTitle>
                                    </div>
                                </IonCardHeader>
                                <IonCardContent>
                                    ¿Perdiste a tu mascota o encontraste a una? Utiliza nuestro sistema de reportes para publicar fotos y ubicaciones, ayudando a que vuelvan a casa rápido.
                                </IonCardContent>
                            </IonCard>
                        </IonCol>

                        <IonCol size="12" sizeMd="6" style={{ marginTop: '15px' }}>
                            <IonCard style={{ height: '100%', margin: '0' }}>
                                <IonCardHeader>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ padding: '12px', background: '#ffebee', borderRadius: '50%' }}>
                                            <IonIcon icon={heartOutline} style={{ fontSize: '28px', color: '#c62828' }} />
                                        </div>
                                        <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Ayuda y Rescate</IonCardTitle>
                                    </div>
                                </IonCardHeader>
                                <IonCardContent>
                                    Si ves a un animal herido, abandonado o en situación de peligro, puedes solicitar ayuda rápidamente para que la comunidad se organice y acuda a su rescate.
                                </IonCardContent>
                            </IonCard>
                        </IonCol>

                        <IonCol size="12" sizeMd="6" style={{ marginTop: '15px' }}>
                            <IonCard style={{ height: '100%', margin: '0' }}>
                                <IonCardHeader>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ padding: '12px', background: '#e3f2fd', borderRadius: '50%' }}>
                                            <IonIcon icon={businessOutline} style={{ fontSize: '28px', color: '#1565c0' }} />
                                        </div>
                                        <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Red de Fundaciones</IonCardTitle>
                                    </div>
                                </IonCardHeader>
                                <IonCardContent>
                                    Conectamos esfuerzos. Las organizaciones, refugios y municipalidades pueden gestionar sus casos, recibir apoyo voluntario y dar visibilidad a su labor.
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>

                    {/* SECCIÓN: COMPROMISO (BANNER FINAL) */}
                    <IonRow style={{ marginTop: '40px' }}>
                        <IonCol size="12">
                            <div style={{ 
                                background: '#f1f8e9', 
                                padding: '30px 20px', 
                                borderRadius: '15px', 
                                textAlign: 'center',
                                border: '1px solid #c5e1a5',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                            }}>
                                <IonIcon icon={heartOutline} style={{ fontSize: '40px', color: '#558b2f', marginBottom: '10px' }} />
                                <h2 style={{ color: '#33691e', fontWeight: 'bold', marginTop: '0' }}>Nuestro Compromiso</h2>
                                <p style={{ color: '#555', fontSize: '1.1rem', margin: '0 auto', maxWidth: '700px' }}>
                                    Creemos en la empatía, el respeto y la acción ciudadana. Cada reporte generado en nuestra 
                                    plataforma es un paso más hacia un mundo donde cada animal tenga un hogar seguro y lleno de cariño. 
                                    <strong> ¡Tu ayuda hace la diferencia!</strong>
                                </p>
                            </div>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default QuienesSomos;