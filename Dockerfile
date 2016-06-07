FROM shawnzhu/ruby-nodejs:4.2.2

MAINTAINER skgtech <hello@skgtech.io>

# Install gems
RUN gem install jekyll:3.1.2

# Install app npm packages
RUN mkdir -p /app/skgtech.io/

WORKDIR /app/skgtech.io/

ADD package.json /app/skgtech.io/

RUN set progress=false && \
    npm install --progress=false

ADD . /app/skgtech.io/

# Expose ports to host
EXPOSE 3000 3001

# Default command
CMD ["/app/skgtech.io/node_modules/.bin/gulp"]
