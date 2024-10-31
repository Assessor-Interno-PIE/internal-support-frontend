import { Routes } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PrincipalComponent } from './components/pages/principal/principal.component';
import { DocumentsComponent } from './components/pages/documents/documents.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { ConfiguracoesComponent } from './components/pages/configuracoes/configuracoes.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'admin', component: PrincipalComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'documentos', component: DocumentsComponent},
        {path: 'configuracoes', component: ConfiguracoesComponent},

        {path: 'perfil', component: PerfilComponent}

    ] } 
];
