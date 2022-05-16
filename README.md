# MTN Online Portals EBU Prepaid Project

This project was generated with Angular CLI version 10.2.1. It is a starter project to be utilised
by different portals setting up a new Angular project. From an architecture perspective we have adopted the defined folder structure in this
project to make it easy for the support team after the application goes live. <b>PLEASE DO NOT CHANGE THE CORE FOLDER STRUCTURE</b> defined here. We adopted
this from the JHipster project available at: https://www.jhipster.tech/using-angular/ (Project Structure).

To get you started on Ngrx state management, we have set up the header, and the footer state management components for you. We have also set up a service under
`shared/services` (NB: this is where all your services will be). Please familiarise yourself with this setup before getting started.

The Angular starter project comes pre-deployed to several environments, as below:

<b>System Testing (ST)</b>: https://flaolprvd02.mtn.co.za:8114

<b>Pre Production (Pre-Prod)</b>: https://flaolprvs07.mtn.co.za:8114

<b>NOTE</b> Port must be changed and this README updated accordingly per forked project

### Development Prerequisites

You must have the following applications installed before starting development
on this project:

1. VS Code (https://code.visualstudio.com/download)
2. NodeJS (https://nodejs.org/en/download/)

Code commit message format, must follow
[Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary).
You’ll never again be tempted to include a bug fix and a feature in the same
commit

## MTN Components

MTN has a custom design system that supports all the Angular applications. This comes pre-installed in this repository as NPM package. The MTN components are
installed as part of `$ npm ci` command since the registry configuration is specified on the `.npmrc` file. Additionally, any new module that gets added to the project from
the MTN components must be added to `app/shared/mtn-components.module.ts` AND NOT APP MODULE.

## Placeholder for Certificates

Please refer to "config-server.js" file to map with proper certificates by replacing with correct server names according to the environments.

## Next steps

Upon forking this repository, do the following:-:-

1. Allocate a new port number for the application
2. Change the application name to appropriate project name

## Development server

Run `$ npm run dev:prod` or `$ npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run ` $ npm run build:prod` to build the project. The build artifacts will be stored in the `dist/` directory.

As a good practice run `$ npm run build:prod` or `$ npm run build:prod` before creating a merge-request (MR) to ensure you do not break the project at build time.

You can also browse through the build steps in the Dockerfile, as outlined below:

```bash
export NODE_ENV=$node_e && npm install && export DEPLOY_ENV=$deploy_env && node config-env.js &&
node config-server && cat src/environments/environment.prod.ts && npm run build:prod && npm run lint &&
npm prune --production
```

## Running unit tests

Run `$ npm test` to execute the unit tests. It is important to ensure that for every functionality you write there are associated tests. Tests help us in production by identifying faults
in our source code well in advance. You must ensure tests are passing before creating any MR since their failure will block your MR from being approved.

## Deployment

This application comes with a Dockerfile configured to build and deploy a Docker image. This is how the application will be
deployed in all environments:

1. System Testing (ST)

2. Pre-production

3. Production

4. DR
For any queries please reach out to the Online DevOps support team `OnlinePortalsSupport.za@mtn.com`
