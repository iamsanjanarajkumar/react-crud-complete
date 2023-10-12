import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { loginUser } from '../../data/user'; 

function Login(props) {
    const [user,setUser] = useState({
        email: "",
        pass: ""
    })
    const [err,setError] = useState(false)
    const [errMsg ,setErrMsg] = useState({
        email: "",
        pass: ""

    })

    const readValue = (event) =>{
        //console.log('data =',event.target)
        const {name , value} = event.target
        //console.log('name = ',name ,'value = ',value)
        if(name === "email"){
            validateEmail(value)
        } else if(name === "pass") {
            validatePassword(value)  
        } else {
            setError(false
                )
        }

        setUser({...user,[name]:value})

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
                setError(false)
                setErrMsg({...errMsg ,['email'] : " "})
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
            loginUser(user)
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-secondary">Login</h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                        <form autoComplete='off' onSubmit={submitHandler}>
                           
                            <div className="form-group mt-2">
                                <label htmlFor='email'>Email</label>
                                <input type="email" name="email" id="email" value= {user.email} onChange={readValue} className="form-control" required/><div>
                                    {
                                        err && errMsg.email ? <strong className='text-danger'>{errMsg.email} </strong> : null 
                                    }
                                </div>
                            </div>
                           
                            <div className="form-group mt-2">
                                <label htmlFor='pass'>Password</label>
                                <input type="password" name="pass" id="pass" value={user.pass} onChange={readValue} className="form-control" required/>
                                <div>
                                    {
                                        err && errMsg.pass ? <strong className='text-danger'>{errMsg.pass} </strong> : null 
                                    }
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Login" className='btn btn-outline-success'/>
                                <div className="float-end d-flex align-items-center">
                                    <strong className="text-success">Are You a New User</strong>
                                    <Link to ={`/register`} className="btn btn-link">Register</Link>
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

export default Login