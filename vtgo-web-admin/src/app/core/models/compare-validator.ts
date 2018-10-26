import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from "@angular/forms";
import { Subscription } from "rxjs";
import { Directive, Input } from "@angular/core";

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
