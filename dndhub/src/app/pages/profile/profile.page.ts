import { 
  AfterViewInit, 
  Component, 
  OnInit, 
  signal, 
  ViewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonAlert, 
  IonContent, 
  IonHeader, 
  IonTitle,
  IonInput ,
  IonToolbar, 
  IonCol, 
  PopoverController, 
  IonLabel, 
  IonList, 
  IonItem, 
  IonGrid, 
  IonRow, 
  IonButton, 
  IonThumbnail, 
  IonSplitPane, 
  IonMenu,
  IonTab,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/angular/standalone';
import { 
  Alerts, 
  Navigate 
} from 'src/app/core/core';
import { ButtonComponent } from "src/app/components/button/button.component";
import { UnorderedListElementComponent } from "src/app/components/unordered-list-element/unordered-list-element.component";
import { TitleComponent } from "src/app/components/title/title.component";
import { LabelComponent } from "src/app/components/label/label.component";
import { EntryComponent } from 'src/app/components/entry/entry.component';
import { Router } from '@angular/router';
import { UserUtilitiesService } from 'src/app/services/user.utilities.service';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/core/state';
import { ReportCardComponent } from 'src/app/components/report-card/report-card.component';
import { ReportRequest } from 'src/app/components/report-card/report';
import { ReportsService } from 'src/app/services/reports.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    IonAlert, 
    IonTabs,
    IonTab,
    IonTabBar,
    IonTabButton,
    EntryComponent, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonInput, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonCol, 
    ButtonComponent, 
    IonLabel, 
    IonList, 
    UnorderedListElementComponent, 
    IonItem, 
    TitleComponent, 
    LabelComponent, 
    IonGrid, 
    IonRow, 
    IonButton, 
    IonThumbnail,
    ReportCardComponent
  ],
})
export class ProfilePage implements OnInit, AfterViewInit {

  usernameField = signal<string>("");
  emailField = signal<string>("");
  passwordField = signal<string>("");
  editMode = signal<boolean>(false);

  private currentEdit: {
    email: string;
    password: string;
    username: string;
  } | undefined = undefined;

  public isAdmin = State.User.isAdmin;
  public reports = signal<ReportRequest[]>([]);

  public static REPORT_LOADING_THRESHOLD = 16;

  public goBack = () => Navigate.toPath(this.router, 'landing-page')();

  public enableAccountEdit = () => {
    this.currentEdit = {
      email: this.emailField(),
      password: this.passwordField(),
      username: this.usernameField(),
    };
    this.editMode.set(true);
  }

  public save = () => {
    if(this.currentEdit === undefined) return;
    
    const noChanges = this.currentEdit.email === this.emailField()
    && this.currentEdit.password === this.passwordField()
    &&  this.currentEdit.username === this.usernameField();
    
    const success = _ => {
      this.currentEdit = undefined;
      this.editMode.set(false);
      Alerts.good("Le informazioni sono state salvate con successo");
    };

    const fail = res => {
      this.emailField.set(this.currentEdit.email);
      this.passwordField.set(this.currentEdit.password);
      this.usernameField.set(this.currentEdit.username);
      Alerts.error(res.error);
    };

    if(noChanges) return success({});

    this.userService.setUserInfo(
      this.emailField(), 
      this.passwordField(),
      this.usernameField(),
      success,
      fail
    );

  }

  private deleteAccount = async () => {
    const success = async (res: any) => {
      State.User.isLogged.set(false);
      State.User.isAdmin.set(false);
      await this.router.navigate(['/landing-page']);

      Alerts.good(res.message);
    };

    const fail = res => Alerts.error(res.error);

    Alerts.show({
      header: "Attenzione!",
      subHeader: "Azione irreversibile",
      message: "Sicuro di voler eliminare l'account?",
      cssClass: 'delete-account-alert',
      buttons: [
        {
          text: 'Cancella',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Procedi',
          role: 'confirm',
          handler: () => this.authService.deleteAccount(success, fail)
        }
      ]
    });

  }

  public moreReports = () => {
    const toReport = (report: any): ReportRequest => {
      return {
        sender: report.account,
        when: report.quando,
        reason: report.tipo,
        description: report.contenuto
      };
    };
  
    const success = res => {
      this.reports.set(this.reports().concat(res.reports.map(toReport)));
    };
  
    this.reportsService.loadReports(
      ProfilePage.REPORT_LOADING_THRESHOLD,
      this.reports().length,
      success,
      Alerts.error
    );
  }

  public onTabChange(tab: string) {
    if(tab === 'reports') {
      this.reports.set([]);
      this.moreReports();
    }
  }

  private logOut = () => {
    const success = async (res: any) => {
      State.User.isLogged.set(false);
      State.User.isAdmin.set(false);
      await this.router.navigate(['/landing-page']);

      Alerts.good(res.message);
    };

    const fail = res => Alerts.error(res.error);

    this.authService.logout(success, fail);
  }

  public buttons = {
    deleteAccount: { onClick: this.deleteAccount },
    logOut: { onClick: this.logOut },
    goBack: { onClick: this.goBack },
    enableAccountEdit: { onClick: this.enableAccountEdit },
    save: { onClick: this.save },
  };

  constructor(
    private reportsService: ReportsService,
    private authService: AuthService,
    private userService: UserUtilitiesService, 
    public popoverController: PopoverController, 
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.userService.getUserInfo(
      value => {
        console.log(JSON.stringify(value)); // TODO Da togliere (debug)
        State.User.isAdmin.set(value.isAdmin);
        this.usernameField.set(value.username);
        this.emailField.set(value.email);
        this.passwordField.set(value.password);
      }, 
      res => Alerts.error(res.error)
    );
  }

  ngOnInit() {}
}
