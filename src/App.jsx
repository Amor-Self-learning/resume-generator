import { useState } from 'react'
import { TextInput, Textarea, Slider, ProfilePic } from './components'
import './layout.css'
import './styles.css'
const Title = ({unlocked}) => {
  return (
    <section id="title" className='flex-column ft-heading'>
      <TextInput id="name" unlocked={unlocked} initialValue='AMOR ZEPHYR' className='uppercase xl bold' placeholder='AMOR ZEPHYR'></TextInput>
      <TextInput id='job-title' unlocked={unlocked} initialValue='Front End Developer' className='bold large' placeholder='Front End Developer'></TextInput>
    </section>
  )
}

const Header = ({unlocked}) => {
  return (
    <section tabIndex={0} id='header' className='section flex-row space-arnd'>
      <ProfilePic unlocked={unlocked}></ProfilePic>
      <Title unlocked={unlocked}></Title>
    </section>
  )
}
const App = () => {
  const [unlocked, setUnlocked] = useState(true);
  return (
    <>
     <Header unlocked={unlocked}></Header>
    </>
  )
}

export default App
