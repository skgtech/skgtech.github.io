# [skgtech.github.io](http://skgtech.io)

Thessaloniki's tech and developer Events, Meetups & News.

## Meetup Organizers

SKGTech is using a [Public Google Calendar](https://www.google.com/calendar/embed?src=2ul10sd9g30mnk1vpmcnnp5qv4%40group.calendar.google.com&ctz=Europe/Athens) for storing and reading the events and meetups. We also retain very few *Pinned* events that are edited only within this repository and [reside in the _data/featuredevent.yaml file](https://github.com/skgtech/skgtech.github.io/blob/master/_data/featuredevent.yaml). The *Pinned* events will appear after all the Calendar events.

## Web Developers

If you want to contribute to the development of this site you first need to setup your environment based on the project's requirements.

### Use Docker for development

If you are tired of installing npm, gem and other stuff there is a [Docker](http://docker.com) [image](https://hub.docker.com/r/skgtech/website/) for you.

See more at [github.com/skgtech/skgtech.io-docker](https://github.com/skgtech/skgtech.io-docker/).

Here is an example of steps of using this Docker image.

Pull the latest docker image
```
git pull skgtech/website
```

Fork repository https://github.com/skgtech/skgtech.github.io.
If you are using https://hub.github.com/ you can do this easily like this:
```
git fork https://github.com/skgtech/skgtech.github.io
```

Get into the folder.
```
cd /path/to/skgtech.github.io
```

Create a new container (you may need sudo to run docker).
The files under /path/to/skgtech.github.io are mounted with the docker container files at `/app/skgtech.io`
```
docker run -t -d \
            --name skgtech_container \
            -p 3000:3000 -p 3001:3001 \
            -v `pwd`/_sass:/app/skgtech.io/_sass \
            -v `pwd`/_frontapp:/app/skgtech.io/_frontapp \
            -v `pwd`/_includes:/app/skgtech.io/_includes \
            -v `pwd`/_layouts:/app/skgtech.io/_layouts \
            -v `pwd`/_data:/app/skgtech.io/_data \
            -v `pwd`/assets:/app/skgtech.io/assets \
            skgtech/website

```

SSH into the container.
```
docker exec -i -t skgtech_container /bin/bash
```

Inside the docker container run gulp or other gulp specific
commands (see [#working-with-the-project](#working-with-the-project) below).
```
root@64099e7b10bd: gulp
```

Open http://172.17.0.2:3000 on your browser.
```
google-chrome http://172.17.0.2:3000
```

Make git commits locally under repo at `/path/to/skgtech.github.io/`.

Create a pull request.


### The Stack

 * [Node >= 0.12.x](http://nodejs.org/)
 * [Ruby](http://www.ruby-lang.org/en/downloads/) If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal.
 * [Gulp](http://gulpjs.com) `npm install -g gulp`
 * [Jekyll](http://jekyllrb.com/) `gem install jekyll`

This project was built using [Jekyll](http://jekyllrb.com/), you don't need to be familiar with these tools to do most of the tasks.

### Installing the project

First [fork this repository](https://github.com/skgtech/skgtech.github.io/fork) and clone it to your local:

```shell
git clone git@github.com:YOUR_USERNAME/skgtech.github.io.git
```

After cloning is finished you need to install the development dependencies:

```shell
npm install
```

### Working with the project

```shell
gulp
```

The default gulp task will:

* Launch default Jekyll dev server.
* Watch `_sass`, `_frontapp`, `_includes` and `_layouts` folders for changes and re-build them.

More specific tasks:

* `gulp scripts`: Browserifies whatever is in `_frontapp` and produces `assets/js/app.js`
* `gulp jekyll`: Builds jekyll
* `gulp clean`: Deletes jekyll's build files (`jekyll clean`)
* `gulp serve`: Just serves, without watching

### Assets and pages locations

* Edit styles inside `_sass/` folder. `/css/main.css` is auto generated and injected by BrowserSync.
* The project's homepage is the file `index.html` in the root folder.
* Every section is in its own file in `_includes`.
* All the site's data are in the `_data/` folder.

## Notes

* [Create a Google Developer Project and get an AppId](https://console.developers.google.com/project)

## License

[MIT](http://opensource.org/licenses/MIT)
