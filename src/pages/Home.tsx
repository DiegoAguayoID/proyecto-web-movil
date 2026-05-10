<<<<<<< HEAD
import { 
    IonButton, IonContent, IonHeader, IonInput, 
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonRouterLink
} from '@ionic/react';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle> FUNCIONANDO HOME</IonTitle>
                </IonToolbar>
            </IonHeader>
=======
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonMenuButton
} from '@ionic/react';

import {
    personOutline,
    addCircleOutline,
    heartOutline,
    megaphoneOutline,
    mapOutline,
    shieldCheckmarkOutline,
    pawOutline,
    peopleOutline,
    medicalOutline,
    trashOutline,
    businessOutline,
    checkmarkDoneOutline,
    homeOutline,
    arrowForwardOutline
} from 'ionicons/icons';

import React from 'react';

const Home: React.FC = () => {
    return (
        <IonPage>

            {/* HEADER */}
            <IonHeader className="ion-no-border">
                <IonToolbar
                    color="light"
                    style={{
                        padding: '8px 20px'
                    }}
                >

                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>

                    <IonTitle color="success">
                        Huellas Seguras
                    </IonTitle>

                    <IonButtons slot="end">

                        <IonButton
                            routerLink="/login"
                            fill="outline"
                            color="success"
                            shape="round"
                            className="ion-margin-end"
                        >
                            <IonIcon slot="start" icon={personOutline} />
                            Iniciar Sesión
                        </IonButton>

                        <IonButton
                            routerLink="/register"
                            color="success"
                            shape="round"
                        >
                            Registrarse
                        </IonButton>

                    </IonButtons>

                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                {/* HERO */}
                <div
                    style={{
                        minHeight: '75vh',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '0 8%',
                        backgroundImage:
                            `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)),
                            url('https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1920&q=80')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >

                    <div style={{ maxWidth: '650px' }}>

                        <IonText color="light">

                            <h1
                                style={{
                                    fontSize: '4rem',
                                    fontWeight: 'bold',
                                    lineHeight: '1.1',
                                    marginBottom: '25px'
                                }}
                            >
                                Ayudemos a reducir la cantidad de animales abandonados en nuestras calles
                            </h1>

                            <p
                                style={{
                                    fontSize: '1.2rem',
                                    lineHeight: '1.7',
                                    opacity: '0.95',
                                    marginBottom: '35px'
                                }}
                            >
                                Plataforma colaborativa para reportar animales callejeros,
                                fomentar la adopción responsable y apoyar la gestión municipal.
                            </p>

                        </IonText>

                        {/* BOTONES */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '15px'
                            }}
                        >

                            <IonButton
                                routerLink="/reportar"
                                color="success"
                                shape="round"
                                size="large"
                            >
                                <IonIcon slot="start" icon={addCircleOutline} />
                                Reportar Animal
                            </IonButton>

                            <IonButton
                                routerLink="/adopciones"
                                fill="solid"
                                color="light"
                                shape="round"
                                size="large"
                            >
                                <IonIcon slot="start" icon={pawOutline} />
                                Ver Animales
                            </IonButton>

                            <IonButton
                                fill="outline"
                                color="light"
                                shape="round"
                                size="large"
                            >
                                Conocer Más
                            </IonButton>

                        </div>

                    </div>

                </div>

                {/* PROBLEMA */}
                <div
                    style={{
                        background: '#f7f8f5',
                        padding: '60px 20px'
                    }}
                >

                    <IonGrid style={{ maxWidth: '1250px', margin: '0 auto' }}>

                        <div
                            style={{
                                background: '#eef1ea',
                                borderRadius: '24px',
                                padding: '40px'
                            }}
                        >

                            <IonRow
                                className="ion-align-items-center"
                            >

                                <IonCol size="12" sizeMd="5">

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '20px'
                                        }}
                                    >

                                        <div
                                            style={{
                                                minWidth: '70px',
                                                height: '70px',
                                                borderRadius: '50%',
                                                background: '#2E7D32',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <IonIcon
                                                icon={heartOutline}
                                                style={{
                                                    color: 'white',
                                                    fontSize: '32px'
                                                }}
                                            />
                                        </div>

                                        <div>

                                            <h2
                                                style={{
                                                    color: '#2E7D32',
                                                    fontWeight: 'bold',
                                                    marginBottom: '15px'
                                                }}
                                            >
                                                ¿Por qué existe este problema?
                                            </h2>

                                            <p
                                                style={{
                                                    color: '#444',
                                                    lineHeight: '1.8'
                                                }}
                                            >
                                                Miles de perros y gatos viven actualmente
                                                en situación de abandono, enfrentándose
                                                a hambre, enfermedades y accidentes.
                                                La falta de tenencia responsable y la
                                                insuficiente gestión municipal provocan
                                                riesgos para la salud pública y problemas ambientales.
                                            </p>

                                        </div>

                                    </div>

                                </IonCol>

                                <IonCol size="12" sizeMd="7">

                                    <IonGrid>

                                        <IonRow className="ion-text-center">

                                            <IonCol>
                                                <IonIcon
                                                    icon={medicalOutline}
                                                    style={{
                                                        fontSize: '40px',
                                                        color: '#2E7D32'
                                                    }}
                                                />
                                                <p style={{ fontWeight: '600' }}>
                                                    Riesgos para la salud pública
                                                </p>
                                            </IonCol>

                                            <IonCol>
                                                <IonIcon
                                                    icon={trashOutline}
                                                    style={{
                                                        fontSize: '40px',
                                                        color: '#2E7D32'
                                                    }}
                                                />
                                                <p style={{ fontWeight: '600' }}>
                                                    Problemas ambientales
                                                </p>
                                            </IonCol>

                                            <IonCol>
                                                <IonIcon
                                                    icon={pawOutline}
                                                    style={{
                                                        fontSize: '40px',
                                                        color: '#2E7D32'
                                                    }}
                                                />
                                                <p style={{ fontWeight: '600' }}>
                                                    Maltrato animal
                                                </p>
                                            </IonCol>

                                            <IonCol>
                                                <IonIcon
                                                    icon={businessOutline}
                                                    style={{
                                                        fontSize: '40px',
                                                        color: '#2E7D32'
                                                    }}
                                                />
                                                <p style={{ fontWeight: '600' }}>
                                                    Gestión insuficiente
                                                </p>
                                            </IonCol>

                                        </IonRow>

                                    </IonGrid>

                                </IonCol>

                            </IonRow>

                        </div>

                    </IonGrid>

                </div>

                {/* FUNCIONALIDADES */}
                <div style={{ padding: '40px 20px' }}>

                    <IonText color="success">

                        <h2
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}
                        >
                            ¿Qué puedes hacer con Huellas Seguras?
                        </h2>

                    </IonText>

                    <div
                        style={{
                            width: '60px',
                            height: '4px',
                            background: '#2E7D32',
                            margin: '0 auto 40px auto',
                            borderRadius: '10px'
                        }}
                    />

                    <IonGrid style={{ maxWidth: '1300px', margin: '0 auto' }}>

                        <IonRow>

                            {[
                                {
                                    icon: megaphoneOutline,
                                    title: 'Reportar animales',
                                    text: 'Registra animales abandonados con foto y ubicación.'
                                },
                                {
                                    icon: homeOutline,
                                    title: 'Sistema de adopción',
                                    text: 'Encuentra animales disponibles para adopción.'
                                },
                                {
                                    icon: mapOutline,
                                    title: 'Mapa interactivo',
                                    text: 'Visualiza zonas con mayor presencia de animales.'
                                },
                                {
                                    icon: shieldCheckmarkOutline,
                                    title: 'Solicitar rescate',
                                    text: 'Pide ayuda a organizaciones o municipios.'
                                },
                                {
                                    icon: checkmarkDoneOutline,
                                    title: 'Seguimiento de casos',
                                    text: 'Revisa el estado de tus reportes.'
                                },
                                {
                                    icon: personOutline,
                                    title: 'Perfil de usuario',
                                    text: 'Gestiona reportes y adopciones.'
                                }
                            ].map((item, index) => (
                                <IonCol
                                    key={index}
                                    size="12"
                                    sizeMd="4"
                                    sizeLg="2"
                                >

                                    <IonCard
                                        routerLink="/construccion" 
                                        button={true}
                                        style={{
                                            borderRadius: '18px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                                            height: '100%',
                                            cursor: 'pointer'
                                        }}
                                    >

                                        <IonCardContent
                                            className="ion-text-center"
                                        >

                                            <div
                                                style={{
                                                    width: '65px',
                                                    height: '65px',
                                                    borderRadius: '50%',
                                                    background: '#2E7D32',
                                                    margin: '0 auto 20px auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >

                                                <IonIcon
                                                    icon={item.icon}
                                                    style={{
                                                        color: 'white',
                                                        fontSize: '32px'
                                                    }}
                                                />

                                            </div>

                                            <h3
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                {item.title}
                                            </h3>

                                            <p
                                                style={{
                                                    color: '#555',
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {item.text}
                                            </p>

                                        </IonCardContent>

                                    </IonCard>

                                </IonCol>
                            ))}

                        </IonRow>

                    </IonGrid>

                </div>

                {/* COMO FUNCIONA */}
                <IonRow className="ion-align-items-start ion-text-center">

                            {/* PASO 1 (3 columnas) */}
                            <IonCol size="12" sizeMd="3">
                                <div style={{
                                    width: '90px', height: '90px', borderRadius: '50%',
                                    background: '#dfe8da', margin: '0 auto 20px auto',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <IonIcon icon={megaphoneOutline} style={{ fontSize: '42px', color: '#2E7D32' }} />
                                </div>
                                <h3 style={{ fontWeight: 'bold' }}>1. Reporta</h3>
                                <p>Encuentra un animal en situación de abandono y repórtalo en nuestra plataforma.</p>
                            </IonCol>

                            {/* FLECHA 1 (1 columna) */}
                            <IonCol size="12" sizeMd="1" className="ion-hide-md-down" style={{ marginTop: '25px' }}>
                                <IonIcon icon={arrowForwardOutline} style={{ fontSize: '35px', color: '#2E7D32' }} />
                            </IonCol>

                            {/* PASO 2 (4 columnas - Le damos un poco más de espacio al centro) */}
                            <IonCol size="12" sizeMd="4">
                                <div style={{
                                    width: '90px', height: '90px', borderRadius: '50%',
                                    background: '#dfe8da', margin: '0 auto 20px auto',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <IonIcon icon={peopleOutline} style={{ fontSize: '42px', color: '#2E7D32' }} />
                                </div>
                                <h3 style={{ fontWeight: 'bold' }}>2. Revisamos</h3>
                                <p>La comunidad y administradores revisan el caso y coordinan ayuda.</p>
                            </IonCol>

                            {/* FLECHA 2 (1 columna) */}
                            <IonCol size="12" sizeMd="1" className="ion-hide-md-down" style={{ marginTop: '25px' }}>
                                <IonIcon icon={arrowForwardOutline} style={{ fontSize: '35px', color: '#2E7D32' }} />
                            </IonCol>

                            {/* PASO 3 (3 columnas) */}
                            <IonCol size="12" sizeMd="3">
                                <div style={{
                                    width: '90px', height: '90px', borderRadius: '50%',
                                    background: '#dfe8da', margin: '0 auto 20px auto',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <IonIcon icon={heartOutline} style={{ fontSize: '42px', color: '#2E7D32' }} />
                                </div>
                                <h3 style={{ fontWeight: 'bold' }}>3. Rescatamos o adoptamos</h3>
                                <p>Se coordina el rescate o adopción responsable para darles una mejor vida.</p>
                            </IonCol>

                        </IonRow>

                {/* FOOTER */}
                <div
                    style={{
                        background:
                            'linear-gradient(90deg, #0f2b15, #1d5b2d)',
                        color: 'white',
                        padding: '50px 20px'
                    }}
                >

                    <IonGrid style={{ maxWidth: '1300px', margin: '0 auto' }}>

                        <IonRow>

                            <IonCol size="12" sizeMd="3">

                                <h2 style={{ fontWeight: 'bold' }}>
                                    Huellas Seguras
                                </h2>

                                <p>
                                    Construyamos juntos una ciudad
                                    más responsable con los animales.
                                </p>

                            </IonCol>

                            <IonCol size="12" sizeMd="3">

                                <h3>Enlaces rápidos</h3>

                                <p>Inicio</p>
                                <p>Reportes</p>
                                <p>Adopciones</p>

                            </IonCol>

                            <IonCol size="12" sizeMd="3">

                                <h3>Información</h3>

                                <p>Términos y condiciones</p>
                                <p>Preguntas frecuentes</p>
                                <p>Contacto</p>

                            </IonCol>

                            <IonCol size="12" sizeMd="3">

                                <h3>Contacto</h3>

                                <p>contacto@huellasseguras.cl</p>
                                <p>+56 9 1234 5678</p>
                                <p>Valparaiso, Chile</p>

                            </IonCol>

                        </IonRow>

                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '40px',
                                opacity: '0.8'
                            }}
                        >
                        </div>

                    </IonGrid>

                </div>

            </IonContent>

>>>>>>> 7c414ee419a90f4cbb9478144ad2b783c75fc19f
        </IonPage>
    );
};

export default Home;