import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Template,
  TemplatesApiService,
  VerifierService,
} from '@credhub/verifier-shared';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from 'ng-flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { SessionsListComponent } from '../../sessions/sessions-list/sessions-list.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-templates-show',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    FlexLayoutModule,
    SessionsListComponent,
    MatListModule,
  ],
  templateUrl: './templates-show.component.html',
  styleUrl: './templates-show.component.scss',
})
export class TemplatesShowComponent implements OnInit {
  template!: Template;

  control!: FormControl;
  id!: string;

  constructor(
    private templatesApiService: TemplatesApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public verifierService: VerifierService
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.template = await firstValueFrom(
      this.templatesApiService.templatesControllerGetOne(this.id)
    );
  }

  async request() {
    const id = await this.verifierService.getRequest(this.id as string);
    this.router.navigate([id], { relativeTo: this.route });
  }

  delete() {
    if (!confirm('Are you sure you want to delete this template?')) {
      return;
    }
    firstValueFrom(
      this.templatesApiService.templatesControllerDelete(this.template.id)
    ).then(() =>
      this.router
        .navigate(['/templates'])
        .then(() =>
          this.snackBar.open('Template deleted', 'Dismiss', { duration: 3000 })
        )
    );
  }
}
