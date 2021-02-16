import { NgModule } from '@angular/core';
import { SexoPipe } from './sexo.pipe';

const PIPES = [
    SexoPipe
];

@NgModule( {
    declarations: PIPES,
    exports: PIPES
} )

export class PipesModule {
}

