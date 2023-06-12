FROM node:12-alpine3.12

RUN mkdir -p /home/app

WORKDIR /home/app

ARG HTTP_PROXY=http://wwwproxy.unimelb.edu.au:8000/

ARG HTTPS_PROXY=http://wwwproxy.unimelb.edu.au:8000/

COPY ./app /home/app

RUN cp .env_sample .env

RUN npm i

CMD npm run dev
