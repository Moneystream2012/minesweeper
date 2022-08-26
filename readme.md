# Console game

Used hot-reload for faster development.

## Features

- [Dockerized](https://docs.docker.com/compose/)
- [TypeScript](https://www.typescriptlang.org/) (v4)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
  - [Simple Import Sort](https://github.com/lydell/eslint-plugin-simple-import-sort/)
  - [Import plugin](https://github.com/benmosher/eslint-plugin-import/)
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)
- [GitHub Action workflows](https://github.com/features/actions) set up to run tests and linting on push

## Running the app

```
# install dependencies
yarn

# run in dev mode on port 3001
yarn dev

# generate production build
yarn build

# test
yarn test

# test load capability (with autocannon) on port 3001
yarn test:load
```

## Testing

### Jest with supertest (not implemented yet)

```
yarn test
```

### Load testing with autocannon

```
yarn test:load
```

## Linting

```
# run linter
yarn lint

# fix lint issues
yarn lint:fix
```
