---
layout: page
title : Blog
header : SKGTech's Blog
group: navigation
---

<div class="posts">
  {% for post in site.posts %}
    <article class="post">

      <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>

      <p class="small">Written on {{ post.date | date: "%B %e, %Y" }} by {{ authors[post.author].display_name }}</p>

      <p class="posts-description">{{ post.description }} <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a></p>
    </article>
  {% endfor %}
</div>
