import { NgModule} from '@angular/core'
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {IAppState, INITIAL_STATE, rootReducer} from "../store";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        NgReduxModule,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(
            rootReducer,
            INITIAL_STATE);
    }
}
