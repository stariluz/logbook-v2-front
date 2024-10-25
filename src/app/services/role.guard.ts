import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // Revisamos si el usuario tiene el rol de administrador para interactuar con la base de datos
        if(this.authService.isAuthenticated()) {
            let user: any = localStorage.getItem('user');
            if (user) user = JSON.parse(user);
    
            // Definimos los roles permitidos para cada ruta
            const allowedRoles = route.data['roles'] as Array<string>;
            if (allowedRoles && !allowedRoles.includes(user.user.role.toLowerCase())) {
                // Permite cambiar la ruta en función del rol del usuario
                if (user.user.role.toLowerCase() === 'admin') {
                    this.router.navigateByUrl('/reports/student-reports');
                } else {
                    this.router.navigateByUrl('/entries/course-entries');
                }
                return false;
            }
            return true;
        }
        this.router.navigateByUrl('/entries/course-entries');
        return false;
    }
}