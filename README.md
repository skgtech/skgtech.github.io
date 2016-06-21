[![Logo](assets/img/skgtech-logo.png  "SKGTech")](http://skgtech.io)

#### SKGTech is a non profit organization based in Thessaloniki, Greece. The organization is comprised of creative and passionate people that love all the things revolving around technology.

### For Meetup Organizers

SKGTech is using a public [Google Calendar](https://www.google.com/calendar/embed?src=2ul10sd9g30mnk1vpmcnnp5qv4%40group.calendar.google.com&ctz=Europe/Athens) for storing and reading the events and meetups. See how you can [add your event](http://skgtech.io/submit-event).

## For Web Developers

If you want to contribute to the development of this site you first need to setup your environment based on the project's requirements.

#### The Stack

 * [Node](http://nodejs.org/)
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

* Browserify the required modules.
* Build `sass` and the Jekyll site.
* Launch default Jekyll dev server with BrowserSync.
* Watch HTML/SASS/JS/YAML folders and rebuild and reload the site on your browser.

More specific tasks:

* `gulp browserify`: Browserifies whatever is in `_app` and produces `assets/js/app.js`
* `gulp jekyll-build`: Builds jekyll
* `gulp sass`: Builds sass sources, adds source comments and produces `_site/css/style.css` and `css/style.css` files.

#### Assets and pages locations

* Edit styles inside `_sass/` folder. `/css/style.css` is auto generated and injected by BrowserSync.
* The project's homepage is the file `index.html` in the root folder.
* All the site's data are in the `_data/` folder.

## License

[MIT](http://opensource.org/licenses/MIT)
