---
layout: page
title: How to Submit an Event
---

SKGTech is using a [Public Google Calendar](https://www.google.com/calendar/embed?src=2ul10sd9g30mnk1vpmcnnp5qv4%40group.calendar.google.com&ctz=Europe/Athens) for storing and reading the events and meetups. We also retain very few *Pinned* events that are edited only within the repository and [reside in the _data/pinnedAgenda.yaml file](https://github.com/skgtech/skgtech.github.io/blob/master/_data/pinnedAgenda.yaml). The *Pinned* events will appear after all the Calendar events.

What you need to do is create a new Calendar event from your Gmail account and invite the SKGTech Public Calendar:

### Creating the Event

#### Event Name, Location, Time

Create a new event in your calendar, use a short and descriptive name, define the duration of the even.

![The new Event form](http://than.pol.as/Uwu3/Screen%20Shot%202014-04-11%20at%2011.40.03%20AM.png)

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

The event description has a special role for the SKGTech website. It is used as the data entry field; The SKGTech engine will parse the description and look for specific keywords that will then use to render the event. The fields have a unique name and are separated using a colon from their values, here are all the possible fields:

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

That was it, you can now *Save* the new event and as soon as we accept the invitation it will automatically be propagated to the live [skgtech.io](http://skgtech.io) website.

If all of this sounds too complicated for you, you can then [try the Online Form of shame](https://docs.google.com/forms/d/15OfvYWpwuFXW-zOMOWFoYR6skHUNqzEdJts5hWtcL08/viewform).

## Contributors and Maintainers

If you know your way with Github, editing and updating the communities and the pinned agenda items is very simple, just [edit the `_data/communities.yaml` or `_data/pinnedAgenda.yaml` files](https://github.com/skgtech/skgtech.github.io/blob/master/_data/) and send a Pull Request.
