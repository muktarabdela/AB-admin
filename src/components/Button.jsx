import React from 'react'

const Button = ({color,bgColor,text,borderRadius, size}) => {
  return (
    <button style={{color: color,backgroundColor: bgColor,borderRadius: borderRadius}}
     className={`text=${size} p-3 hover:drop-shadow-xl`}>
      {text}
    </button>
  )
}

export default Button