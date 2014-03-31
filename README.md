# [skgtech.github.io](http://skgtech.io)

Thessaloniki's tech and developer Events, Meetups & News.

## Meetup Organizers

If you don't see your meetup on the page please [open a new issue](https://github.com/thessaloniki/meetups/issues/new) and ask for your meetup to be included. Make sure to include the following information:

* Your meetup's name
* The period of your meetup (weekly, monthly, etc)
* A short description about your meetup
* Your meetups url
* The meetups organizers and contact details (email, twitter, facebook, etc)

If you know your way with Github then please send a pull request [by editing the `_data/meetups.yaml` file](https://github.com/thessaloniki/meetups/blob/master/_data/meetups.yaml).

## Web Designers

If you want to contribute to the development of this site you first need to setup your environment based on the project's requirements.

### The Stack

 * [Node 0.10.x](http://nodejs.org/)
 * [Ruby](http://www.ruby-lang.org/en/downloads/) If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal.
 * [Grunt](http://gruntjs.com) `npm install -g grunt-cli`
 * [Bower](http://bower.io) `npm install -g bower`
 * [Jekyll](http://jekyllrb.com/) `gem install jekyll`

This project was built using [Jekyll](http://jekyllrb.com/) and is based on the [JekyllBootstrap template](http://jekyllbootstrap.com/), you don't need to be familiar with these tools to do most of the tasks.

### Installing the project

First [fork this repository](https://github.com/thessaloniki/meetups/fork) and clone it to your local:

```shell
git clone git@github.com:YOUR_USERNAME/meetups.git
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

* Edit styles from the `assets/css/main.css` file.
* Edit the layout from the `_includes/themes/twitter/` folder.
* The project's homepage is the file `index.html` in the root folder.
* Edit the markup for the *Meetups* and *Agenda* items in the `_includes/widgets/` folder.
* All the site's data are in the `_data/` folder.

## Colophon

* Uses [Bolt template](http://bootstrapzero.com/bootstrap-template/bolt)

## License

[MIT](http://opensource.org/licenses/MIT)
