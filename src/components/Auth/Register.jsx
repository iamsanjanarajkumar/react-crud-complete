import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { registerUser } from '../../data/user'; 


function Register(props) {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        pass: ""
    })
    const [err,setError] = useState(false)
    const [errMsg ,setErrMsg] = useState({
        name: "",
        email: "",
        mobile: "",
        pass: ""

    })

    const readValue = (event) =>{
        //console.log('data =',event.target)
        const {name , value} = event.target
        //console.log('name = ',name ,'value = ',value)
        if(name === "name"){
            validateName(value)
        } else if(name === "email") {
               validateEmail(value)
        } else if(name === "mobile"){
            validateMobile(value)
        } else if( name === "pass"){
            validatePassword(value)
        } else {
            setError(false
                )
        }

        setUser({...user,[name]:value})

    }
    /* Validation for Name */
     const validateName = (name ) =>{
         if(name === ""){
            setError(true)
            setErrMsg({...errMsg ,['name']: "Name field should not be empty"})
         } else if(name.length <= 2){
           setError(true)
           setErrMsg({...errMsg ,['name']: "Name length can't be less than 2 character "})
        } else{
            let regex = /^[a-zA-Z\s]+$/;
            if(regex.test(name) === false){
                setError(true)
                setErrMsg({...errMsg ,['name']: "Invalid Name Format"})
            } else{
                setError(true)
                setErrMsg({...errMsg ,['name']: " "})
            }

        }
     }

     /*Validation for Email */
     const validateEmail =(email) =>{
        if(email === ""){
            setError(true)
            setErrMsg({...errMsg ,['email']: "Email should not be Empty"})
        } else {
            let regex = /^\S+@\S+\.\S+$/;
            if(regex.test(email) ===  false){
                setError(true)
                setErrMsg({...errMsg , ['email'] : "Invalid Email Format"})
            } else{
                setError(true)
                setErrMsg({...errMsg ,['email'] : " "})
            }
        }
     }

     //validation for mobile
     const validateMobile  =(mobile) =>{
        if(mobile === ""){
            setError(true)
            setErrMsg({...errMsg ,['mobile'] : "Mobile field cannot be empty"})
        } else {
            let regex = /^[6-9]\d{9}$/;
            if(regex.test(mobile) === false){
                setError(true)
                setErrMsg({...errMsg ,['mobile'] :"Invalid  Mobile Number (starts only from 6,7,8,9) (10 digits)"})
            } else {
                setError(false)
                 setErrMsg({...errMsg, ['mobile'] :""})
            }
        }
     }
     //validation for password
     const validatePassword =(pass) =>{
        if(pass === ""){
            setError(true)
            setErrMsg({...errMsg ,['pass']: "Password field should not be empty"})
         } else{
            let regex = /^[a-zA-Z0-9\s]+$/;
            if(regex.test(pass) === false){
              setError(true)
              setErrMsg({...errMsg ,['pass']: "Invalid password Format(a-z A-Z 0-9)"}) 
         } else{
            setError(false)
            setErrMsg({...errMsg ,['pass']: " "})
         }
        }
     }


    const submitHandler = async (e) => {
        e.preventDefault();
        if(err){
            toast.error("Check the errors..")
        } else{
            console.log('data =',user)
            registerUser(user)
        }
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-secondary">Register</h3>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                        <form autoComplete='off' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor='name'>Name</label>
                                <input type="text" name="name" id="name" value={user.name} onChange={readValue} className="form-control" required/>
                                <div>
                                    {
                                        err && errMsg.name ? <strong className='text-danger'>{errMsg.name} </strong> : null 
                                    }
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor='email'>Email</label>
                                <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required/>
                                <div>
                                    {
                                        err && errMsg.email ? <strong className='text-danger'>{errMsg.email} </strong> : null 
                                    }
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor='mobile'>Mobile</label>
                                <input type="number" name="mobile" id="mobile" value= {user.mobile} onChange={readValue} className="form-control" required/>
                                <div>
                                    {
                                        err && errMsg.mobile ? <strong className='text-danger'>{errMsg.mobile} </strong> : null 
                                    }
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor='pass'>Password</label>
                                <input type="password" name="pass" id="pass" value={user.pass} onChange={readValue}
                                    className="form-control" required/>
                                     <div>
                                    {
                                        err && errMsg.pass ? <strong className='text-danger'>{errMsg.pass} </strong> : null 
                                    }
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Register" className='btn btn-outline-success'/>
                                <div className="float-end d-flex align-items-center">
                                    <strong className="text-success">Already registered?</strong>
                                    <Link to ={`/login`} className="btn btn-link">Login</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                 </div>
                </div>
            </div>
        </div>
    )
}

export default Register