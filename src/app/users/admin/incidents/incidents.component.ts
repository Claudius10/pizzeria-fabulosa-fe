import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {IncidenceListDTO, IncidentsAPIService} from '../../../../api/admin';
import {DatePipe, isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {QueryResult} from '../../../../utils/interfaces/query';
import {firstValueFrom} from 'rxjs';
import {tempQueryResult, tempStatus$} from '../../../../utils/placeholder';
import {injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {ADMIN_INCIDENTS} from '../../../../utils/query-keys';
import {ERROR, INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER, PENDING, SUCCESS} from '../../../../utils/constants';
import {TableModule, TablePageEvent} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {APIError} from '../../../../api/user';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {Badge} from 'primeng/badge';
import {toObservable} from '@angular/core/rxjs-interop';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../services/error/error.service';
import {ServerErrorComponent} from '../../../routes/error/server-no-response/server-error.component';
import {Skeleton} from 'primeng/skeleton';
import {Card} from 'primeng/card';

const DEFAULT_PAGINATOR_NUMBER = 0;
const DEFAULT_PAGINATOR_ROWS = 5;

@Component({
  selector: 'app-incidents',
  imports: [
    FormsModule,
    TableModule,
    DatePipe,
    Badge,
    ServerErrorComponent,
    Skeleton,
    Card
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncidentsComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly queryClient = inject(QueryClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly incidenceAPIService = inject(IncidentsAPIService);
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly origin = signal("");
  protected readonly page = signal(1);
  protected readonly first = signal(DEFAULT_PAGINATOR_NUMBER);
  protected readonly rows = signal(DEFAULT_PAGINATOR_ROWS);
  protected readonly totalElements = signal(0);

  protected readonly incidents: QueryResult<IncidenceListDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: [...ADMIN_INCIDENTS, this.origin(), this.page(), this.rows()],
    queryFn: () => firstValueFrom(this.incidenceAPIService.findAllByOrigin(this.origin(), this.page() - 1, this.rows()))
  })) : tempQueryResult();
  private readonly queryStatus = !this.isServer ? toObservable(this.incidents.status) : tempStatus$();

  ngOnInit(): void {
    const queryStatus = this.queryStatus.subscribe({
      next: status => {
        if (status === PENDING) {
          this.loadingAnimationService.startLoading();
        }

        if (status === ERROR) {
          this.loadingAnimationService.stopLoading();
          this.errorService.handleError(this.incidents.error()!);
        }

        if (status === SUCCESS) {
          this.loadingAnimationService.stopLoading();
          const response: IncidenceListDTO = this.incidents.data()!;
          // if list is empty the return is 204 without a body
          if (response) {
            this.totalElements.set(response.totalElements);
          }
        }
      }
    });

    const routeParams = this.activatedRoute.paramMap.subscribe(params => {
      const origin = params.get("origin");
      this.origin.set(origin === null ? INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER : origin);

      // restore totalElements if data is in cache for given origin
      const data: IncidenceListDTO | undefined = this.queryClient.getQueryData([...ADMIN_INCIDENTS, this.origin(), this.page(), this.rows()]);
      if (data) {
        this.totalElements.set(data.totalElements);
      }

      // restore the initial page and initial rows to display to defaults
      this.first.set(DEFAULT_PAGINATOR_NUMBER);
      this.rows.set(DEFAULT_PAGINATOR_ROWS);
    });

    const routeQueryParams = this.activatedRoute.queryParamMap.subscribe(params => {
      const page = params.get("page");
      this.page.set(page === null ? 1 : Number(page));
    });

    this.destroyRef.onDestroy(() => {
      queryStatus.unsubscribe();
      routeParams.unsubscribe();
      routeQueryParams.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  protected onPageSelect(event: TablePageEvent) {
    this.first.set(event.first);
    this.rows.set(event.rows);
    const page = (event.first / event.rows) + 1;
    this.page.set(page);
    this.router.navigate(["admin", "incidents", this.origin()], {queryParams: {page: page}});
  }

  protected fatalSeverity(fatal: boolean) {
    if (fatal) {
      return "danger";
    } else {
      return "success";
    }
  }

  protected withType(incident: any) {
    return incident as APIError;
  }

  protected readonly myIcon = myIcon;
  protected readonly myInput = myInput;
  protected readonly String = String;
}
