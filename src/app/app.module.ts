import {NgModule} from '@angular/core'
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {HomeComponent} from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
