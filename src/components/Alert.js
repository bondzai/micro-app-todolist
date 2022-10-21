import {useEffect} from "react"

const Alert = ({text,type,setAlert,list}) => {
    useEffect(()=>{
        const timeOut = setTimeout(() => {
            setAlert({show : false, text : "", type : ""})
        },1500)
        return () => clearTimeout(timeOut)
        // eslint-disable-next-line
    },[list])

    return (
        <p className = {`alert ${type}`}> {text} </p>
    )
}

export default Alert;