---
id: store
title: Redux/Data Store
---

## Core Principle

The flow of information in a ReactJS app, should go in a single direction:
![alt-text](assets/store-cycle.png)
Here, the UI invokes an action, which in turn triggers a reducer, which updates a data store, which updates the UI. 

This may seem like a lot extra steps to make simple data changes, however making the data in your app always flows in a
single direction like this helps make debugging your app far easier, and improves the scalability of your app. 

Most apps will have at least one backend system they will interact with. If we look at the same flow, with an API 
introduced, illustrates how important and powerful this becomes:
![alt-text](assets/store-cycle-with-backend.png)

## Each Flow Step

### Store -> UI

*Coming Soon*

### UI -> Actions

*Coming Soon*

### Actions -> API/Reducers

*Coming Soon*

### Reducers -> Store 

*Coming Soon*

## More Resources

If you are new to React, we suggest watching through these 14 videos on React & Flux by [LearnCode.academy](https://twitter.com/learncodeacad):

 - [React JS Tutorial](https://youtu.be/MhkGQAoc7bc?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)
 
 
After, we would also suggest take a look at these 7 videos on Redux within React, also by [LearnCode.academy](https://twitter.com/learncodeacad):

- [Redux Tutorial](https://youtu.be/1w-oQ-i1XB8?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)
