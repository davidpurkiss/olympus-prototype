import {FrameworkConfiguration} from 'aurelia-framework';
import {Router, RouteConfig} from 'aurelia-router';

export function configure(config: FrameworkConfiguration): void {

    var router: Router = config.container.get(Router);

    router.addRoute({ route: '', name: 'codegen', moduleId: 'codegen/codegen', nav: false });
    router.addRoute({ route: 'codegen', name: 'codegen', moduleId: 'codegen/codegen', nav: true, title: 'Code Generation', settings: { iconKey: 'code' } });
    
}