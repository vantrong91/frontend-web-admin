import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountManViewModel, SystemConfig, IAccountServiceToken, IAccountService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {
    isActive = true;
    showMenu = '';
    showSubMenu = '';
    
    currentUser: AccountManViewModel;
    closeResult: string;
    name: string;

    ngOnInit(): void {
        this.currentUser = new AccountManViewModel();
        let item = JSON.parse(localStorage.getItem(SystemConfig.CURRENT_USER));
        this.currentUser = item.data;
    }


    constructor(private modalService: NgbModal,
        private router: Router,
        @Inject(IAccountServiceToken) private logoutService: IAccountService) { }

    // This is for Notifications
    notifications: Object[] = [{
        round: 'round-danger',
        icon: 'ti-link',
        title: 'Luanch Admin',
        subject: 'Just see the my new admin!',
        time: '9:30 AM'
    }, {
        round: 'round-success',
        icon: 'ti-calendar',
        title: 'Event today',
        subject: 'Just a reminder that you have event',
        time: '9:10 AM'
    }, {
        round: 'round-info',
        icon: 'ti-settings',
        title: 'Settings',
        subject: 'You can customize this template as you want',
        time: '9:08 AM'
    }, {
        round: 'round-primary',
        icon: 'ti-user',
        title: 'Pavan kumar',
        subject: 'Just see the my admin!',
        time: '9:00 AM'
    }];

    // This is for Mymessages
    mymessages: Object[] = [{
        useravatar: 'assets/admin/images/users/1.jpg',
        status: 'online',
        from: 'Pavan kumar',
        subject: 'Just see the my admin!',
        time: '9:30 AM'
    }, {
        useravatar: 'assets/admin/images/users/2.jpg',
        status: 'busy',
        from: 'Sonu Nigam',
        subject: 'I have sung a song! See you at',
        time: '9:10 AM'
    }, {
        useravatar: 'assets/admin/images/users/2.jpg',
        status: 'away',
        from: 'Arijit Sinh',
        subject: 'I am a singer!',
        time: '9:08 AM'
    }, {
        useravatar: 'assets/admin/images/users/4.jpg',
        status: 'offline',
        from: 'Pavan kumar',
        subject: 'Just see the my admin!',
        time: '9:00 AM'
    }];
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
        }, reason => (this.closeResult = `Dismissed ${this.getDismissReason(reason)}`));

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
    ngAfterViewInit() {

        $(function () {
            if ($('.preloader')) {
                $('.preloader').fadeOut();
            }
        });

        const set = function () {
            const width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            const topOffset = 70;
            if (width < 1170) {
                $('body').addClass('mini-sidebar');
                $('.navbar-brand span').hide();
                $('.scroll-sidebar, .slimScrollDiv').css('overflow-x', 'visible').parent().css('overflow', 'visible');
            } else {
                $('body').removeClass('mini-sidebar');
                $('.navbar-brand span').show();
            }

            let height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) { height = 1; }
            if (height > topOffset) {
                $('.page-wrapper-admin').css('min-height', (height) + 'px');
            }

        };
        $(window).ready(set);
        $(window).on('resize', set);

        $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
            $('.app-search').toggle(200);
        });

        (<any>$('[data-toggle="tooltip"]')).tooltip();

        (<any>$('.scroll-sidebar')).slimScroll({
            position: 'left',
            size: '5px',
            height: '100%',
            color: '#dcdcdc'
        });

        $('body').trigger('resize');
    }
}
