import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {  Observable } from "rxjs";
import { Chamado } from "src/app/models/chamado";
import { ChamadoService } from "src/app/services/chamado.service";

@Component({
  selector: "app-chamado-list",
  templateUrl: "./chamado-list.component.html",
  styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {
  ngOnInit(): void {
    this.chamados$ = this.service.findAll();
  }
  chamados$: Observable<Chamado[]>;

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = [
    "id",
    "titulo",
    "cliente",
    "tecnico",
    "dataAbertura",
    "prioridade",
    "status",
    "acoes",
  ];
  chamados = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService,
  ) {}

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      this.chamados = new MatTableDataSource<Chamado>(resposta);
      this.chamados.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.chamados.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == "0") {
      return "BAIXA";
    } else if (prioridade == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }

  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach((element) => {
      if (element.status == status) list.push(element);
    });
    this.FILTERED_DATA = list;
    this.chamados = new MatTableDataSource<Chamado>(list);
    this.chamados.paginator = this.paginator;
  }
}
