import { Header } from './components/Header.jsx'
import {Post} from './Post.jsx'

import './global.css'

export function App() {
  
  return (
    <div>
      <Header />
      <Post 
        author="Mosiah Andrade" 
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, esse quod. Aliquid veritatis iure dolore accusantium a itaque excepturi culpa. Illo culpa quaerat tempore incidunt tenetur fugiat voluptas, excepturi inventore?"
      />
      <Post
        author="Andre"
        content="Mais um para a lista mané"
      />
    </div>
  )
}
