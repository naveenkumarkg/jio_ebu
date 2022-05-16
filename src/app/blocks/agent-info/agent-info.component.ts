import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signupRoute } from 'src/app/shared';
import { SetAgentInfoAction } from 'src/app/state/actions';
import { AgentInfo } from 'src/app/shared/model';
import { getAgentInfoSelector } from 'src/app/state/selectors';
import { SignUpService } from 'src/app/shared/services/sign-up.service';

@Component({
    selector: 'mtn-agent-info',
    templateUrl: './agent-info.component.html',
    styleUrls: ['./agent-info.component.scss'],
})
export class AgentInfoComponent implements OnInit, AfterViewInit {
    agentForm: FormGroup;
    selectedChannel = 'Self-Service';
    agentNumberValid = false;
    focusAgentInputNumber = false;
    agentNumberInputValid = false;
    agentNumberInputInvalid = false;

    get agentNumber(): FormGroup {
        return this.agentForm.get('agentNumber') as FormGroup;
    }

    get agentNumberValue(): string {
        return this.agentNumber.value.inputNumberArray.join('');
    }

    get agentNumberArray(): FormArray {
        /* tslint:disable:no-string-literal */
        return this.agentNumber['controls'].inputNumberArray as FormArray;
    }

    constructor(private router: Router, private store: Store, private signUpService: SignUpService) {}

    ngOnInit(): void {
        this.buildFormGroup();
        this.getSelectedAgentFromState();
    }

    ngAfterViewInit(): void {
        this.getSelectedAgentFromState();
    }

    buildFormGroup(): void {
        this.agentForm = new FormGroup({
            channelName: new FormControl(null),
            agentNumber: new FormGroup({}),
        });

        this.agentNumber.valueChanges.subscribe(changes => {
            if (this.selectedChannel === 'Informal Agent' && this.agentNumberValue.length > 3) {
                this.agentNumberInputValid = true;
            } else {
                this.agentNumberInputValid = false;
            }
        });
    }

    getSelectedAgentFromState(): void {
        this.store.select(getAgentInfoSelector).subscribe(agent => {
            if (agent) {
                this.selectedChannel = agent.channelName;
                if (this.selectedChannel === 'BRC Agent') {
                    this.agentNumberArray?.patchValue(agent?.brcAgentNumber?.split(''));
                    this.focusAgentInputNumber = agent.brcAgentNumber > 0 ? true : false;
                } else if (this.selectedChannel === 'Informal Agent') {
                    this.agentNumberArray?.patchValue(agent?.informalAgentNumber.split(''));
                    this.focusAgentInputNumber = agent.informalAgentNumber > 0 ? true : false;
                }
            }
        });
    }

    changeOption(option): void {
        this.selectedChannel = option;
        this.focusAgentInputNumber = false;
    }

    onKeyDownEvent(event): void {
        this.onNext();
    }

    onNext(): void {
        const agent = new AgentInfo(
            this.agentForm.get('channelName').value,
            this.selectedChannel === 'BRC Agent' ? this.agentNumberValue : '',
            this.selectedChannel === 'Informal Agent' ? this.agentNumberValue : ''
        );

        if (this.validateForm()) {
            this.store.dispatch(new SetAgentInfoAction(agent));
            this.router.navigate([signupRoute]);
            this.signUpService.isAuthenticateState();
        }
    }

    validateForm(): boolean {
        if (
            this.agentForm.get('channelName').value === 'Self-Service' ||
            (this.selectedChannel === 'BRC Agent' && this.agentNumber[`controls`].inputNumberArray?.value.join('').length === 6) ||
            (this.selectedChannel === 'Informal Agent' && this.agentNumber[`controls`].inputNumberArray?.value.join('').length > 3)
        ) {
            return true;
        } else {
            return false;
        }
    }

    inputChange(e): void {
        const arrValue = this.agentNumber[`controls`]?.inputNumberArray?.value?.join('');
        this.clearInputValue();
        this.agentNumberArray.patchValue(arrValue.split(''));
    }

    clearInputValue(): void {
        const controls = this.agentNumber[`controls`]['inputNumberArray']['controls'];
        controls.forEach(control => {
            control.setValue('');
        });
    }

    checkSpecialChar(): boolean {
        const value = this.agentNumber.value.inputNumberArray.join('');
        /* tslint:disable:no-string-literal */
        return this.isNumber(value);
    }

    isNumber(value: string | number): boolean {
        return value != null && value !== '' && !isNaN(Number(value.toString()));
    }
}
