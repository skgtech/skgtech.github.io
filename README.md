# [skgtech.github.io](http://skgtech.io)

Thessaloniki's tech and developer Events, Meetups & News.

## Meetup Organizers

SKGTech is using a [Public Google Calendar](https://www.google.com/calendar/embed?src=2ul10sd9g30mnk1vpmcnnp5qv4%40group.calendar.google.com&ctz=Europe/Athens) for storing and reading the events and meetups. We also retain very few *Pinned* events that are edited only within this repository and [reside in the _data/agenda.yaml file](https://github.com/skgtech/skgtech.github.io/blob/master/_data/agenda.yaml). The *Pinned* events will appear after all the Calendar events.

## Web Developers

If you want to contribute to the development of this site you first need to setup your environment based on the project's requirements.

### The Stack

 * [Node >= 0.10.x](http://nodejs.org/)
 * [Ruby](http://www.ruby-lang.org/en/downloads/) If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal.
 * [Grunt](http://gruntjs.com) `npm install -g grunt-cli`
 * [Jekyll](http://jekyllrb.com/) `gem install jekyll`

This project was built using [Jekyll](http://jekyllrb.com/), you don't need to be familiar with these tools to do most of the tasks.

### Installing the project

First [fork this repository](https://github.com/skgtech/skgtech.github.io/fork) and clone it to your local:

```shell
git clone git@github.com:YOUR_USERNAME/skgtech.github.io.git
cd meetups
```

After cloning is finished you need to install the development dependencies:

```shell
npm install
```

### Working with the project

```shell
grunt
```

The default Grunt task will:

* Watch `_sass` folder for changes
* Launch a Jekyll watch and auto-build on every file change.
* Launch default Jekyll dev server.

```shell
grunt build
```

Build without watching.

### Assets and pages locations

* Edit styles inside `/_sass/` folder. `/css/` is auto generated.
* The project's homepage is the file `index.html` in the root folder.
* All the site's data are in the `_data/` folder.

## Notes

* [Create a Google Developer Project and get an AppId](https://console.developers.google.com/project)

## License

[MIT](http://opensource.org/licenses/MIT)
