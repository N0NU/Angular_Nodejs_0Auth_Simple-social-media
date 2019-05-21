import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatDialogModule} from '@angular/material';
import { PostListComponent } from './post-list/post-list.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserServiceService } from './services/user-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {TextFieldModule} from '@angular/cdk/text-field';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    PostListComponent,
    UserRegistrationComponent,
    CommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule
  ],
  entryComponents:[CommentDialogComponent],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
