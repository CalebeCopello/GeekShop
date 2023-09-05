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
