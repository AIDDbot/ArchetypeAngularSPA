ng g c core/header
ng g c core/footer
ng g c routes/home/home --type=page

ng g s shared/log
ng g c shared/page

ng g s routes/home/home.store 
ng g interceptor core/cache 

ng g s shared/cache

ng g c core/ThemeToggle

ng g environments
+ c0-angular-spa\src\app\core\app-token.ts