import { useState, useRef } from 'react';

const TextInput = ({id, unlocked, className, initialValue, placeholder}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <input
      type='text'
      id={id}
      autoComplete="on"
      placeholder={placeholder && initialValue}
      className= {`${className} inherit`}
      name={id}
      value={value}
      onChange={(e) => unlocked && setValue(e.target.value)}
      style={{
        cursor: unlocked ? 'text' : 'default',
        caretColor: unlocked ? 'initial' : 'transparent'
      }}
    />
  )
}

const Textarea = ({id, unlocked, initialValue, placeholder}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <textarea
      id={id}
      name={id}
      value={value}
      placeholder={placeholder || initialValue}
      onChange={unlocked && ((e) => setValue(e.target.value))}
      style={{
        resize: 'none',
        cursor: unlocked ? 'text' : 'default',
        caretColor: unlocked ? 'initial' : 'transparent'
      }}
      className='textarea inherit'
    ></textarea>
  )
}
const Heading = ({id, value}) => {
  return (
    <div id={id} className='flex-row gap05'>
      <h2 className='bold large uppercase'>{value}</h2>
      <div className='line inherit'></div>
    </div>
  )
}
const DelButton = ({id, unlocked, handleClick}) =>{
  return (
    <button
      id={id}
      type='button'
      className={`${unlocked ? 'reveal-btn' : '' } inherit del-btn`}
      onClick={unlocked && handleClick}
      style={{display: unlocked ? 'block' : 'none'}}
    >
      <i className='fa-solid fa-trash'/>
    </button>
  )
}
const Slider = ({id, label, unlocked, initialValue, handleDel }) => {
  const [value, setValue] = useState(initialValue);
  const [progress, setProgress] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    setProgress(e.target.value);
  }
  return (
    <div id={id} className='slider-div flex-column gap05'>
      <TextInput id={`${id}-input`} className='block inherit uppercase' unlocked={unlocked} initialValue={label} placeholder={'JS'}>
      </TextInput>
      <input
        type='range'
        name={`${id}-input`}
        id={id}
        className={`${!unlocked && 'locked-slider'} slider-input block`}
        max={100}
        min={10}
        value={value}
        onChange={unlocked && ((e) => handleChange(e))}
        style={{backgroundSize: `${progress -5}% 100%`}}
      ></input>
      <DelButton id={`${id}-del`} unlocked={unlocked} handleClick={handleDel}></DelButton> 
    </div>
  )
}

const AddButton = ({id, unlocked, handleClick, expandable, style}) => {
  return (
    <button
      id={id}
      type='button'
      className={`${unlocked ? 'reveal-btn' : '' } inherit del-btn`}
      onClick={unlocked && expandable && handleClick}
      style={style}
    >
      <i className='fa-regular fa-plus'/>
    </button>
  )
}

const ProfilePic = ({unlocked}) => {
  const [image, setImage] = useState(null);
  const imgInputRef = useRef(null);
  const handleImageChange = (e) => {
    if (unlocked) {
      const file = e.target.files?.[0] || null;
      if (file && file.type.startsWith('image/')) {
        setImage(URL.createObjectURL(e.target.files[0]));
        console.log ("Selected file: ", file)
      } else {
        setImage(null)
      }
    }
  };

  const triggerImgInput = () => {
    imgInputRef.current?.click();
  }
  return (
    <div id='profile-pic-div'>
      <img
        src={image || '/src/assets/default.png'}
        alt='Profile Picture'
        className='profile-pic'
        onClick={triggerImgInput}
      />
      <input
        ref={imgInputRef}
        type='file'
        id='profile-pic-input'
        accept='image/*'
        style={{display: 'none'}}
        onChange={handleImageChange}
      ></input>
    </div>
  )
}

const DateInput = ({id, unlocked, initialValue}) =>{
  const [year, setYear] = useState(initialValue.year)

  return (
    <div id={id} className='flex-row'>
      <TextInput 
        id={`${id}-month`} 
        unlocked={unlocked} 
        initialValue={initialValue.month} 
        className={'uppercase bold fit-content'}
        placeholder={'Month'}
      ></TextInput>
      <input
        type='number'
        min='1950'
        max='2050'
        value={year}
        onChange={unlocked && ((e) => setYear(e.target.value))}
        className='inherit'
      ></input>
    </div>
  )

}
const EduExp = ({id, value, unlocked, handleDel, title, date}) => {
  return (
    <section id={id}>
      <div className='flex-row'>
        <DateInput id={`${id}-start-date`} unlocked={unlocked} initialValue={date.start}></DateInput>
        <DateInput id={`${id}-end-date`} unlocked={unlocked} initialValue={date.end}></DateInput>
        <TextInput id={`${id}-title`} unlocked={unlocked} initialValue={title} className='uppercase' placeholder='Institute Name'></TextInput>
      </div>
      <Textarea id={`${id}-text`} unlocked={unlocked} initialValue={value} placeholder='Description'></Textarea>
      <DelButton id={`${id}-del`} unlocked={unlocked} handleClick={handleDel}></DelButton>
    </section>
  )
}
const ExpandableSection = ({ tabIndex, id, unlocked, className, newValue, initialValue, expandable, type}) => {
const [values, setValues] = useState(initialValue);
  const handleAdd = () => {
    if(unlocked && expandable) {
      setValues([...values, newValue])
    }
  }
  const handleDel = (e) => {
    const newValues = values.filter(val => `${val.id}-del` !== e.target.id);
    setValues([...newValues])
  }
  return (
    <section 
      tabIndex={tabIndex}
      id={id}
      className={className}
    >      
      {type === 'skills' 
        && <Heading id='skill-heading' value='SKILLS'></Heading>}
      {type === 'skills' 
        && <div className="flex-column all-sliders">
        {values.map(val => (
          <Slider id={val.id} key={val.id} label={val.label} unlocked={unlocked} initialValue={val.initialValue} handleDel={handleDel}></Slider>
        ))}
        </div>
      }
      {type === 'edu-exp' &&
        <div className='flex-column all-edu-exp'>
          {values.map(val => (
            <EduExp id={val.id} key={val.id} value={val.value} unlocked={unlocked} handleDel={handleDel} date={val.date} title={val.title}></EduExp>
          ))}
        </div>
      }
      <AddButton id={`${id}-add-btn`} unlocked={unlocked} expandable={expandable} handleClick={handleAdd} style={{display: unlocked && expandable ? 'block' : 'none'}}></AddButton>
    </section>
  )
}

export {TextInput, Textarea, Slider, ProfilePic, Heading, AddButton, ExpandableSection}