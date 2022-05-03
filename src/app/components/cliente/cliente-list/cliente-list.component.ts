import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-list",
  templateUrl: "./cliente-list.component.html",
  styleUrls: ["./cliente-list.component.css"],
})
export class ClienteListComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  displayedColumns: string[] = ["id", "nome", "cpf", "email", "acoes"];

  ELEMENT_DATA: Cliente[] = [
    {
      id: 1,
      nome: "Cliente 1",
      email: "cliente@mail.com",
      cpf: "000.000.000-00",
      senha: "123",
      perfis: ["ADMIN"],
      dataCriacao: new Date(),
    },
  ];

  clientes = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientes$ = this.service.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.clientes = new MatTableDataSource<Cliente>(response);
      this.clientes.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientes.filter = filterValue.trim().toLowerCase();
  }
}
