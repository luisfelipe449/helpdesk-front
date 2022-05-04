import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-list",
  templateUrl: "./tecnico-list.component.html",
  styleUrls: ["./tecnico-list.component.css"],
})
export class TecnicoListComponent implements OnInit {
  tecnicos$: Observable<Tecnico[]>;
  displayedColumns: string[] = ["id", "nome", "cpf", "email", "acoes"];

  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: "",
      email: "",
      cpf: "",
      senha: "",
      perfis: [""],
      dataCriacao: new Date(),
    },
  ];

  tecnicos = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TecnicoService) {}

  ngOnInit(): void {
    this.tecnicos$ = this.service.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.tecnicos = new MatTableDataSource<Tecnico>(response);
      this.tecnicos.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tecnicos.filter = filterValue.trim().toLowerCase();
  }
}
