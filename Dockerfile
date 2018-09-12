FROM       node:alpine 

MAINTAINER https://github.com/snehisingh/crypt
EXPOSE     3000

WORKDIR    /crypt 

COPY       package.json /crypt

RUN        npm install

COPY       . /crypt

CMD        ["bin/www"]
