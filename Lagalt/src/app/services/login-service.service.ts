import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class LoginService {

    private elementVisibilitySubject = new BehaviorSubject<boolean>(false);
    
    setElementVisibility(isVisible: boolean) {
        //this.elementVisibilitySubject.next(isVisible);
        this.elementVisibilitySubject.next(isVisible);
      }
    
      getElementVisibility(): Observable<boolean> {
        return this.elementVisibilitySubject.asObservable();
      }
}
