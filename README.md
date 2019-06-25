# SEI-Project-4

# Drinks on me

## Timeframe - 7 days as a solo project

## Technologies/ Frameworks used:
* HTML5
* SCSS
* Bulma
* React.js
* Webpack
* Axios
* Mapbox
* Yelp
* Python
* Bulma
* AnimateCSS
* PonyORM
* Flask
* SQL database
* PostgreSQL
* JWT
* Models with Reference and Embedded
* Git
* GitHub
* Heroku
* Insominia

## Overview
Drinks on me is a event planning website.

![HOME PAGE](https://user-images.githubusercontent.com/42970647/60105529-6000e400-975b-11e9-89d9-ff6e3c4e9340.png)

You can find a hosted version here ----> https://drinks-on-me.herokuapp.com/#/

## Functionality
This application finds the users 50 local pubs and lets users to plan events at those pubs.

The user can see other users planned events, to help arrange events.

* A personalised map with locations of 50 local pubs based on user location and the Yelp API.

![MAIN MAP](https://user-images.githubusercontent.com/42970647/60105687-b3733200-975b-11e9-9c7d-3e7a8442a7ec.png)

## Development process

I really wanted to do a project on my own and also to use APIs because in my previous project we didn't used any API's. After seeing people use maps for their projects, I really wanted to use them and after speaking to a student from the UX course, the initial idea was born.

I drew out each part of the user journey and also planned out the models and controllers.


## Design

* I wanted to design the website using the map as the main page.
* I then used modals to popup information rather than go to other pages.

![MODALS](https://user-images.githubusercontent.com/42970647/60105893-1d8bd700-975c-11e9-9ee7-3f3ef203d643.png)

* The user can only see the map and all the information if they are logged in.
* I used Bulma to help with the responsiveness of the page and I also used AnimateCSS for the modal animations.


## Wins

* I hadn't used Python and PostgreSQL databases in a project before as well as maps. I wasn't feeling too confident going into this project but I got things running fairly smoothly.
* I had CORS issues with the Yelp API and had to make the request via my backend. This again wasn't something I'd even considered before but I got it working.
* Lastly I had some issues working with the post load state of my Event models. What I wanted to do was use the venue from the Yelp API and save it on my database if there wasn't a venue or use the venues data if it was present on the database.

```python
  @post_load
    def load_venue(self, data):
        venue = Venue.get(yelp_id=data['venue']['yelp_id'])
        if not venue:
            venue = Venue(**data['venue'])
        data['venue'] = venue
        print(data)
        return data
```

## Challenges
* Getting the events model to work with the venue id was hard and required post load state to be implemented.

* One main issue I had and one that I would to work on for the future was assigning the markers different colours based on whether an event was planned at that pub. I did get it working however this slowed the application down so had to take it out.

![MAP CARDS](https://user-images.githubusercontent.com/42970647/60105989-48762b00-975c-11e9-8ba9-eb0a85ecbeb3.png)


## Future features / Enhancement
* Refactoring - I would really like to go back to refactor the code so it is easy to read and also separate things into more files as Map file is too big for my liking.

* Add coloured map markers based on if there is events on at the pub.

* Add friends and a profile page that would list users events and also only displays friends events on the map page rather than everyone.
