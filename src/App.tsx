import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, IonRouterOutlet, setupIonicReact, 
  IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuButton 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { homeOutline, megaphoneOutline, pawOutline, informationCircleOutline } from 'ionicons/icons';

import Construccion from './pages/Construccion';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportarAnimal from './pages/ReportarAnimal';

/* CSS básico de Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';

setupIonicReact();

const PrivateRoute: React.FC<{ component: React.ComponentType<any>; path: string; exact?: boolean }> = 
({ component: Component, ...rest }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null; 
    return (
        <Route {...rest} render={(props) => isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />} />
    );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        {/* MENU LATERAL (Se abre desde la izquierda) */}
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Opciones</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem routerLink="/home" detail={false}>
                <IonIcon icon={homeOutline} slot="start" />
                <IonLabel>Inicio</IonLabel>
              </IonItem>
              <IonItem routerLink="/reportar" detail={false}>
                <IonIcon icon={megaphoneOutline} slot="start" />
                <IonLabel>Reportar Caso</IonLabel>
              </IonItem>
              <IonItem routerLink="/adopciones" detail={false}>
                <IonIcon icon={pawOutline} slot="start" />
                <IonLabel>Adopciones</IonLabel>
              </IonItem>
              <IonItem routerLink="/about" detail={false}>
                <IonIcon icon={informationCircleOutline} slot="start" />
                <IonLabel>Sobre Nosotros</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        {/* CONTENIDO PRINCIPAL */}
        <IonRouterOutlet id="main-content">
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/report" component={ReportarAnimal}/>
          
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          
          <Route exact path="/construccion">
              <Construccion />
          </Route>
          
          <Route exact path="/adopciones">
            <div style={{ padding: '40px' }}>Próximamente</div>
          </Route>

          <Route exact path="/about">
            <div style={{ padding: '40px' }}>Próximamente</div>
          </Route>

          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;