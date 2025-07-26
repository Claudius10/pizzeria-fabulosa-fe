import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {IncidenceListDTO, IncidentsAPIService} from '../../../../api/admin';
import {DatePipe, isPlatformBrowser} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {QueryResult} from '../../../../utils/interfaces/query';
import {firstValueFrom} from 'rxjs';
import {tempQueryResult, tempStatus$} from '../../../../utils/placeholder';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {ADMIN_INCIDENTS} from '../../../../utils/query-keys';
import {
  ERROR,
  INCIDENTS_ORIGIN_ADMIN_RESOURCE_SERVER,
  INCIDENTS_ORIGIN_BUSINESS_RESOURCE_SERVER,
  INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER,
  INCIDENTS_ORIGIN_SECURITY_SERVER,
  INCIDENTS_ORIGIN_USER_RESOURCE_SERVER,
  PENDING,
  SUCCESS
} from '../../../../utils/constants';
import {TableModule, TablePageEvent} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {APIError} from '../../../../api/user';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Card} from 'primeng/card';
import {Badge} from 'primeng/badge';
import {toObservable} from '@angular/core/rxjs-interop';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../services/error/error.service';
import {ServerErrorComponent} from '../../../routes/error/server-no-response/server-error.component';
import {Skeleton} from 'primeng/skeleton';

const DEFAULT_PAGE_MAX_SIZE = 5;

@Component({
  selector: 'app-incidents',
  imports: [
    FormsModule,
    TableModule,
    DatePipe,
    IconField,
    InputIcon,
    InputText,
    Card,
    Badge,
    ServerErrorComponent,
    Skeleton
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncidentsComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = !isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly incidenceAPIService = inject(IncidentsAPIService);
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly origin = signal(this.activatedRoute.snapshot.paramMap.get("origin") === null ? INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER : this.activatedRoute.snapshot.paramMap.get("origin")!);
  protected readonly page = signal(this.activatedRoute.snapshot.queryParamMap.get("page") === null ? 1 : Number(this.activatedRoute.snapshot.queryParamMap.get("page")!));
  protected readonly origins = signal<string[]>(
    [
      INCIDENTS_ORIGIN_PUBLIC_RESOURCE_SERVER,
      INCIDENTS_ORIGIN_BUSINESS_RESOURCE_SERVER,
      INCIDENTS_ORIGIN_USER_RESOURCE_SERVER,
      INCIDENTS_ORIGIN_ADMIN_RESOURCE_SERVER,
      INCIDENTS_ORIGIN_SECURITY_SERVER
    ]
  );
  protected readonly selectedOrigin = signal<string>(this.origins()[0]);

  protected readonly incidents: QueryResult<IncidenceListDTO | undefined> = !this.isServer ? injectQuery(() => ({
    queryKey: [...ADMIN_INCIDENTS, this.origin()],
    queryFn: () => firstValueFrom(this.incidenceAPIService.findAllByOrigin(this.origin(), this.page() - 1, DEFAULT_PAGE_MAX_SIZE))
  })) : tempQueryResult();
  private readonly queryStatus = !this.isServer ? toObservable(this.incidents.status) : tempStatus$();

  protected readonly first = signal(0);
  protected readonly totalElements = signal(0);

  ngOnInit(): void {
    this.first.set((this.page() - 1) * DEFAULT_PAGE_MAX_SIZE);

    const subscription = this.queryStatus.subscribe({
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

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  protected selectOrigin(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log(selectElement.value);
  }

  protected onPageSelect(event: TablePageEvent) {
    console.log(event);
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
