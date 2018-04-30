import Home from './components/Home'
import List from './components/List'
import Binding from './components/Binding'
import Invoice from './components/Invoice'

const routes = [
  
  { path: '/', component: Home}, 
  { path: '/binding', component: Binding}, 
  { path: '/list', component: List}, 
  { path: '/invoice', component: Invoice },
  { path: '/invoice/:id', component: Invoice }
]

export default routes