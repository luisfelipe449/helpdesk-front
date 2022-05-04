import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  sharedUser: {
    // your properties here... e.g
    email: string;
  };

  constructor() { /* TODO document why this constructor is empty */ }
}
