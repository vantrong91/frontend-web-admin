import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { SystemConfig, AccountManViewModel, IAccountServiceToken, IAccountService } from 'src/app/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements AfterViewInit, OnInit {

    // this is for the open close
    isActive = true;
    showMenu = '';
    showSubMenu = '';
    closeResult: string;
    currentUser: AccountManViewModel;
    constructor(private modalService: NgbModal,
        private router: Router,
        @Inject(IAccountServiceToken) private logoutService: IAccountService) { }

    addExpandClass(element: any) {


        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
        } else {
            this.showSubMenu = element;
        }
    }
    eventCalled() {
        this.isActive = !this.isActive;

    }

    logout(del) {
        this.modalService.open(del).result.then(result => {
            let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
            this.logoutService.Logout(this.currentUser[0].accountId).subscribe((response: any) => {
                if (response) {
                    localStorage.removeItem(SystemConfig.CURRENT_USER);
                }
            })
            //this.authService.Logout(item.data[0].accountId);
            this.router.navigateByUrl('/admin/login');
        },reason => (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`),);

    }
    private getDismissReason(reason: any) {
        switch (reason) {
            case ModalDismissReasons.ESC:
                return 'by pressing ESC';
            case ModalDismissReasons.BACKDROP_CLICK:
                return 'by clicking on a backdrop';
            default:
                return `with ${reason}`;
        }
    }

    ngOnInit(): void {
        this.currentUser = new AccountManViewModel();
        let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
        this.currentUser = item.data;
    }
    // End open close
    ngAfterViewInit() {
        $(function () {
            $('.sidebartoggler').on('click', function () {
                if ($('body').hasClass('mini-sidebar')) {
                    $('body').trigger('resize');
                    $('.scroll-sidebar, .slimScrollDiv').css('overflow', 'hidden').parent().css('overflow', 'visible');
                    $('body').removeClass('mini-sidebar');
                    $('.navbar-brand span').show();
                    // $(".sidebartoggler i").addClass("ti-menu");
                } else {
                    $('body').trigger('resize');
                    $('.scroll-sidebar, .slimScrollDiv').css('overflow-x', 'visible').parent().css('overflow', 'visible');
                    $('body').addClass('mini-sidebar');
                    $('.navbar-brand span').hide();
                    // $(".sidebartoggler i").removeClass("ti-menu");
                }
            });

        });
    }
}
