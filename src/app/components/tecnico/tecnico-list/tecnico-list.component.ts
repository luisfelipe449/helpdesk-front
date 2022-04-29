import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Tecnico } from "src/app/models/tecnico";

@Component({
  selector: "app-tecnico-list",
  templateUrl: "./tecnico-list.component.html",
  styleUrls: ["./tecnico-list.component.css"],
})
export class TecnicoListComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "nome",
    "cpf",
    "email",
    "acoes",
  ];

  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: "Tecnico 1",
      email: "tecnico@mail.com",
      cpf: "000.000.000-00",
      senha: "123",
      perfis: ["ADMIN"],
      dataCriacao: new Date(),
    },
  ];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() {}

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
