import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';

export class CustomNodeModel extends NodeModel {
  constructor(data) {
    super('custom');
    this.data = data;
    this.addPort(new DefaultPortModel(true, 'top'));
    this.addPort(new DefaultPortModel(false, 'bottom'));
  }

  getData() {
    return this.data;
  }
}
 