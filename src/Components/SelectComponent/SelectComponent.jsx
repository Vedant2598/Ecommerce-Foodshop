import React from 'react'
import "./SelectComponent.css"

//SELECT TAG COMPONENT <select></select>
export default function SelectComponent({selectFunction,options,heading,selectedOption,disabled}) {
  return (
        <>
            <div className='select-tag-class-client-main'>
                <b style={{color:"black"}}>{heading}</b>
                <select className='select-tag-class-client' name={heading.toLowerCase()} onChange={selectFunction} disabled={disabled || false}>
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
