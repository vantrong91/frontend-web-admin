import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Subscription } from "rxjs";

export function compareValidator(controlName: string): ValidatorFn{
    return (c: AbstractControl): ValidationErrors | null => {
        if(c.value === null || c.value.length === 0){
            return null;
        }
        const controlToCompare = c.root.get(controlName);
        if(controlToCompare){
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() =>{
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !==c.value ? {'compare' : true} : null;
    }
}