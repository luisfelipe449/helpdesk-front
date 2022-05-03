import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  User = {
    email: "",
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.User = this.sharedService.sharedUser;
    this.router.navigate(["home"]);
  }

  logout() {
    this.router.navigate(["/login"]);
    this.authService.logout();
    this.toast.info("Logout realizado com sucesso");
  }
}
