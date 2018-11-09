import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { IAuthenServiceToken, AuthenService, IDataServiceToken, DataService,
  IHelperServiceToken, HelperService } from '../core';
import { ToStringPipe } from './convertnumber-text.pipe';
import { ToStringPipe2, ToStringPipe3, ToStringPipe4, ToStringPipeAddress } from './convertnumber-text2.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotFoundComponent, ToStringPipe, ToStringPipe2, ToStringPipe3, ToStringPipe4, ToStringPipeAddress],
  providers: [
    {
      provide: IAuthenServiceToken,
      useClass: AuthenService
    },
    {
      provide: IDataServiceToken,
      useClass: DataService
    },
    {
      provide: IHelperServiceToken,
      useClass: HelperService
    }
  ],
  exports: [NotFoundComponent, ToStringPipe, ToStringPipe2, ToStringPipe3, ToStringPipe4, ToStringPipeAddress]
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
