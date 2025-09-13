import { useState ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from "../components/header"
import Footer from "../components/footer"
import Hero from "../components/hero"
import Games from "../components/games"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
 const games_ref = useRef(null);
  const contact_ref = useRef(null);
  const base_url=import.meta.env.VITE_BASE_URL;
  return (
    <>
    <Header></Header>
    <Hero games_ref={games_ref} contact_ref={contact_ref} />     
    <p className="pt-5 mb-12 faster-one-regular text-center text-3xl font-bold text-white" ref={games_ref}>Our Games</p>
    <Games base_url={base_url}></Games>
    <hr className="border-t-2 border-white my-6" />

    <Footer base_url={base_url} contact_ref={contact_ref}></Footer>
    </>
  )
}

export default App
