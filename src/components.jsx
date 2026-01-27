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
const Dropdown = ({id, unlocked, options}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])

  const handleChange = (opt) => {
    unlocked && setSelected(opt);
    setIsOpen(false);
  }
  const handleToggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div
      id={id}
      className={`${unlocked && isOpen && 'isOpen'} drop-down` }
    >
      <button
        id={`${id}-btn`}
        className='drop-down-btn'
        type='button'
        value={selected}
        onClick={handleToggle}
      ></button>
      <div className='drop-down-menu'>
      {options.map(opt => (
        <button
        id={opt}
        key={opt}
        type='button'
        value={opt}
        onClick={unlocked && (() => handleChange(opt))}
        ></button>
      ))}
      </div>
    </div>
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
    <div id={id} className='slider-div flex-column'>
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

export {TextInput, Textarea, Slider, ProfilePic, Heading, AddButton}