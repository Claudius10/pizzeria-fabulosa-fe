import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {APIError, IncidenceListDTO, IncidentsAPIService} from '../../../../api/admin';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {ADMIN_INCIDENTS} from '../../../../utils/query-keys';
import {ERROR, PENDING, SUCCESS} from '../../../../utils/constants';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {myInput} from '../../../../primeng/input';
import {myIcon} from '../../../../primeng/icon';
import {Badge} from 'primeng/badge';
import {toObservable} from '@angular/core/rxjs-interop';
import {LoadingAnimationService} from '../../../services/animation/loading-animation.service';
import {ErrorService} from '../../../services/error/error.service';
import {ServerErrorComponent} from '../../../routes/error/server-no-response/server-error.component';
import {Skeleton} from 'primeng/skeleton';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Button} from 'primeng/button';
import {Select} from 'primeng/select';
import {Tag} from 'primeng/tag';
import {Ripple} from 'primeng/ripple';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {QueryResultWithRefetch} from '../../../../utils/interfaces/query';

@Component({
  selector: 'app-incidents',
  imports: [
    NgClass,
    Card,
    TableModule,
    DatePicker,
    FormsModule,
    Button,
    TranslatePipe,
    InputText,
    Select,
    Tag,
    Ripple,
    Badge,
    Skeleton,
    ServerErrorComponent
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncidentsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);
  private readonly loadingAnimationService = inject(LoadingAnimationService);
  private readonly incidenceAPIService = inject(IncidentsAPIService);
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly origin = signal(this.activatedRoute.snapshot.params["origin"]);
  protected readonly smallTable = signal(true);
  protected rangeDates: Date[] = [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()];
  protected fatal = [
    {label: 'true', value: 'true'},
    {label: 'false', value: 'false'},
  ];
  protected expandedRows = {};

  protected readonly incidents: QueryResultWithRefetch<IncidenceListDTO | undefined> = injectQuery(() => ({
    queryKey: [...ADMIN_INCIDENTS, this.origin()],
    queryFn: () => firstValueFrom(this.incidenceAPIService.findAllByOriginBetweenDates(
      this.origin(),
      this.rangeDates[0] == null ? "" : this.rangeDates[0].toISOString(),
      this.rangeDates[1] == null ? "" : this.rangeDates[1].toISOString()
    )),
  }));

  private readonly queryStatus = toObservable(this.incidents.status);

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
        }
      }
    });

    const routeParams = this.activatedRoute.params.subscribe(params => {
      this.origin.set(params["origin"]);
    });

    this.destroyRef.onDestroy(() => {
      queryStatus.unsubscribe();
      routeParams.unsubscribe();
      this.loadingAnimationService.stopLoading();
    });
  }

  protected fetch() {
    this.incidents.refetch();
  }

  protected getStringSeverity(value: string) {
    switch (value) {
      case 'true':
        return "danger";
      case 'false':
        return "success";
      default:
        return "info";
    }
  }

  protected getBooleanSeverity(value: boolean) {
    if (value) {
      return "danger";
    } else {
      return "success";
    }
  }

  protected withType(incident: any) {
    return incident as APIError;
  }

  protected getValue(event: EventTarget | null) {
    if (event === null) {
      return "";
    }
    const input = event as HTMLInputElement;
    return input.value;
  }

  protected toggleTableSize() {
    this.smallTable.set(!this.smallTable());
  }

  protected readonly myIcon = myIcon;
  protected readonly myInput = myInput;
  protected readonly String = String;
}
