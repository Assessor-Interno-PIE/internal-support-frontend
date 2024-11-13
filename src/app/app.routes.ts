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
import { UserFormComponent } from './components/pages/user/user-form/user-form.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "admin", component: PrincipalComponent, children: [
        {path: "dashboard", component: DashboardComponent},

        {path: "departamentos", component: DepartmentListComponent},
        {path: "departamentos/add", component: DepartmentFormComponent},
        {path: "departamentos/edit/:id", component: DepartmentFormComponent},

        {path: "documentos", component: DocumentsListComponent},
        {path: "documentos/add", component: DocumentsFormComponent},
        {path: "documentos/edit/{id}", component: DocumentsFormComponent},
        {path: "documentos/edit/:id", component: DocumentsFormComponent},
        {path: "configuracoes", component: ConfiguracoesComponent},


        {path: "users", component: UserListComponent},
        {path: "users/add", component: UserFormComponent},
        {path: "users/edit/:id", component: UserFormComponent},

        {path: "configuracoes", component: ConfiguracoesComponent},

        {path: "perfil", component: PerfilComponent}

    ] }
];


/*

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
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DashboardCadastroComponent } from './components/cadastro/dashboard-cadastro/dashboard-cadastro.component';
import { AccesslevelListComponent } from './components/accesslevel/accesslevel-list/accesslevel-list.component';
import { AccesslevelFormComponent } from './components/accesslevel/accesslevel-form/accesslevel-form.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "admin", component: PrincipalComponent, children: [
        {path: "dashboard", component: DashboardComponent},

        {path: "cadastro", component: CadastroComponent, children: [
        {path: "dashboard", component: DashboardCadastroComponent},
        {path: "departamentos", component: DepartmentListComponent},
        {path: "departamentos/add", component: DepartmentFormComponent},
        {path: "departamentos/edit/:id", component: DepartmentFormComponent},

        {path: "documentos", component: DocumentsListComponent},
        {path: "documentos/add", component: DocumentsFormComponent},
        {path: "documentos/edit/{id}", component: DocumentsFormComponent},

        {path: "users", component: UserListComponent},
        {path: "users/add", component: UserFormComponent},
        {path: "users/edit/:id", component: UserFormComponent},

        {path: "accesslevel", component: AccesslevelListComponent},
        {path: "accesslevel/add", component: AccesslevelFormComponent},
        {path: "accesslevel/edit/:id", component: AccesslevelFormComponent},

        {path: "category", component: CategoryListComponent},
        {path: "category/add", component: CategoryFormComponent},
        {path: "category/edit/:id", component: CategoryFormComponent},

        ]},
        {path: "configuracoes", component: ConfiguracoesComponent},

        {path: "perfil", component: PerfilComponent}
    ]} 
];*/