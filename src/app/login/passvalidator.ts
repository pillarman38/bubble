import { FormGroup, AbstractControl } from '@angular/forms'
import { ɵConsole } from '@angular/core'

export function passValidator(control: AbstractControl) {
    if(control && (control.value !== null || control.value !== undefined)) {
        const passwordTwo = control.value

        console.log(passwordTwo)

        const passControl =  control.root.get('password')
        if(passControl) {

            const passValue = passControl.value

            if(passValue !== passwordTwo || passValue === '') {
                return {
                    isError: true
                }
            }
        }
    }
    return null
}