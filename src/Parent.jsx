import React,{useState} from 'react'

const Parent = () => {
    const [name,setName]=useState('doberiner')
  return (
    <div>Parent: {name}</div>
  )
}

export default Parent