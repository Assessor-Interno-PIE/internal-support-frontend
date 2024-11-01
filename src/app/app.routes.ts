import { Routes } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PrincipalComponent } from './components/pages/principal/principal.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { ConfiguracoesComponent } from './components/pages/configuracoes/configuracoes.component';
import { DocumentsListComponent } from './components/pages/documents/documents-list/documents-list.component';
import { DocumentsFormComponent } from './components/pages/documents/documents-form/documents-form.component';
import { DepartmentListComponent } from './components/pages/department/department-list/department-list.component';
import { DepartmentFormComponent } from './components/pages/department/department-form/department-form.component';
import { PAGINASINVISIVEISComponent } from './components/paginas-invisiveis/paginas-invisiveis.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "admin", component: PrincipalComponent, children: [
        {path: "dashboard", component: DashboardComponent},

        {path: "pagInv", component: PAGINASINVISIVEISComponent},

        {path: "departamentos", component: DepartmentListComponent},
        {path: "departamentos/add", component: DepartmentFormComponent},
        {path: "departamentos/edit/{id}", component: DepartmentFormComponent},

        {path: "documentos", component: DocumentsListComponent},
        {path: "documentos/add", component: DocumentsFormComponent},
        {path: "documentos/edit/{id}", component: DocumentsFormComponent},
        {path: "configuracoes", component: ConfiguracoesComponent},

        {path: "perfil", component: PerfilComponent}

    ] } 
];
