# [skgtech.github.io](http://skgtech.io)

Thessaloniki's tech and developer Events, Meetups & News.

## Meetup Organizers

SKGTech is using a [Public Google Calendar](https://www.google.com/calendar/embed?src=2ul10sd9g30mnk1vpmcnnp5qv4%40group.calendar.google.com&ctz=Europe/Athens) for storing and reading the events and meetups. We also retain very few *Pinned* events that are edited only within this repository and [reside in the _data/agenda.yaml file](https://github.com/skgtech/skgtech.github.io/blob/master/_data/agenda.yaml). The *Pinned* events will appear after all the Calendar events.

## Web Developers

If you want to contribute to the development of this site you first need to setup your environment based on the project's requirements.

### The Stack

 * [Node 0.10.x](http://nodejs.org/)
 * [Ruby](http://www.ruby-lang.org/en/downloads/) If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal.
 * [Grunt](http://gruntjs.com) `npm install -g grunt-cli`
 * [Bower](http://bower.io) `npm install -g bower`
 * [Jekyll](http://jekyllrb.com/) `gem install jekyll`

This project was built using [Jekyll](http://jekyllrb.com/) and is based on the [JekyllBootstrap template](http://jekyllbootstrap.com/), you don't need to be familiar with these tools to do most of the tasks.

### Installing the project

First [fork this repository](https://github.com/skgtech/skgtech.github.io/fork) and clone it to your local:

```shell
git clone git@github.com:YOUR_USERNAME/skgtech.github.io.git
cd meetups
```

After cloning is finished you need to install the development dependencies:

```shell
npm install && bower install
```

### Working with the project

You can launch a webserver and a Jekyll watch alltogether simply by running grunt:

```shell
grunt
```

The default Grunt task will:

* Launch a jekyll watch and auto-build on every file change.
* Launch a local static webserver on port 9003.
* Open your browser on http://localhost:9003

### Assets and pages locations

* Edit styles from the `assets/styles/` folder.
* Edit the layout from the `_includes/themes/twitter/` folder.
* The project's homepage is the file `index.html` in the root folder.
* Edit the markup for the *Meetups* and *Agenda* items in the `_includes/widgets/` folder.
* All the site's data are in the `_data/` folder.

## Notes

* [Create a Google Developer Project and get an AppId](https://console.developers.google.com/project)

## Colophon

* Uses [Bolt template](http://bootstrapzero.com/bootstrap-template/bolt)

## License

[MIT](http://opensource.org/licenses/MIT)
