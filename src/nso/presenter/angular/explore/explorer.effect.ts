//

import { IData, IEdge, INode } from "nso/models";
import { ExploreStore } from "./explore.store";

import "rxjs/add/operator/debonuce";
import { Subject } from "rxjs/Subject";

export class ExploreEffect {
  constructor(
    private exploreStore: ExploreStore,
  ) {
    "ngInject";

    packageResolver$ = (new Subject())
      .debounce()
      .distinctOnChange();
  }
  public resolvePackageDependencies(packageName: string) {
    packageResolver$.next(packageName);
    setInterval(() => {
      const nodes: INode[] = [
        {
          id: Math.random(),
          label: Math.random().toString(34),
        },
      ];
      const edges: IEdge[] = [];
      const vertex: IData = { nodes, edges };
      this.exploreStore.vertex$.next(vertex);
      this.exploreStore.vertex$.error(new Error("Canceled"));
    },  1000);
  }
}
