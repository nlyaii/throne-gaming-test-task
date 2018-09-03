import {NgModule} from '@angular/core'
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {SliderComponent} from "./slider/slider.component";
@NgModule({
    declarations: [
        AppComponent,
        SliderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
