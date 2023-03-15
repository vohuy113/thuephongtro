import React, {memo}  from "react";  

const inputForm = ({label}) =>{
    return (
        <div>
            <label htmlFor="phone" className="text-xs">{label}</label>
            <input 
                type="text"
                id="phone"
                className="outline-none bg-[#e8f0fe] p-2 rounded-md"
                style={{width:"100%"}}
            />
        </div>
    )
}
export default memo(inputForm)