import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from './Button';

const BasicTextFields = ({title,setPassword,setEmail,handleAction}) => {
    return(
       <div>
           <div className='heading-container'>
            <h3>
                {title} Form
            </h3>
           </div>

            <Box component="form"
            sx={{
                '&> :not(style)': {m:1,width:'25ch'},
            }}
            noValidateautoComplete="off">
                <TextField id="email"
                type="email"
                 label="Enter the Email"
                 variant="outlined"
                 onChange={e => setEmail(e.target.value)}/>
                <TextField id="password"
                type="password"
                label="Enter the password"
                variant="outlined"
                onChange={e=>setPassword(e.target.value)}/>
            </Box>

            <Button title={title} handleAction={handleAction}/>
        </div>
    )
}

export default BasicTextFields;