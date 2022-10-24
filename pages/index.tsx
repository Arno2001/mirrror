import type { NextPage } from 'next'
import { useReducer } from 'react'
import '../styles/Home.module.css'
import Header from '../src/components/Header'
import ImageUpload from '../src/components/ImageUpload'

const Home: NextPage = () => {
  return (
    <div className="App" >
      <Header />
      <ImageUpload />
    </div>
  )
}

export default Home;
