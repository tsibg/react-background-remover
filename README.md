# React Background Remover

Removes background of the provided image.

React app for testing the Background Remover library [@imgly/background_remover](https://github.com/imgly/background-removal-js)

The static assets for the lib are now served from `/public/static/model` as this may improve loading time.
LIVE Preview: https://react-background-remover-seven.vercel.app/

## Setup
1. Install dependencies.
   
*The lib's assets will be automatically copied into `/public/static/model`*

`npm install`

3. Start dev server

`npm start`

4. Deploy

At deploy you can exclude the `/public/static/model` to skip shipping the lib's assets.

Already done in the `.vercelignore` for vercel deployments. Vercel runs the install procedure once deployed and the files are obtained and auto-copied in the needed dirs.

### ToDo
Still looking for better way to serve the assets for @imgly/background_remover. Currently, the whole module directory is copied in the public dir as the lack of convenient way to make otherwise. It is made on every install so it should be as bullet-proof as ugly solution.

Check https://github.com/imgly/background-removal-js/issues/59 for more info.

## Learn More

 [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
 [React documentation](https://reactjs.org/).
 [IMG.LY Background Remover](https://github.com/imgly/background-removal-js)
