---
layout: page
title: Welcome / Καλώς ήρθατε!
---
{% include JB/setup %}

This is an open website about Thessaloniki's developers and tech lovers community.

Αυτός είναι ένας ανοιχτός ιστότοπος σχετικά με την κοινώτητα των developers και φίλων της τεχνολογίας στη Θεσσαλονίκη.

## Meetups in Thessaloniki

{% for meetup in site.data.meetups %}
#### {{ meetup.name }}

* **Period**: {{ meetup.period }}
* **Description**: {{ meetup.description }}
* **Website**: {{ meetup.website }}
* **Maintainers**:
{% for maintainer in meetup.maintainers %}
  * [{{maintainer.name}}](mailto:{{maintainer.email}})
{% endfor %}
{% endfor %}

