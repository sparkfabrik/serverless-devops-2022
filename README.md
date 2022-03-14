# Incontro DevOps 2022 - Workshop: Progettare e sviluppare applicazioni Serverless con AWS

## Requisiti

- git
- node ^14.x
- npm ^6.x
- aws cli 2.3.6 (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## Setup

1) launch `aws configure --profile workshops`
2) enter your credentials and `eu-west-2` as the default region
3) clone repository
4) run `make setup-stage`
5) run `make be-deploy`
6) update Angular prod environment file with ApiGateway endpoint (replace {API_GATEWAY_ENDPOINT})
7) run `make fe-deploy`
8) run `make fe-start`

## Links

- Serverless framework docs: https://www.serverless.com/framework/docs/
- AWS SKD for Javascript docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html
