import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitLoginForm = (event) => {
        event.preventDefault();
        if(email==="" && password==="") {
            setIsEmailEmpty(true);
            setIsPasswordEmpty(true);
        } else if(email==="") {
            setIsEmailEmpty(true)
            setIsPasswordEmpty(false)
            return
        } else if (password === "") {
            setIsPasswordEmpty(true)
            setIsEmailEmpty(false)
            return
        } else {
            setIsEmailEmpty(false)
            setIsPasswordEmpty(false)
            return
        }
    }

    return(
        <form>
            <h1 className="text-[18px] font-[600] mb-[5px]">Login</h1>
            <hr className="border-[2px] border-[orange] w-[60px] mb-[10px]"/>
            <Box
            component="form"
            sx={{
                '& > :not(style)': {marginBottom: '6px', width: '100%' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField id="email/username" label="Email/Username" variant="standard" value={email} onChange={onChangeEmail}/>
            </Box>
            {isEmailEmpty && <p className='text-[red] text-[10px]'>Enter email</p>}
            <Box
            component="form"
            sx={{
                '& > :not(style)': {marginBottom: '25px', width: '100%' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField id="password" label="Password" variant="standard" type='password' value={password} onChange={onChangePassword} className='w-[100vw]'/>
            </Box>
            {isPasswordEmpty && <p className='text-[red] text-[10px]'>Enter password</p>}
            <button onClick={onSubmitLoginForm} className='bg-[orange] px-[15px] w-[100%] py-[7px] rounded-[6px] text-[#ffffff] border-0 outline-none ' type='submit'>Login</button>
        </form>
    )
}

export default LoginPage