//

import { IData } from "nso/models";
import { Subject } from "rxjs/Subject";

export class ExploreStore {
  public vertex$ = new Subject<IData>();
}
