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

Let’s add the rating to the products. Again it’s done through the creation of a component. And with the ` react-icons ` it’s possible to render the starts using a condition to add a full, half or open star. 

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

## Developer’s log, Stardate 2309.08

### Setting servers, Connection Frontend and Backend
To start today, let’s create our backend. To start, let’s use the command

```console
npm init
``` 
With this, npm creates the package.json with the needed configuration. After configuring the server in ` backend\server.js ` we can install the package express that is a web framework.

```console
npm i express
``` 
After installing it, it’s possible to make an API to server our products from ` products.js ` creating a request in  ` /api/products:id ` where the :id is a placeholder for us to get the product with that id.
```javascript

import products from './data/products.js' // since it's my own js module I have to put .js

const APP = express()

APP.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})
```

Express is amazing, but every time some change is done, you have to close the server and run it again. It can be a pain in the neck, but there’s another package that is wonderful to help it, and it’s nodemon, it automatically restarts the node application when file changes in the directory are detected. And we also installed concurrently so it’s possible to run multiple commands. Therefore, we can run both the frontend and the backend. We can also add the package dotenv to keep our  environmental variables. Since we will only need these packages in production we can install them as Dev dependencies

```console
npm install -D nodemon concurrently dotenv
``` 
There was a problem, though, while fetching the data from the backend there was a problem. It bugged me for a while to discover why the problem occurred. The problem was with a variable, the ` product.price ` because I was using a function ` toLocaleString ` to convert the number to pt-BR, to make it BRL currency and to add two digits to the end of the number. It was working on HomeScreen.jsx but not on ProductScreen.jsx. Because of course, on HomeScreen.jsx, it sent the variable through a *prop* to Product.jsx, so the variable had a value, whereas in ProductScreen.jsx it was undefined, so the function couldn’t be applied. The solution, although simple, took me a while to solve, I just had to put a ` ? ` after the variable, it is called **Optional chaining**, that ensures that the formatting is only applied when the variable is not null or undefined.

## Developer’s log, Stardate 2309.09

### Getting MongoDB and connecting to it, Creating the model for DB, defining models, testing with sample data

MongoDB used on this project is going to be hosted in its own site, so no need to install it locally.  Although we are going to use MongoDB Compass, a desktop application to easy access your database and make the modifications that are necessary. To finish let’s install the mangoose packages
```console
npm i mongoose
``` 
After installing the mongoose package we create a configuration file to connect to the DB
```javascript
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
``` 
First of all we import it. Then we create a function to connect it, using a try/catch structure in which we first try to connect, if succeeded we console.log a message, otherwise we console.log the error message. And then export it. To finish we have to import it to the server.js and then call it.

Although using a noSQL database, you don’t need to worry about all the types of every entry, but it’s important to have an structure, a schema to the data, like this:

```javascript
const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
       rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },

}, {
    timestamps: true,
})
``` 

in which the user is defined as a type of ` mongoose.Schema.Types.ObjectId ` that is a built-in Mongoose data type, this will store MongoDB ObjectId values, and the reference is going to be the user schema, and so on. Now it’s time to feed the database with the products that were in the ` products.js ` and create some users with a script ` users.js `. 

## Developer’s log, Stardate 2309.12

### Error, Shopping Cart

Last day I coded an interesting part of the backend of the shop, but sadly I forgot to save what a had written, so, I am sorry. To sum it up, we installed Redux Toolkit, and created some slices. The Redux Toolkit is going to be used to make the information updated and available to all components inside the application, of course it’s a more complex than this, but it is a roughly sum of it. We also created some middleware to check for any errors. So instead of only fetching the data from the database, we are going to send a request, and see if everything goes fine and then show the info, in the meantime, there will be a loading spinner. 

Now, let’s start to create the shopping cart. First of all let’s create a slice for it. First we added the cart slicer to store the products and quantities throughout the app and the components, and we also added it to the localStorage. 

## Developer’s log, Stardate 2309.13

### CartScreen, Users routes

The creating of the CartScreen was similar to the others screen components, this time, though, we used the redux information since the beginning. We created a layout with 8 columns of the 12 to the image of the product, its name, price, quantity and an remove from cart button. The other 4 columns where used to create a card with the subtotal of the purchase (without tanking into account the shipping price) and a button to go to the checkout. Both functions ` addToCart ` and ` removeFromCart ` where imported from the ` cartSlice.js `. 

Now it’s time to start the backend structure to make possible to our site to have users. To do so, we have create the same structure we had for products. First we have a controller ` userController.js ` inside it we import our middleware handlers.
```javascript
const authUser = asyncHandler(async (req,res) =>{
    res.send('auth user')
})

const registerUser = asyncHandler(async (req,res) =>{
    res.send('register user')
})
```
For example here, we have our authenticate user and our register user controllers.  We import them into our ` userRoutes.js ` in which we are going to use in express to control the routes of the requests ` router.route('/').post(registerUser).get(getUsers) ` for example, it the request is a POST one, the server is going to execute the `  registerUser `, and if it is an GET  the server executes a ` getUsers ` and we finish it putting the routes in our ` server.js `. To test if everything is set correctly, we use Postman to check the routes, we can also create a collection of the requests to further use, with some information.

## Developer’s log, Stardate 2309.14

###Auth User

In order to get the body information we must add it to our server.js, where we are going to get the raw json and the URL encoded for this we can use
```javascript
const APP = express()

APP.use(express.json())
APP.use(express.urlencoded({extended: true}))
```
with this the create a middleware to get the body information needed. So instead pf getting undefined with the request, we get an object with the information. Through this it’s possible to verify in our ` userController.js ` both the user and the password, to both, validate it or throw an error.
```javascript
    const { email, password } = req.body

    const user = await User.findOne({ email: email })
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('E-mail ou password inválido')
    }
```
like this. We get both email and password from the body, then compare, if it’s not the same, we throw the error. After storing the email and user from the body using the destructuring, then we use the function findOne from mongoose created in the ` userModel.js `, in our user schema.  From this same model we use the function matchPassword to check for the password, if both match we can see the information in our database otherwise the send the HTTP status of 401 (Unauthorized) and throw the user an error.

## Developer’s log, Stardate 2309.18

### JWS
JWS, Jason Web Tokens, is one of the ways of authenticate an user, and it’s an secure way to share information between two parties, like the web server and the client. It’s divided into three parts, a header, a payload and a signature. The header is divided into two parts, the type of token, in our case JWT, and the signing algorithm being used. The payload which contains the claims that are statements about and entity, in this case the user and additional data. The last part is the signature that’1s is the decoding part, it checks if the message hasn’t changed along the way.
We can set a cookie as a response for a page like this
```javascript

const token = jwt.sign({ userId: user._id }, a1b2c3 { expiresIn: '30d' })

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

```
first we have our cookie set as a variable with the user, it’s secure key and expire time set. Then we create a respond to create the cookie from the variable token. Now we can create a middleware to parse our cookie.

## Developer’s log, Stardate 2309.19

### Private Routes

To make a Route private, we just have to create a component, for example ` PrivateRoute.jsx ` and then add it 
```javascript
import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth)

    return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
```
in our ` index.js ` the file that controls the routes, import it and then create a <Route> element and put the private routes inside it, like this
```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} /> //public routes
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />


      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} /> //private routes
      </Route>
    </Route>
  )
)
```

## Developer’s log, Stardate 2309.22

### PayPal integration

First of all, although I didn’t put any entries in the last days doesn’t mean that I didn’t do a thing on the project, but I didn’t think there was some relevant content to post. Anyway, every commerce site wants to sell things and of course get some money from it. This one is not different, and in order to get some money we are going to use PayPal for it. It is very easy to test the API since you get a sandbox environment and the integration seems quite simple. And to integrate it with our shop we can use
```console
npm I @paypal/react-paypal-js
```
and after it we import its provider, put it inside our ` index.js ` like this
```javascript
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
        </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
``