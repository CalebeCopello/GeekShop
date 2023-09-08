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

The thing about ReactJS is its division in different and reusable components. To this project some packages are going to be used, to make the styling of the page easier, and focus more on its code, let’s install `react-bootstrap` the Bootstrap 5 components built with React, `bootstrap` the most popular frontend toolkit, and `react-icons` icons of popular icon packs.

```console
npm i react-bootstrap bootstrap react-icons
``` 
After importing it in `index.js`, we can start to create both the Header and the Footer for the page.

The header starts with the same structure of every component for ReactJS, it’s possible to be created through the snippet, as explained before, but I preferred to type it out, just to get used to it. 

As my first time time using bootstrap, I got dazzled, because it has everything already organized and structured, of course that’s because many developers choose to use it on their projects. But *“Every choice is a renunciation.”* it makes everything quite easy, but very similar.  Of course that you can customize it, and that’s what I’m trying to do.


## Developer’s log, Stardate 2309.07

### List of Products, Products Cards and Routing

Since this project is just to be used in a showcase, I decide to make a fantasy shop, what does it mean? That the products showed in the shop are all from video-games. To catalog all the products let’s start hard coding all of them in a .js file called `products.js`, later there will be a page in the admin panel to add the products to the database, but for now, to structure the page, let’s put it in the mentioned file. The structure of the file is like this:
```javascript
const products = [
    {
        _id: '1',
        name: 'Portal Gun',
        image: './images/ApertureScienceHandheldPortalDevicePortal.png',
        description: 'The Aperture Science Handheld Portal Device, originally marketed in the 1950s as an Aperture Science Portable Quantum Tunneling Device, also commonly known as a Portal Gun or by its acronym, "ASHPD", is an experimental tool used to create two portals through which objects can pass. ',
        brand: 'Portal',
        category: 'Equipment',
        price: 99.99,
        countInStock: 99,
        rating: 3.5,
        numReviews: 13,
    }
]

export default products
```
Where there is, an id for the product, the id starts with an underscore because in MongoDB that’s how the object ID is  defined. There’s a name for the product, an image path, a description for it. The brand, in the case of this shop it’s going to be used to set the game franchise. The category of the product: an item or a clothing, for example. The “price” of it, how many products are there in the stock, the rating users gave to it, and to finish how many reviews.

After hard coding some products, it’s time to create the home screen. It’s going to show the products that we have. To doing so we are going to use some Bootstrap to show them in columns and with some responsiveness .
```javascript
<Col sm={12} md={6} lg={4} xl={3}>
```
So with this when the screen is small, it will take 12 columns, when medium it’s going to take 6, so it will take 2 because 12 is the total, and so on. To show the products we are going to create a card using the Bootstrap model for it.

Now that it’s working fine, it’s time to implement React Router using the node package manager, like this
```console
npm i react-router-dom react-router-bootstrap
```
`react-router-dom` contains bindings for using React Router in web applications, in other words, it’s going to be used to make links directly without loading new pages. The `react-router-bootstrap` allows to use the React Router alongside React Bootstrap.

Let’s add the rating to to products. Again it’s done through the creation of a component. And with the ` react-icons ` it’s possible to render the starts using a condition to add a full, half or open star. 

To finish this part, we added the routing for the products in the index.js, like this

```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
    </Route>
  )
)
```
Using the Router we get the path and add a ProductScreen related to its id.