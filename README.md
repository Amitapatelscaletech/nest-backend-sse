<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://avatars.githubusercontent.com/u/81280063?s=200&v=4" width="180" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  <a href="http://nestjs.org" target="_blank">NestJS</a> based backend project to be considered as a reference for starting new backend projects.
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Core Features

- Module based code structure easily decouple features when not required
- Postgres connection and base code
- Sequelize ORM integration & migration basic set up
- Redis Init Module
- Authentication using DB or firebase or Auth0
- Social Authentication
- Authorization
- Users Auth APIs
- Prometheus Monitoring Module
- AWS Modules
- Logging Module
- Swagger UI
- Unit tests and integration tests setup
- Implement unit tests and integration tests for authentication and authorization
- Prettier and ES-Lint setup
- Docker file for project image
- Docker compose file for environment image
- CI/CD configurations

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contribution Guidelines

### Git
1. Never commit directly to master, create a new branch from dev and submit a pull request to dev.
2. master will be only merged with dev branch.
3. New branche shall be created from dev.
4. PR to be sent to dev branch for review and code to be tested on dev branch after merge.
5. Branch name should be in following format:
``{feat|fix|chore|revert}/NBX-{issue_number}/{small_description}``
``Example: feat/NBX-1/project-setup``
6. Code commit should be done in following sample format. Note: Will also be linted via commitlint. Also check commitlint.config.js for detailed rules
``{feat|fix|chore|refactor|test}({module_name}): [NBX-{issue_number}] {commit_desciption}``
``Example: feat(user-auth): [NBX-9] user auth APIs added``

### Code
1. To be written in Typescript with no explict any.
2. Types should be scoped by modules and if used at multiple places should be scoped in common types
3. Create Nest modules for new features.
4. All features should be scoped such that they are unplugable and less interdependant.
5. In case of dependancies on other modules try to use and define mapper functions which call the other dependacy. This will help in cases where we want to replace the module with another one. For example, if we are consuming a postgres module in the auth module, then create a mapper/helper class inside the auth module which handles conversations/calls to postgres module. Thus if we want to replace the postgres module with mysql or no-sql db then we'll just have to update the logic in this file only and not the whole module.