# GeekShop
 An ECommerce web application using the MERN stack

 ## Developer’s log, Stardate 2309.05

### Starting the Ecommerce

The project starts with the famous command
```console
npx create-react-app frontend
```
Therefore there is the Vite template, this project will stick with the famous react-react-app. Since it’s going to be my first large project, it’s safer to go with a more solid build tool The name of the project is going to be fronted, because, logically it is going to handle the client-side of the application. 

After creating the project the tool suggests that we start the server. Doing this and after cleaning up the basic structure that ReactJS installs. We can erase what is inside the App.js and then use the snippet `rafce` to create the basic React arrow function component:
```javascript
import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App
```

When the React app is created it also creates a `.git` directory and a `.gitignore` file, to structure the app for a git repository. 

## Developer’s log, Stardate 2309.06

### Creating Header and Footer components

The thing about ReactJS is its division in different and reusable components. To this project some packages are going to be used, to make the styling of the page easier, and focus more on its code, let’s install `react-bootstrap` the Bootstrap 5 components built with React, `bootstrap` the most popular, and `react-icons` icons of popular icon packs.

```console
npm i react-bootstrap bootstrap react-icons
``` 
After importing it in `index.js`, we can start to create both the Header and the Footer for the page.

The header starts with the same structure of every component for ReactJS, it’s possible to be created through the snippet, as explained before, but I preferred to type it out, just to get used to it. 

As my first time time using bootstrap, I got dazzled, because it has everything already organized and structured, of course that’s because many developers choose to use it on their projects. But *“Every choice is a renunciation.”* it makes everything quite easy, but very similar.  Of course that you can customize it, and that’s what I’m trying to do.