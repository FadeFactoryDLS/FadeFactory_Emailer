# Introduction

This repository is 1 of 5 microservices for the "FadeFactory" exam project in the subject "Development of Large Systems" (DLS)

# Continous deployment

GitHub workflow automatically builds and deploys when main branch is changed

TODO:

Expand unit tests

Integration (Postman) tests

Terraform infrastructure as code

# Hosting and observability

A Linux Web App is running at: https://fadefactoryemailer.azurewebsites.net/docs/

with private New Relic monitoring

# Passwords and secrets

Password for the API follows "RFC 2617 HTTP Authentication" with credentials defined in environment variables.

Secrets are stored in a oneline Base64 encoded file stored in GitHub secrets.

New Relic related secrets are stored as variables directly on the Azure Web App.

# Local development

The project is very straight forward to run in a local environment

First set up a local .env file following the format of env_template, then run:

```
$ npm install
$ npm run <package.json script>
```
