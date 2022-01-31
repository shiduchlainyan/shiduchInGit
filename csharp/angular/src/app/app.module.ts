import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CandidateComponent } from './candidate/candidate.component';
import { PersonalDetailsComponent } from './candidate/components/personal-details/personal-details.component';
import { DescriptionComponent } from './candidate/components/description/description.component';
import { BusinesComponent } from './candidate/components/busines/busines.component';
import { MoreDetailesComponent } from './candidate/components/more-detailes/more-detailes.component';
import { DocumentsComponent } from './candidate/components/documents/documents.component';
import { CriterionComponent } from './candidate/components/criterion/criterion.component';
import { CandidateService } from './Services/candidate.service';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { EnterComponent } from './enter/enter.component';
import { MatchMakerComponent } from './component/matchMaker/match-maker/match-maker.component';
import { Mail1Component } from './component/matchMaker/match-maker/mail1/mail1.component';
import { CalendarComponent } from './component/matchMaker/match-maker/calendar/calendar.component';
import { MigbalaComponent } from './candidate/components/migbala/migbala.component';
import { CompleteRegisterComponent } from './component/matchMaker/match-maker/complete-register/complete-register.component';
import { SuggestsComponent } from './component/second-candidate/suggests/suggests.component';
import { SecondCandidateComponent } from './component/second-candidate/second-candidate.component';
import { DetailsComponent } from './component/second-candidate/details/details.component';
import { AllSuggestsComponent } from './component/matchMaker//match-maker/all-suggests/all-suggests.component';
import { AllCandidateComponent } from './component/matchMaker/match-maker/all-candidate/all-candidate.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatchmakerRegisterComponent } from './component/matchMaker/match-maker/matchmaker-register/matchmaker-register.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { NewMeetingComponent } from './component/matchMaker/match-maker/calendar/new-meeting/new-meeting.component';
import { MailCandComponent } from './component/second-candidate/mail-cand/mail-cand.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth.guard';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './paypal/paypal.component';
import { ConfidentialityWaiverFormComponent } from './candidate/components/confidentiality-waiver-form/confidentiality-waiver-form.component';
import { HagashatBakashComponent } from './candidate/components/hagashat-bakash/hagashat-bakash.component';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { AboutProjectComponent } from './about-project/about-project.component';
import { StikyTopComponent } from './stiky-top/stiky-top.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'enter', component: EnterComponent },
  { path: 'paypal', component: PaypalComponent },
  { path: 'aboutProject', component: AboutProjectComponent },
   { path: 'stikyTop', component: StikyTopComponent },
  { path: 'detail-candidate', component: CandidateComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'pro', pathMatch: 'full' },
      { path: 'pro', component: PersonalDetailsComponent },
      { path: 'desc', component: DescriptionComponent },
      { path: 'migbala', component: MigbalaComponent },
      { path: 'busines', component: BusinesComponent },
      { path: 'moreDetailes', component: MoreDetailesComponent },
      { path: 'doc', component: DocumentsComponent },
      { path: 'criterion', component: CriterionComponent },
      { path: 'hagasha', component: HagashatBakashComponent },
   
    ]
  },
  {
    path: 'MatcMaker', component: MatchMakerComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'complitDitails', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'complitDitails', component: CompleteRegisterComponent , canActivate: [AuthGuard]},
      { path: 'calander', component: CalendarComponent , canActivate: [AuthGuard]},
      { path: 'allSuggest', component: AllSuggestsComponent , canActivate: [AuthGuard]},
      { path: 'allCandidate', component: AllCandidateComponent , canActivate: [AuthGuard]},
      { path: 'mail', component: Mail1Component, canActivate: [AuthGuard] },
      { path: 'matcMakerRegister', component: MatchmakerRegisterComponent , canActivate: [AuthGuard]},
    ]
  },

  {
    path: 'second-candidate', component: SecondCandidateComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'suggest', pathMatch: 'full' },
      { path: 'suggest', component: SuggestsComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'mailToMatcmaker', component: MailCandComponent },
      { path: 'calander', component: CalendarComponent },



    ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    DescriptionComponent,
    PersonalDetailsComponent,
    CandidateComponent,
    MigbalaComponent,
    BusinesComponent,
    DocumentsComponent,
    MoreDetailesComponent,
    CriterionComponent,
    HomePageComponent,
    RegisterComponent,
    EnterComponent,
    MatchMakerComponent,
    Mail1Component,
    CalendarComponent,
    CompleteRegisterComponent,
    SecondCandidateComponent,
    SuggestsComponent,
    DetailsComponent,
    AllSuggestsComponent,
    AllCandidateComponent,
    MatchmakerRegisterComponent,
    NewMeetingComponent,
    DetailsComponent,
    MailCandComponent,
    PaypalComponent,
    ConfidentialityWaiverFormComponent,
    HagashatBakashComponent,
    AboutProjectComponent,
    StikyTopComponent,
    

  ],
  imports: [
    NgxPayPalModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    

  ],


  entryComponents: [
    NewMeetingComponent,
    DetailsComponent,
    ConfidentialityWaiverFormComponent
  ],
  providers: [
    CandidateService,
    BsModalService,
    PersonalDetailsComponent,
    CandidateComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
  
}
