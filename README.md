# dmn-js-integration

[![CI](https://github.com/MaxTru/dmn-js-integration/workflows/CI/badge.svg)](https://github.com/MaxTru/dmn-js-integration/actions?query=workflow%3ACI)
[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

This repo runs stress-tests against [dmn-js](https://github.com/bpmn-io/dmn-js/tree/develop/packages/dmn-js).

As of now, it is focussed on checking the execution time to open large dmn files (DRD view and Decision Table view).

## How to run

Install dependencies:
```
npm install
```

Execute tests using your favorite browser:
```
TEST_BROWSERS=Chrome npm run test
```
(Note that per default `ChromeHeadless` is used, but using a non-headless browser will
  yield much more realistic results for your machine.)
