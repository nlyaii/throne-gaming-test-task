import {Component, OnInit, HostListener} from '@angular/core';
import {ResponseContentType, Http} from "@angular/http";
import {DomSanitizer} from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';
import {NgRedux} from "@angular-redux/store";
import {IAppState} from "../store";
import {images} from './test-object'


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    imageData: any;
    imageObject: any = []
    isModalVisible: boolean = false
    count: number;
    subscription;
    private imageList:any = images

    constructor(private http: Http, private sanitizer: DomSanitizer, private ngRedux: NgRedux<IAppState>, ) {
        this.subscription = ngRedux.select<number>('imageCount')
            .subscribe(newCount => this.count = newCount);
    }

    //fetch the list of images
    ngOnInit() {this.getList()}

    //keyboar hostlistener
    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        switch(event.code) {
            case 'ArrowRight':
                return this.increment()
            case 'ArrowLeft':
                if(this.countIsZero){
                    return this.revert()
                }
                return this.decrement()
            case 'default':
                return this.increment()
        }
    }

    public getImageSrc(){
        if(this.count === this.imageObject.length){
            this.revert()
        }
        return this.imageObject[this.count]
    }


    //object looping
    public getList(): void {
        this.imageList.forEach(eachObj => {
            this.getImage(eachObj.url)
        });
    }

    //actions
    static INCREMENT = 'INCREMENT';
    static DECREMENT = 'DECREMENT';
    static REVERT = 'REVERT';

    increment() {this.ngRedux.dispatch( { type: 'INCREMENT' });}
    decrement() {this.ngRedux.dispatch({ type: 'DECREMENT' });}
    revert() {this.ngRedux.dispatch({ type: 'REVERT' });}

    //main get image method
    getImage(url) {
        this.http.get(url, {
            responseType: ResponseContentType.Blob
        })
            .toPromise()
            .then((res: any) => {
                let blob = new Blob([res._body], {
                    type: res.headers.get("Content-Type")
                });

                let urlCreator = window.URL;
                this.imageData = this.sanitizer.bypassSecurityTrustUrl(
                    urlCreator.createObjectURL(blob));
                this.imageObject.push(this.imageData)
            });

    }

    //helpers
    public countIsZero(){return this.count === 0}
    public toggleModal():void {this.isModalVisible = !this.isModalVisible;}
}
