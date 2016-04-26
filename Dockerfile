FROM ubuntu:latest
Label Version="1.0"
Label "description": “CrudeOil - A Development Environment made by Full Sail Cloud Tech, for Full Sail Web Dev.”
ENV myName="dev"
EXPOSE 22 3306 3000 9000

MAINTAINER "Cloud Technologies | Full Sail University - Deployment of Web Applications"

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade

RUN echo “----------------Installing Base Developer Packages----------------”
RUN apt-get -y install curl npm build-essential libssl-dev nano vim git apparmor-profiles apparmor apparmor-docs apparmor-utils mysql-server-5.6 && apt-get -y autoremove && apt-get -y autoclean

RUN echo “----------------Setting up NVM and NODE----------------”

# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 5.10.1

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

RUN echo “----------------Setting Global NPM Packages----------------”
RUN npm -g install jsdoc sequelize mysql nodemon express mocha gulp gulp-nodemon gulp-shell gulp-clean ger pm2

RUN echo “----------------Setting up Environment----------------”
COPY SH-Commands.txt /
RUN cat /SH-Commands.txt >> /etc/bash.bashrc
RUN mkdir -p /usr/src/appStore
WORKDIR /usr/src/appStore

RUN echo “----------------Setting Global Settings----------------”
COPY my.cnf /etc/mysql/
