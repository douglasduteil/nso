//

import {
  IController,
} from "angular";
import { IData } from "nso/models";
import { Subject } from "rxjs/Subject";

export class DependencyNetworkController implements IController {
  public vertex: Subject<IData>;
  public $onInit() {
    this.vertex.subscribe((data) => {
      console.log();
      console.log(module.id);
      console.log(data);
    });
  }
}
