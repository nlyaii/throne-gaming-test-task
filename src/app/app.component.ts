import {Component, OnInit} from '@angular/core';
import {ResponseContentType, Http} from "@angular/http";
import {DomSanitizer} from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';
import {NgRedux} from "@angular-redux/store";
import {IAppState} from "../store";


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

    private images: any = [
        {
            url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260"
        },
        {
            url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260"
        },
        {
            url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260"
        },
        {
            url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260"
        },
        {
            url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260"
        },
        {
            url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260"
        },
        {
            url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260"
        },
    ]
    subscription;

    constructor(private http: Http, private sanitizer: DomSanitizer, private ngRedux: NgRedux<IAppState>) {
        this.subscription = ngRedux.select<number>('imageCount')
            .subscribe(newCount => this.count = newCount);
        console.log(this.count)
    }

    //gets the list of images
    ngOnInit() {this.getList()}

    public toggleModal() {
        this.isModalVisible = !this.isModalVisible;
    }

    //testing the object looping
    public getList(): void {
        this.images.forEach(eachObj => {
            this.getImage(eachObj.url)
        });
    }

    //actions
    static INCREMENT = 'INCREMENT';
    static DECREMENT = 'DECREMENT';

    increment() {
        console.log(this.count)
        this.ngRedux.dispatch( { type: 'INCREMENT' });
    }

    decrement() {
        this.ngRedux.dispatch({ type: 'DECREMENT' });
    }

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
}
