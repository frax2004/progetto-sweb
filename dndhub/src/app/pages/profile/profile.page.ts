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
import { CurrentEdit } from './current.edit';
import { ButtonContext } from 'src/app/components/button/ButtonContext';



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

  
  private currentEdit?: CurrentEdit = undefined;
  public isAdmin = State.User.isAdmin;
  public reports = signal<ReportRequest[]>([]);
  public usernameField = signal<string>("");
  public emailField = signal<string>("");
  public passwordField = signal<string>("");
  public editMode = signal<boolean>(false);
  public reportsFilter = signal<string>("");
  public static REPORT_LOADING_THRESHOLD = 16;

  constructor(
    private reportsService: ReportsService,
    private authService: AuthService,
    private userService: UserUtilitiesService, 
    public popoverController: PopoverController, 
    private router: Router
  ) {}


  public goBack = () => Navigate.toPath(this.router, 'landing-page')();

  public enableAccountEdit = () => {
    this.currentEdit = {
      email: this.emailField(),
      password: this.passwordField(),
      username: this.usernameField(),
    };
    this.editMode.set(true);
  }

  public setUsernameField = value => this.usernameField.set(value);
  public setPasswordField = value => this.passwordField.set(value);
  public setEmailField = value => this.emailField.set(value);

  public save = () => {
    if(this.currentEdit === undefined) return;
    const noChanges = this.currentEdit.email === this.emailField()
    && this.currentEdit.password === this.passwordField()
    &&  this.currentEdit.username === this.usernameField();
    
    const success = _ => {
      this.currentEdit = undefined;
      this.editMode.set(false);
      Alerts.good("Information saved with success");
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

  public deleteAccount = async () => {
    const success = async (res: any) => {
      State.User.isLogged.set(false);
      State.User.isAdmin.set(false);
      await this.router.navigate(['/landing-page']);

      Alerts.good(res.message);
    };

    const fail = res => Alerts.error(res.error);

    Alerts.show({
      header: "Be careful!",
      subHeader: "Irreversible action",
      message: "Are you sure you want to delete the account",
      cssClass: 'delete-account-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Proceed',
          role: 'confirm',
          handler: () => this.authService.deleteAccount(success, fail)
        }
      ]
    });

  }

  public setReportsFilter = value => {
    this.reportsFilter.set(value !== '' ? `WHERE account LIKE '%${value}%'` : '');
    this.reports.set([]);
    this.moreReports({});
  }


  public reportCloser = (report: ReportRequest) => {
    const success = (_: any) => {
      this.reports.update((reports: ReportRequest[]) => {
        reports.splice(reports.indexOf(report, 0), 1);
        return reports;
      });
      Alerts.good("Report closed with success");
    };

    return (_: any) => this.reportsService.closeReport(
      report.sender, 
      report.when, 
      success,
      Alerts.error
    );
  }

  public moreReports = (e) => {
    const toReport = (report: any): ReportRequest => {
      const obj = {
        sender: report.account,
        when: report.quando,
        reason: report.tipo,
        description: report.contenuto,
        onClose: (e: any) => {}
      };
      obj.onClose = this.reportCloser(obj);
      return obj;
    };

    const success = res => {
      this.reports.set(this.reports().concat(res.reports.map(toReport)));
    };
  
    this.reportsService.loadReports(
      ProfilePage.REPORT_LOADING_THRESHOLD,
      this.reports().length,
      this.reportsFilter(),
      success,
      Alerts.error
    );
  }


  public onTabChange(tab: string) {
    if(tab === 'reports') {
      this.reports.set([]);
      this.moreReports(this.reportsFilter());
    }
  }

  public logOut = () => {
    const success = async (res: any) => {
      State.User.isLogged.set(false);
      State.User.isAdmin.set(false);
      await this.router.navigate(['/landing-page']);

      Alerts.good(res.message);
    };

    const fail = res => Alerts.error(res.error);

    this.authService.logout(success, fail);
  }

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
