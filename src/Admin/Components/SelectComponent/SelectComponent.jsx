import React from 'react'
import "./SelectComponent.css"

//SELECT TAG COMPONENT <select></select>
export default function SelectComponent({selectFunction,options,heading,selectedOption}) {
  return (
        <>
            <div className='select-tag-class-main'>
                <b style={{color:"whitesmoke"}}>{heading}</b>
                <select className='select-tag-class' onChange={selectFunction}>
                    {options.map((a,index)=>(
                        <>
                            {selectedOption==a?
                                <option key={index} value={a} selected>{a}</option>
                                :
                                <option key={index} value={a} >{a}</option>
                            }
                        </>
                    ))}
                </select>
            </div>
        </>
  )
}
