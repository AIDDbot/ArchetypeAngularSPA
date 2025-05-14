ng g c core/header
ng g c core/footer
ng g c routes/home/home --type=page

ng g s shared/log
ng g c shared/page

ng g s routes/home/home.store 
ng g interceptor core/cache 