import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightSidebarComponent } from './right-sidebar/rightsidebar.component';
import { NavigationComponent } from './header-navigation/navigation.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MobileSidebarToggleDirective, RightSidebarToggleDirective } from './sidebar.directive';
import { RouterModule } from '@angular/router';
import { IAuthenServiceToken, AuthenService, ILogoutServiceToken, TestLogoutService } from 'src/app/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SidebarComponent,
    RightSidebarComponent,
    NavigationComponent,
    BreadcrumbComponent,
    MobileSidebarToggleDirective,
    RightSidebarToggleDirective,
  ],
  
  providers: [{provide: ILogoutServiceToken, useClass: TestLogoutService}],
  exports: [
    SidebarComponent,
    RightSidebarComponent,
    NavigationComponent,
    BreadcrumbComponent,
    MobileSidebarToggleDirective,
    RightSidebarToggleDirective,
  ]
})
export class ThemeModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: ThemeModule, providers: [] };
  }
}
