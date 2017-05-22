//

import { module as ngModule } from "angular";

import { ExploreRoutingModule } from "./explore-routing.module";
import {
  ExploreComponentName,
  ExploreComponentOptions,
} from "./explore.component";

import { ExploreStore } from "./explore.store";
import { ExploreEffect } from "./explorer.effect";

export const ExploreModule: string = ngModule(module.id, [
  ExploreRoutingModule,
])
  .component(ExploreComponentName, ExploreComponentOptions)

  .service("exploreEffect", ExploreEffect)
  .service("exploreStore", ExploreStore)
  .name;
