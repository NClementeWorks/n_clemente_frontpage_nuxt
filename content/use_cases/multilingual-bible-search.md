---
title: 'Multilingual Bible Search'
description: 'A Bible search application for a multi-lingual church community.'
image:
  src: '/img/use_cases/multilingual_bible_search.png'
---

<!-- ![my image](/img/use_cases/multilingual_bible_search.png) -->

<!-- [One Voice Fellowship Multilingual Bible Search](https://onevoicefellowship.org/bible-search){target="_blank"} -->

> ### Project Links
>
> :link: [One Voice Fellowship - Multilingual Bible Search](https://onevoicefellowship.org/bible-search){target="_blank"}
>
> :link: [GitHub Repository](https://github.com/NClementeWorks/ovf-multilingual-bible-search){target="_blank"}


## The Challenge

One Voice Fellowship church is a multi-lingual church in northern Virginia. As such they serve a very lingustically diverse community, where the English mastery level ranges from native to zero knowledge the language. Beign able to provide God's word in each person's language is critical to serving such a community while promoting the unity Christianity preaches. In taking this task seriously, the church pastors where spending a lot of time searching for Bible passages in multiple foreign language Bibles. This was too time and energy consuming for already busy people who had a whole community to serve.

[![Multilingual Bible Handouts](/img/use_cases/multilingual_bible_search/ovf-multilingual-bible-search-handouts.jpg){.page_image}
***Handouts for Bible classes with foreign language speakers***]{.figure}

When pastor Chris, the church main pastor, brought to me the idea of buiding some application for searching the Bible in a multi-lingual fashion and arranging the results according to certain specific needs, I immediately saw the possibilities. He, a quite brilliant man, had crafted himself a hand-drawn wireframe with his idea, and as he progressed with a verbal explanation of their core needs I further envisioned a complete WYSIWYG type web application.


[![Initial Application UI Prompt](/img/use_cases/multilingual_bible_search/ovf-multilingual-bible-search-initial-hand-prompt.jpg){.page_image}
***Initial Application UI Prompt made by pastor Chris***]{.figure}

## The Approach

The solution was comprised of a single page web application, an API and a database where anyone can lookup for multiple Bible passages in multiple languages simultaneously an see the results right away. 

### Database
The WordPress database was expanded to include new tables to hold the foreign language Bible versions to be supported by the application. For this I did a research on Public Domain and Creative Commons licensed Bibles.

### API
A simple API was developed within WordPress by expanding the existing WordPress JSON API to access the newly added tables. The importance of adding an API layer is that it provides the ability to update the database, or connect to additional APIs without disrupting the front-end application.

### SPA
Since the church already had a website running using WordPress this web application was delivered as a custom plugin for this platform. The application, build in VueJS and Vuetify, would query the API and the results could be re-grouped and exported in the predetermined ways required by the church. A WYSIWYG interface would provide more flexibility for the church staff.

<!-- #### Visual design and functionality -->

[![Application Mock](/img/use_cases/multilingual_bible_search/ovf-multilingual-bible-search-mock.jpg){.page_image}
***Application Mock created in Figma***]{.figure}


## The Results

The application is beign reliably used weekly by multiple church staff members.

Visit [One Voice Fellowship - Multilingual Bible Search](https://onevoicefellowship.org/bible-search){target="_blank"} and try the fully functioning application to see the final result.

Also check the project front-end's [GitHub repository](https://github.com/NClementeWorks/ovf-multilingual-bible-search){target="_blank"}
