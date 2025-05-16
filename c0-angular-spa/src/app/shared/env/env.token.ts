import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from "@angular/core";
import { defaultEnv, Env } from "./env.type";

export const ENV = new InjectionToken<Env>("ENV");

export function provideEnv(
  envProvider: EnvironmentProviders = defaultEnvPorvider
): EnvironmentProviders {
  return makeEnvironmentProviders([envProvider]);
}

export function withData(
  name: string,
  version: string,
  author: string
): EnvironmentProviders {
  const envValue: Env = {
    name,
    version,
    author,
  };
  return makeEnvironmentProviders([
    {
      provide: ENV,
      useValue: envValue,
    },
  ]);
}

const defaultEnvPorvider = makeEnvironmentProviders([
  {
    provide: ENV,
    useValue: defaultEnv,
  },
]);
