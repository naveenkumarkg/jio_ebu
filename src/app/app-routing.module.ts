import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    defaultRoute,
    loginOtpRoute,
    chooseWorkTitle,
    applicationSuccess,
    signupRoute,
    dashboardDefaultRoute,
    dashboardBusinessDirectRoute,
    agentRoute,
} from './shared/util/constants/router.constant';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ErrorComponent } from './layouts/error/error.component';
import { SignUpComponent } from './blocks/signUp/signUp.component';
import { OtpComponent } from './blocks/otp/otp.component';
import { ChooseWorkTitleComponent } from './blocks/choose-work-title/choose-work-title.component';
import { ApplicationSuccessComponent } from './blocks/application-success/application-success.component';
import { DashboardComponent } from './blocks/dashboard/dashboard.component';
import { BusinessComponent } from './blocks/dashboard/business/business.component';
import { HomeComponent } from './blocks/home/home.component';
import { AgentInfoComponent } from './blocks/agent-info/agent-info.component';
import { AuthGuard } from './auth.guards';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: defaultRoute, pathMatch: 'full' },
    {
        path: defaultRoute,
        component: HomeComponent,
        children: [
            { path: defaultRoute, redirectTo: agentRoute, pathMatch: 'full' },
            { path: agentRoute, component: AgentInfoComponent },
            { path: signupRoute, component: SignUpComponent, canActivate: [AuthGuard] },
            { path: loginOtpRoute, component: OtpComponent, canActivate: [AuthGuard] },
            { path: chooseWorkTitle, component: ChooseWorkTitleComponent, canActivate: [LoginGuard] },
            { path: defaultRoute, component: NavbarComponent, outlet: 'navbar' },
            { path: defaultRoute, component: FooterComponent, outlet: 'footer' },
        ],
    },
    {
        path: dashboardDefaultRoute,
        component: DashboardComponent,
        children: [
            { path: dashboardBusinessDirectRoute, component: BusinessComponent, canActivate: [LoginGuard] },
            { path: applicationSuccess, component: ApplicationSuccessComponent, canActivate: [LoginGuard] },
        ],
    },
    { path: '**', component: ErrorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
