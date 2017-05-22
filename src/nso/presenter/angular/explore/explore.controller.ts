//

import {
  Ng1Controller,
  StateService,
  Transition,
} from "@uirouter/angularjs";

import { IExploreRoutingParams } from "./explore-routing.interface";
import { ExploreEffect } from "./explorer.effect";

//

export class ExploreController implements Ng1Controller {

  public searchTerm: string;

  // From component binding
  public $transition$: Transition;

  constructor(
    private $state: StateService,

    private exploreEffect: ExploreEffect,
  ) {
    "ngInject";
  }

  //

  public onSearchTermChange(newTerm: any) {
    // When the user change the input in the view
    console.log("onSearchTermChange", newTerm);
    this.$state.go(".", { pkg: newTerm });
  }

  //
  public $onInit() {
    // When Angular initiate the component
    const params: IExploreRoutingParams = this.$transition$.params();
    const packageName = params.pkg;

    this.searchTerm = packageName;

    this.exploreEffect.resolvePackageDependencies(packageName);
  }

  public uiOnParamsChanged(newParams: IExploreRoutingParams) {
    // When the url change
    console.log("uiOnParamsChanged", newParams.pkg);
    this.searchTerm = newParams.pkg;
  }

  public uiCanExit() {
    // Always allowed the router to exit this view
    return true;
  }

}
