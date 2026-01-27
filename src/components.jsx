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
        fieldSizing: 'content',
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

const Slider = ({id, label, unlocked, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div id={id} className='slider-div flex-column'>
      <label htmlFor={`${id}-input`} className='block inherit'>
        {label}
      </label>
      <input
        type='range'
        name={`${id}-input`}
        id={id}
        className='slider-input block'
        max={100}
        min={10}
        value={value}
        onChange={unlocked && ((e) => setValue(e.target.value))}
      ></input>
    </div>
  )
}

const Heading = ({id, value}) => {
  return (
    <div id={id} className='flex-row gap02'>
      <h2 className='bold large'>{value}</h2>
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
    >
      <i className='fa-regular fa-trash'/>
    </button>
  )
}

const AddButton = ({id, unlocked, handleClick, expandable}) => {
  return (
    <button
      id={id}
      type='button'
      className={`${unlocked ? 'reveal-btn' : '' } inherit del-btn`}
      onClick={unlocked && expandable && handleClick}
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
        style={{opacity: 0}}
        onChange={handleImageChange}
      ></input>
    </div>
  )
}