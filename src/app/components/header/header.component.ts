import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { ItemService } from 'src/app/services/item.service';
import { SimulationModel } from 'src/app/models/simulation.model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private simulationService: ItemService,
    private sharedDataService: SharedDataService
    ) {
    this.form = this.formBuilder.group({
          dni: ['', [Validators.required, Validators.maxLength(9)]],
          amount: ['', [Validators.required]],
          installments: ['', [Validators.required]]
        });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    this.loadingService.startLoading();
    this.loadingService.stopError();
    event.preventDefault();

    if (this.form.valid) {
      const value = this.form.value;

      this.simulationService.creditSimulation(value).subscribe({
        next: (response: SimulationModel) => {
          if (response.status == 201 && response.installmentsValue) {
            this.loadingService.stoptLoading();
            this.loadingService.startAmount();
            this.loadingService.stopValid();
  
            this.sharedDataService.sharedDataValue = response.installmentsValue;
          } else {
            this.loadingService.stoptLoading();
            this.loadingService.startError();
          }
        },
        error: (error) => {
          if (error.ok == false) {
            console.log('Ha ocuarrido un error en el proceso', error)
            this.loadingService.stoptLoading();
            this.loadingService.startError();
            
          }
        }
      });
      this.form.reset();
    }
  }

  get dniField() {
    return this.form.get('dni');
  }

  get amountField() {
    return this.form.get('amount');
  }

  get installmentsField() {
    return this.form.get('installments');
  }
}
