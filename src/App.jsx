import { useState } from 'react'
import { TextInput, Textarea, Slider, ProfilePic,AddButton,  Heading } from './components'
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

const Profile = ({unlocked}) => {
  const myProfile = 'Frontend developer with a focus on React, building clean and responsive user interfaces. I have working knowledge of backend fundamentals and a strong foundation in C++, enabling effective problem-solving and well-structured code.'
  return (
    <section tabIndex={1} id='profile' className='section flex-column'>
      <Heading id='profile-heading' value={'PROFILE'}></Heading>
      <Textarea id='profile-text' unlocked={unlocked} initialValue={myProfile} placeholder={'Something about your professional self!'}></Textarea>
    </section>
  )
}

const Skills = ({unlocked}) => {
  const [skills, setSkills] = useState([
    {id: 'html', label: 'HTML', unlocked: unlocked, initialValue: 80},
    {id: 'css', label: 'CSS', unlocked: unlocked, initialValue: 85},
    {id: 'js', label: 'JS', unlocked: unlocked, initialValue: 85},
    {id: 'react', label: 'React', unlocked: unlocked, initialValue: 50},
    {id: 'nodejs', label: 'NodeJS', unlocked: unlocked, initialValue: 40},
    {id: 'restapi', label: 'RestAPI', unlocked: unlocked, initialValue: 60}
  ]);
  const newSkill = {id: crypto.randomUUID(), label: 'New Skill', unlocked: unlocked, initialValue: 50 };
  const isExpandable = () => {
    return skills.length < 7 ? true: false;
  }
  const handleAddBtn = () => {
    if(unlocked && isExpandable()) {
      setSkills([...skills, newSkill])
    }
  }
  const handleDel = (e) => {
    const newSkills = skills.filter(skill => `${skill.id}-del` !== e.target.id);
    setSkills([...newSkills])
  }
  return (
    <section 
      tabIndex={2}
      id='skills'
      className='flex-column'
    >
      <Heading id='skill-heading' value='SKILLS'></Heading>
      <div className="flex-column all-sliders">
      {skills.map(skil => (
        <Slider id={skil.id} key={skil.id} label={skil.label} unlocked={unlocked} initialValue={skil.initialValue} handleDel={handleDel}></Slider>
      ))}
      </div>
      <AddButton id='skill-add-btn' unlocked={unlocked} expandable={isExpandable()} handleClick={handleAddBtn} style={{display: unlocked && isExpandable() ? 'block' : 'none'}}></AddButton>
    </section>
  )

}
const App = () => {
  const [unlocked, setUnlocked] = useState(true);
  return (
    <>
     <Header unlocked={unlocked}></Header>
     <Profile unlocked={unlocked}></Profile>
     <Skills unlocked={unlocked}></Skills>
    </>
  )
}

export default App
