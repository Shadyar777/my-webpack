// Test import of styles
// import '@/styles/index.scss'
import './styles/index.scss'



const app = document.querySelector('#root')
const Box = document.createElement('div')
Box.innerHTML = 'Hello world! webpack-5'

app.append(Box)

class User {
  constructor() {
    this.name = 'Shadiar'
    this.email = 'shadiar@gmail.com'
  }
}

const use = new User()
