import React from 'react'

export default function InputWidget(props) {
  return (<>
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text" style={{fontSize:"0.6cm",backgroundColor:"yellowgreen",color:"whitesmoke"}} id="basic-addon1">{props.symbol}</span>
        </div>
        <input type="text" value={props.value} className="form-control" onChange={props.onChange} placeholder={props.placeholder} aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
  </>
  )
}
