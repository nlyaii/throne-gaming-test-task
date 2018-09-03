import {Component, OnInit} from '@angular/core';
import {ResponseContentType, Http} from "@angular/http";
import {DomSanitizer} from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

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

    imageData: any;
    imageObject: any = []

    constructor(private http: Http, private sanitizer: DomSanitizer) {

    }

    //gets the list of images
    ngOnInit() {
        this.getList()
    }

    //testing the object looping
    getList() {
        this.images.forEach(eachObj => {
            this.getImage(eachObj.url)
        });
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
