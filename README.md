# [skgtech.github.io](http://skgtech.io)

Thessaloniki's tech and developer Events, Meetups & News.

## Meetup Organizers

SKGTech is using a [Public Google Calendar](https://www.google.com/calendar/embed?src=2ul10sd9g30mnk1vpmcnnp5qv4%40group.calendar.google.com&ctz=Europe/Athens) for storing and reading the events and meetups. We also retain very few *Pinned* events that are edited only within this repository and [reside in the _data/agenda.yaml file](https://github.com/skgtech/skgtech.github.io/blob/master/_data/agenda.yaml). The *Pinned* events will appear after all the Calendar events.

What you need to do is create a new Calendar event from your Gmail account and invite the SKGTech Public Calendar:

### Creating the Event

#### Event Name, Location, Time

![The new Event form](http://than.pol.as/Uwu3/Screen%20Shot%202014-04-11%20at%2011.40.03%20AM.png)

Create a new event in your calendar, use a short and descriptive name, define the duration of the even.

In the **Where** field you need to enter a Google Maps resolvable address, meaning an address that Google Maps can resolve to a location.

##### A Good Address

```
Stratigou Sfetsou 3, Thessaloniki, 54626, Greece
```

##### A Bad Address

```
Sfetsou 3, 2nd floor
```

#### The Event Description

![Event Description](http://than.pol.as/UxGC/Screen%20Shot%202014-04-11%20at%2011.43.53%20AM.png)

The event description is a special data entry field, the SKGTech website will parse the description and look for specific keywords that will then use to render the event. The fields have a unique name and are separated using a colon from their values, here are all the possible fields:

* **Venue:** This is a free text field, this is the place where you name a particular venue and any special instructions on where to find the meetup (i.e. 2nd floor, Office #3).
* **Info:** This field expects a url that points to the events homepage.
* **Map:** This field expects a Google Maps url that points directly to a Google Maps link with the exact location of the event.

All of the above fields are optional, however at least one has to be defined. Here's an example *Description* event field from the OpenThessaloniki event:

```
Venue: 2nd Floor, Office 3
Info: http://www.openthessaloniki.org/
Map: https://www.google.com/maps?q=Ethnikis+Antistaseos+17,+Kalamaria,+Thessaloniki,+Greece&hl=en&sll=40.621193,22.954988&sspn=0.024365,0.039783&hnear=Leoforos+Ethnikis+Antistaseos+17,+Kalamaria,+Thessaloniki,+Greece&t=m&z=16&iwloc=A
```

#### Inviting SKGTech Calendar

![Inviting SKGTech Calendar](http://than.pol.as/Uxli/Screen%20Shot%202014-04-11%20at%2011.51.59%20AM.png)

You need to paste the following email address in the "Add Guests" field and press the "Add" button:

```
2ul10sd9g30mnk1vpmcnnp5qv4@group.calendar.google.com
```

We know this is hard to remember so if you are a frequent event organizer then it would make sense to create a new contact "SKGTech Calendar" and save the email there...

That was it, you can now *Save* the new event and as soon as we accept the invitation it will automatically be propagated to the live [skgtech.io](skgtech.io) website.

If all of this sounds too complicated for you, you can then [try the Online Form of shame](https://docs.google.com/forms/d/15OfvYWpwuFXW-zOMOWFoYR6skHUNqzEdJts5hWtcL08/viewform).

## Contributors and Maintainers

If you know your way with Github, editing and updating the communities and the pinned agenda items is very simple, just [edit the `_data/communities.yaml` or `_data/pinnedAgenda.yaml` files](https://github.com/skgtech/skgtech.github.io/blob/master/_data/) and send a Pull Request.

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

* Edit styles from the `assets/css/main.css` file.
* Edit the layout from the `_includes/themes/twitter/` folder.
* The project's homepage is the file `index.html` in the root folder.
* Edit the markup for the *Meetups* and *Agenda* items in the `_includes/widgets/` folder.
* All the site's data are in the `_data/` folder.

## Colophon

* Uses [Bolt template](http://bootstrapzero.com/bootstrap-template/bolt)

## License

[MIT](http://opensource.org/licenses/MIT)
