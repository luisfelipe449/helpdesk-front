import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Credenciais } from "src/app/models/credenciais";
import { AuthService } from "src/app/services/auth.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  creds: Credenciais = {
    email: "",
    senha: "",
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

  logar() {
    this.service.authenticate(this.creds).subscribe(
      (response) => {
        this.service.succesfulLogin(
          response.headers.get("Authorization").substring(7)
        );
        this.sharedService.sharedUser = this.creds;
        this.router.navigate([""]);
      },
      () => {
        this.toast.error("Usuario e/ou senha invalidos");
      }
    );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
