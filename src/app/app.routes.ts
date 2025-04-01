import { Routes } from '@angular/router'
import { ListComponent } from './features/List/list.component'
import { DetailsComponent } from './features/Details/details.component'

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]
