FROM shawnzhu/ruby-nodejs:4.2.2

MAINTAINER skgtech <hello@skgtech.io>

# Install gems
RUN gem install jekyll:3.0.0

# Install app npm packages
COPY package.json /dist
RUN cd /dist && \
    npm install -qq

RUN mkdir -p /app/skgtech.io/ && \
    mkdir -p /dist/node_modules && \
    ln -s /dist/node_modules /app/skgtech.io/node_modules

WORKDIR /app/skgtech.io

ADD . /app/skgtech.io

# Expose ports to host
EXPOSE 3000 3001

# Default command
CMD node_modules/.bin/gulp
