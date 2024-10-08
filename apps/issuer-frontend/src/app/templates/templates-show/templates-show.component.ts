import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Template,
  TemplateEntity,
  TemplatesApiService,
} from '@credhub/issuer-shared';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from 'ng-flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SessionsListComponent } from '../../sessions/sessions-list/sessions-list.component';

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
  template!: TemplateEntity;

  control!: FormControl;
  id?: string | null;

  constructor(
    private templatesApiService: TemplatesApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      return;
    }
    this.template = await firstValueFrom(
      this.templatesApiService.templatesControllerGetOne(this.id)
    );
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
