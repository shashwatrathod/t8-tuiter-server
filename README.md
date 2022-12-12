# Tuiter

Welcome to the web service for Tuiter. This project is an extension of Jose Annunziato's [Tuiter](https://github.com/jannunzi/software-engineering-react-fa22). Tuiter is a space for users to interact across the globe while sharing their thoughts, opinions, and news on events happening worldwide. In adition to features like the ability of a user to create a tuit and like-dislike other tuits, follow other users and view their tuits and send messages to one another, this extension adds a few extra features.

Currently, Tuiter allows users to post tuits that can be freely viewed by others but editing them isn't supported yet. This can cause some serious confusion, leave out additional facts learned over a timespan in case of current issues posted, and propagate misinformation if the author of this tuit made mistake while writing it. Our work allows users to edit tuits after they are posted. Edited tuits have a mark on them, thereby letting readers know that the tuit was edited.

However, while mere editing of a tuit does add some sense of flexibility and transparency, its value can be further increased if the version history is also available to be viewed. Therefore, our version of Tuiter also allows users to track the changes that a parent tuit has undergone with each edit. This gives us a solid way for users to track each iteration their tuit underwent.

A key aspect of Tuiter (or any other social media platform) is the way users interact with each other. Unlike most popular social media platforms, currently Tuiter does not permit a user to tag or mention other users in their tuits. We change that. A user is now able to mention other users in their tuits. Profiles of the tagged users can be accessed by simply clicking on the tag in tuit’s text. There is also a “Mentions” tab to a user’s profile page so that anyone viewing another user’s profile can easily go through the tuits that the user is mentioned in.

## Setting up a local development environment

1. [Download and install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) `node` and `npm`.
2. [Install](https://www.mongodb.com/docs/manual/installation/) `mongodb`.
3. Clone this repository `
git clone https://github.com/shashwatrathod/t8-tuiter-server
`.
1. Open a terminal inside `t8-tuiter-server` directory.
2. Run `npm install`. This shall install all the necessary packages.
3. Follow these [instructions](#setting-up-environment-variables) to set up environment variables.
4. Run `npm run dev` to start the development server.

## Using this web service

This RESTful webservice enables several enpoints that achieve different tasks. Details about these endpoints and their example usage can be found in this postman collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/12913612-1f0f2e08-d357-46ec-bb0c-86d7dc317d80?action=collection%2Ffork&collection-url=entityId%3D12913612-1f0f2e08-d357-46ec-bb0c-86d7dc317d80%26entityType%3Dcollection%26workspaceId%3Dc915f780-8edd-43ae-805f-fcc97c6aef59)

_NOTE_: Some of these endpoints require the user to be logged in. These can be spotted by the use of `me` as `:uid` instead of an actual mongodb ObjectId.

## Technologies Used
- Node
- TypeScript
- Express
- MongoDB
- Mongoose
- express-session
## Setting up environment variables

1. Create a file called `.env` in the root level directory of this project.

2. This `.env` file should contain the following:
```
MONGO_URI=*your mongo uri*
SECRET=*some secret string*
```
3. You can also edit a sample [.env](./.env.example) file provided with this repository. Make sure to remove `.example` from the filename.