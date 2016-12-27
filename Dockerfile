FROM node:6

WORKDIR /socketjam
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install libelf1 -y
ENTRYPOINT ["/bin/bash", "-c", "npm run full-check && rm -rf ./jest"]
