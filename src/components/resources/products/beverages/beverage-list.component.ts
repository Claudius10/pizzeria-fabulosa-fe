import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {RESOURCE_PRODUCT_BEVERAGES} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {QueryResult} from '../../../../interfaces/query';
import {ErrorService} from '../../../../services/error/error.service';
import {Router} from '@angular/router';
import {ServerErrorComponent} from '../../../app/error/server-no-response/server-error.component';

@Component({
  selector: 'app-beverage-list',
  host: {
    class: 'upper-layout',
  },
  standalone: true,
  imports: [
    ProductItemComponent,
    ServerErrorComponent
  ],
  templateUrl: './beverage-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeverageListComponent implements OnInit, OnDestroy {
  private resourceService = inject(ResourceService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService);
  private router = inject(Router);
  query: QueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_BEVERAGES});
  private statusObservable = toObservable(this.query.status);

  ngOnInit(): void {
    const subscription = this.statusObservable.subscribe({
        next: result => {
          if (result === "pending") {
            this.loadingAnimationService.startLoading();
          }

          if (result === "success") {
            this.loadingAnimationService.stopLoading();
          }

          if (result === "error") {
            this.loadingAnimationService.stopLoading();
            // did server respond?
            if (this.query.data() !== undefined && this.query.data()!.status.isError) {
              // note: there are no non-fatal errors for product GET request
              this.errorService.addError(this.query.data()!.error!);
              this.router.navigate(["/error"]);
            }
          }
        }
      },
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  ngOnDestroy(): void {
    this.loadingAnimationService.stopLoading();
  }
}
