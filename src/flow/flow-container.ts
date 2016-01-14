import {customElement, bindable} from 'aurelia-framework';
import {FlowItem} from './flow-item';

@customElement('flow-container')
export class FlowContainer {

    flowPath: FlowItem[];
}