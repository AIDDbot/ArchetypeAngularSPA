import {
    EnvironmentProviders,
    InjectionToken,
    makeEnvironmentProviders,
} from "@angular/core";
  
    export type AppToken = {
        name: string;
        version: string;
        author: string;
    }

  export const APP   = new InjectionToken<AppToken>("APP");
  
  export const defaultAppName = makeEnvironmentProviders([
    {
      provide: APP,
      useValue: {
        name: "App name",
        version: "0.0.1",
        author: "AlbertoBasalo@AIcode.academy",
      },
    },
  ]);

  export function provideApp(
    app: EnvironmentProviders = defaultAppName
  ): EnvironmentProviders {
    return makeEnvironmentProviders([app]);
  }
  
  export function withApp(name: string, version: string, author: string): EnvironmentProviders {
    return makeEnvironmentProviders([
      {
        provide: APP,
        useValue: {
            name,
            version,
            author,
        },
      },
    ]);
  }