import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  // Referencia a la alerta
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert?: NgbAlert;
  private _message = new Subject<string>();
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Tiempo de duración y mensaje de la alerta
		this._message.subscribe((message) => (this.errorMessage = message));
		this._message.pipe(debounceTime(4000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }

  login() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe(
      (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        const role = res.user.role;
        var route = '';
        // redirecciona a el usuario a una ruta despues del login
        if (role === 'admin') {
          route = `/reports/student-reports`;
        } else {
          route = `/entries/course-entries`;
        }
        this.router.navigateByUrl(route).then(() => {
          //
        });
      },
      (err) => {
        if(err.status == 404) {
          this._message.next(`El correo electrónico no es válido`);
        } else if (err.status == 403) {
          this._message.next(`Contraseña incorrecta`);
        }
      }
    );
  }
}
