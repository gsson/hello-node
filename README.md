Minimal Docker+Node+Express+React
=================================

Or: How to create a >600Mb "Hello World".

Requires docker and node.

It doesn't really follow any good development practices, but it's the smallest example of how I could get things to fit together.

To build:
```
$ npm run build
...
...
Successfully built 9918c9ee3275
```

You now have a docker image named something like `9918c9ee3275`.

To run your image:

```
$ docker run -d -p 8080:8080 --name hello-node 9918c9ee3275
```

Visit http://localhost:8080 to see the result.

The `npm run build` command will:
* Run `npm install` in `client/`
* Run `npm run build` in `client/`, which will:
  - Pre-process (ES2015-JSX -> JS-JSX -> JS -> Uglify) the sources using webpack into `client/build/`
* Run `npm install --only=production` in `server/`
* Run `docker build .`


For client development, try:
```
$ cd client
$ npm run dev
```
It will start a web server on http://localhost:8080 that will watch the sources for changes and refresh its contents.


Contents
========

```
Dockerfile                Docker build instructions
package.json              Meta-build, only used to build sub-projects
client/
  package.json            Dependencies and build instructions for the client
  index.js                Node entry point for module. Exposes path to pre-processed files (the build/ directory )in the "root" property
  webpack-prod.config.js  Webpack configuration file for production deployment
  webpack-dev.config.js   Webpack configuration file for dev deployment
  app/
    index.html
    index.jsx
server/         
  package.json            Dependencies and build instructions for the server. Notably depends on ../client
  server/
    index.js              Express server launcher, statically serves up the files in the directory pointed at by client.root
```


Making it smaller
=================

The `node:6` image contains everything and the kitchen sink. For the purpose of this program, the `node:6-slim` works equally well, and shrinks it to just over 200Mb.

However, for the adventurous, you can get a much much smaller image by replacing `FROM node:6` with `FROM mhart/alpine-node:base-6` in `Dockerfile`. The resulting image should be just below 40Mb and works fine for this and many similar tasks.

The difference between `mhart/alpine-node:6` and `mhart/alpine-node:base-6` is that the former contains NPM and the latter does not, saving another few Mb.
