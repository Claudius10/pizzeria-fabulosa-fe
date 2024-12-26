import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {LoadingAnimationService} from '../../../../services/navigation/loading-animation.service';
import {RESOURCE_PRODUCT_BEVERAGES} from '../../../../utils/query-keys';
import {toObservable} from '@angular/core/rxjs-interop';
import {ResourceService} from '../../../../services/http/resources/resource.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {QueryResult} from '../../../../interfaces/query';
import {ErrorService} from '../../../../services/error/error.service';
import {ServerErrorComponent} from '../../../app/error/server-no-response/server-error.component';
import {ERROR, PENDING, SUCCESS} from '../../../../utils/constants';
import {ResponseDTO} from '../../../../interfaces/http/api';
import {MessageService} from 'primeng/api';

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
  providers: [MessageService],
  templateUrl: './beverage-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeverageListComponent implements OnInit, OnDestroy {
  private resourceService = inject(ResourceService);
  private loadingAnimationService = inject(LoadingAnimationService);
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService);
  private messageService = inject(MessageService);
  query: QueryResult = this.resourceService.findProducts({queryKey: RESOURCE_PRODUCT_BEVERAGES});
  private statusObservable = toObservable(this.query.status);

  ngOnInit(): void {
    const subscription = this.statusObservable.subscribe({
        next: result => {
          if (result === PENDING) {
            this.loadingAnimationService.startLoading();
          }

          if (result === ERROR) {
            this.loadingAnimationService.stopLoading();
          }

          if (result === SUCCESS) {
            this.loadingAnimationService.stopLoading();
            const response: ResponseDTO = this.query.data()!;
            if (response.status.error) {
              this.errorService.handleError(response, this.messageService);
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
