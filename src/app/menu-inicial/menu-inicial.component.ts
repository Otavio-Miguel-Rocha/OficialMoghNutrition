import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu-inicial",
  templateUrl: "./menu-inicial.component.html",
  styleUrls: ["./menu-inicial.component.css"],
})
export class MenuInicialComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  mode: boolean = false;

  switchModeLogin(): void {
    this.mode = false;
  }
  switchModeRegister(): void {
    this.mode = true;
  }
}
