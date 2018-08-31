import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { IAuthenServiceToken, AuthenService, IDataServiceToken, DataService } from '../core';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotFoundComponent],
  providers: [
    {
      provide: IAuthenServiceToken,
      useClass: AuthenService
    },
    {
      provide: IDataServiceToken,
      useClass: DataService
    }
  ],
  exports: [NotFoundComponent]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        {
          provide: IAuthenServiceToken,
          useClass: AuthenService
        },
        {
          provide: IDataServiceToken,
          useClass: DataService
        }
      ]
    };
  }
}
