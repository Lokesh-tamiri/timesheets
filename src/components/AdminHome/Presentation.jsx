import { Card } from '@mui/material'
import React from 'react'
import { styles } from '../../styles'

const Presentation = (props) => {
  const {
    data, setTab, tab
  } = props
  console.log(data,tab)
  return (
    <div className='mt-12 flex gap-5 flex-col'>
      <div className='flex gap-5'>
        <p className={`${tab=='eatHere'?'bg-green-700 text-white':''} px-5 py-2 rounded-full`} onClick={()=>{
          setTab("eatHere")
        }}>Eat Here</p>
        <p className={`${!tab=='eatHere'?'bg-green-700 text-white':''} px-5 py-2 rounded-full`} onClick={()=>{
          setTab("takeAway")
        }}>Take Away</p>
      </div>
      {
        data?.map(item=>{
          return(
            <Card className='p-5'>
              <img src={item.item.images} alt={item.id} width={"100%"}/>
              <button className={`${styles.primaryBtn}`}>Deliver</button>
              <button>Ready</button>
              <button>Cancel</button>

            </Card>
          )
        })
      }
    </div>
    
  )
}

export default Presentation
