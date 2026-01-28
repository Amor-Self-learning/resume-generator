import { useState } from 'react'
import { TextInput, Textarea, Slider, ProfilePic,AddButton,  Heading, ExpandableSection } from './components'
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
  const skills = [
    {id: 'html', label: 'HTML', unlocked: unlocked, initialValue: 80},
    {id: 'css', label: 'CSS', unlocked: unlocked, initialValue: 85},
    {id: 'js', label: 'JS', unlocked: unlocked, initialValue: 85},
    {id: 'react', label: 'React', unlocked: unlocked, initialValue: 50},
    {id: 'nodejs', label: 'NodeJS', unlocked: unlocked, initialValue: 40},
    {id: 'restapi', label: 'RestAPI', unlocked: unlocked, initialValue: 60}
  ];
  const newSkill = {id: crypto.randomUUID(), label: 'New Skill', unlocked: unlocked, initialValue: 50 };
  const isExpandable = () => {
    return skills.length < 7 ? true: false;
  }
  return (
    <ExpandableSection 
      id={'skills'} 
      className='section flex-column'
      tabIndex={2}
      unlocked={unlocked}
      newValue={newSkill}
      initialValue={skills}
      expandable={isExpandable()}
      type='skills'
    ></ExpandableSection> 
  )

}

const Education = ({unlocked}) => {
  const edu = [
    {id: 'inter', title: 'Intermediate', date: {start: {month: 'March', year: '2020'}, end: {month: 'Feb', year: '2022'}}, value: "I've completed my Intermediate education from Govt Millat Graduage College Mumtazabaad Multan with 89% of Marks. I got 2nd Position in the Class"},
    {id: 'bs', title: 'BS CS', date: {start: {month: 'Sep' , year: 2025}, end: {month: 'June', year: 2029}}, value: "I've started to pursue my my BS CS from NUML Multan in Fall 2025 which will be completed in 2029. I'm very interested in this field and making efforts to understand and use it."}
  ]

  const newEdu = {id: crypto.randomUUID(), title: 'New Study', date: {start: {month: 'Jan', year: 2026}, end: {month: 'Jan', year:  2027}, value: "I've Pursued this new degree..."}}
  const isExpandable = () =>{
    return edu.length < 4 ? true: false;
  }
  return (
    <ExpandableSection 
      tabIndex={3} 
      id='education' 
      unlocked={unlocked} 
      className={'flex-column education'} 
      newValue={newEdu} 
      initialValue={edu} 
      expandable={isExpandable()}
      type='edu-exp'
    ></ExpandableSection>
  )
}

const Experience = ({unlocked}) => {
  const exp = [
    {id: 'top', title: 'TOP', date: {start: {month: 'August', year: 2025}, end: {month: 'April', year: '2026'}, value: "I re started The Odin Project ins August and hope to finish it in April 2026, I've now prior working experience"}},
    {id: 'cs50', title: 'CS50', date: {start: {month: 'Jan', year: 2025}, end: {month: 'Dec', year: 2025}}, value: "I started cs50x in jan 2025 and finished it in Dec 2025."}
  ]
  const isExpandable = () => {
    return exp.length < 4 ? true : false;
  }
  const newExp = {id: crypto.randomUUID(), title: 'New Experience', date: {start: {month: 'Jan', year: 2026}, end: {month: 'Jan', year:  2027}, value: "I've gained this expereince..."}}

  return (
    <ExpandableSection
      tabIndex={4}
      id='experience'
      unlocked={unlocked}
      className={'flex-column experience'}
      newValue={newExp}
      initialValue={exp}
      expandable={isExpandable()}
      type='edu-exp'
    ></ExpandableSection>
  )
}

const Achievements = ({unlocked}) => {
  const achievements = [
    {id: 'cs50', title: 'CS50x', value: 'Completed cs50x in 2025'},
    {id: 'cs50', title: 'Rainify', value: 'Created weather app in vanilla JS'}
  ]

  const newAchieve = {id: crypto.randomUUID(), title: 'New Achievement', value: "I achived ..."}
  const isExpandable = () => {
    return achievements.length < 4 ? true : false;
  }

  return (
    <ExpandableSection 
      tabIndex={5} id='achievements' 
      unlocked={unlocked} 
      className='flex-column achievements' 
      newValue={newAchieve} 
      initialValue={achievements} 
      expandable={isExpandable()} 
      type='achievements'
    ></ExpandableSection>
  )
}

const Hobbies = ({unlocked}) => {
  const hobbies = [
    {id: 'cricket', value: 'Watching Cricket'},
    {id: 'browsing', value: 'Browsing'},
    {id: 'ui', value: 'creatingUI'}
  ]

  const newHobby = {id: crypto.randomUUID(), value: 'newHobby'};
  const isExpandable = () =>{
    return hobbies.length < 10 ? true : false;
  }
  return (
    <ExpandableSection id={'hobbies'} tabIndex={6} initialValue={hobbies} newValue={newHobby} unlocked={unlocked} expandable={isExpandable()} type='hobbies'></ExpandableSection>
  )
}
const App = () => {
  const [unlocked, setUnlocked] = useState(true);
  return (
    <>
     <Header unlocked={unlocked}></Header>
     <Profile unlocked={unlocked}></Profile>
     <Skills unlocked={unlocked}></Skills>
     <Education unlocked={unlocked}></Education>
     <Experience unlocked={unlocked}></Experience>
     <Achievements unlocked={unlocked}></Achievements>
     <Hobbies unlocked={unlocked}></Hobbies>
     <div className='seperator'></div>
    </>
  )
}

export default App
