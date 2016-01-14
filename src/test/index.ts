import {FrameworkConfiguration} from 'aurelia-framework';
import {Router, RouteConfig} from 'aurelia-router';

export function configure(config: FrameworkConfiguration): void {

    var router: Router = config.container.get(Router);

    
    router.addRoute({ route: 'test', name: 'test', moduleId: 'test/test', nav: true, title: 'Test Feature', settings: { iconKey: 'area-chart' } });
    
}