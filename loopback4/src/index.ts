import {Application} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Application};

export async function main(options?: ApplicationConfig) {
  const app = new Application(options);
  await app.boot();
  await app.start();
  return app;
}
