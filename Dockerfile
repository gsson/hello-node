FROM node:6

WORKDIR /opt/hello-node
ADD server .

EXPOSE 8080
USER daemon
ENV NODE_ENV production
CMD node server
