import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from "@angular/core";

export type App = {
  name: string;
  version: string;
  author: string;
};

export const APP = new InjectionToken<App>("APP");
export function provideApp(
  appProvider: EnvironmentProviders = defaultAppPorvider
): EnvironmentProviders {
  return makeEnvironmentProviders([appProvider]);
}

export function withData(
  name: string,
  version: string,
  author: string
): EnvironmentProviders {
  const appValue: App = {
    name,
    version,
    author,
  };
  return makeEnvironmentProviders([
    {
      provide: APP,
      useValue: appValue,
    },
  ]);
}

const defaultAppPorvider = makeEnvironmentProviders([
  {
    provide: APP,
    useValue: {
      name: "App name",
      version: "0.0.1",
      author: "AlbertoBasalo@AIcode.academy",
    },
  },
]);
