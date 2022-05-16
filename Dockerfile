#########################################################################
#########               Production Container Build              #########
#########################################################################
FROM node:14.17-alpine as builder

ARG environment

ARG node_environment

ENV deploy_env=$environment

ENV node_e=$node_environment

ARG proxy_name

ARG proxy_pass

ENV proxy_name=$proxy_name

ENV proxy_pass=$proxy_pass

RUN addgroup docker_apps && adduser -S -G docker_apps docker_apps

USER docker_apps

RUN mkdir -p /home/docker_apps/app

WORKDIR /home/docker_apps/app

COPY --chown=docker_apps . /home/docker_apps/app

RUN npm config set proxy http://$proxy_name:$proxy_pass@proxy-fld.mtn.co.za:8080 && export NODE_ENV=$node_e && \
  npm ci --no-progress --no-optional --no-audit --ignore-scripts --prefer-offline && export DEPLOY_ENV=$deploy_env && node config-env.js && node config-server && cat src/environments/environment.prod.ts && \
  npm run build:prod && npm prune --production && mv dist/business/ebu-prepaid/index.html dist/index.html
#########################################################################
#########               Production Container Deploy              #########
#########################################################################
FROM node:14.17-alpine

ARG PROXY_NAME
ARG PROXY_PASS

ENV HTTP_PROXY "http://$PROXY_NAME:$PROXY_PASS@proxy-fld.mtn.co.za:8080"
ENV HTTPS_PROXY "http://$PROXY_NAME:$PROXY_PASS@proxy-fld.mtn.co.za:8080"

WORKDIR /home/docker_apps/dist

COPY --from=builder ["home/docker_apps/app/.env", "home/docker_apps/app/dist/index.html", "home/docker_apps/app/server.js", "/home/docker_apps/dist/"]

COPY --from=builder home/docker_apps/app/dist/business/ebu-prepaid /home/docker_apps/dist/business/ebu-prepaid

COPY --from=builder home/docker_apps/app/certs /home/docker_apps/dist/certs

COPY --from=builder home/docker_apps/app/node_modules /home/docker_apps/dist/node_modules


# certs
RUN apk add --no-cache ca-certificates
COPY --from=builder /home/docker_apps/app/certs/rootCA.pem /usr/local/share/ca-certificates/rootCA.pem
RUN chmod 644 /usr/local/share/ca-certificates/rootCA.pem && update-ca-certificates

# reset proxy otherwise service will not work
ENV HTTPS_PROXY ""
ENV HTTP_PROXY ""

EXPOSE 8114

CMD node --max-old-space-size=7900 server.js
