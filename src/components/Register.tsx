/* eslint-disable react-hooks/static-components */
import { ButtonComp } from './UI/ButtonComp'
import { TextComp } from './UI/TextComp'
import { Controller } from 'react-hook-form'
import { Markunread } from '@mui/icons-material'
// import { useTheme } from '@mui/material/styles';
import { useForm, FormProvider, } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import HttpsIcon from '@mui/icons-material/Https';
import useUserStore from '../Store/AuthStore';
import PersonIcon from '@mui/icons-material/Person';

interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
interface ErrorResponse {
  success: boolean;
  message: string;
}

interface RegisterProps {
  setFormType: (value: number) => void;
}

function Register({ setFormType }: RegisterProps) {
  // const theme = useTheme();
  const methods = useForm({
        mode: "onTouched"
      })
  const {control, getValues, setError, trigger, formState: { errors, }} = methods
  const {  register } = useUserStore();
  const navigate = useNavigate(); 
const handleZuRegister = async () => {
  const isFormValid = await trigger();
  if (!isFormValid) {
    console.log("Form validation failed. Missing fields.");
    return; 
  }
  try {
    const values = getValues();
    const body: RegisterParams = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName
    }
   const response =  await register(body);
   console.log('resReg', response)
   if(response.success === true){
    navigate('/login')
   }
  } catch (error: unknown) {
    console.error("Registration failed:", error);
    const err = error as ErrorResponse;
    const errorMsg = err?.message || "";
    if (errorMsg.toLowerCase().includes('email')) {
      setError("email", { type: "server", message: errorMsg });
    } else if (errorMsg.toLowerCase().includes('first name')) {
      setError("firstName", { type: "server", message: errorMsg });
    } else if (errorMsg.toLowerCase().includes('last name')) {
      setError("lastName", { type: "server", message: errorMsg });
    } else if (errorMsg.toLowerCase().includes('password')) {
      setError("password", { type: "server", message: errorMsg });
    }
  }
}
  return (
      
            <div className="w-full h-full max-h-[70%] overflow-auto flex flex-col items-center">
                 <FormProvider {...methods}> 
                    <div className="w-full flex flex-col justify-center items-center gap-2 ">
                 
                        <div className="w-full max-w-[450px]">
                        <label className="text-xs font-semibold text-gray-600 m-3">First Name</label>
       <Controller
       control={control}
      name="firstName"
      rules={{ required: "This field is required" }} 
        render={({ field: { onChange, onBlur, value } }) => (
      
             <TextComp   
                         sx={{
               width: '100%',
                '& .MuiOutlinedInput-root': {
                    width: '100%',
                  height: '55px',
                  borderRadius: '55px',
                  paddingLeft: '0.4rem',
                },
              }}
                       icon={<PersonIcon />} placeholderText='Enter first name'  onChangefunc={onChange} onBlurfunc={onBlur} value={value} errorsName={errors.firstName} />
       )} 
       />
       </div>
       <div className="w-full max-w-[450px]">
           <label className="text-xs font-semibold text-gray-600 m-3">Last Name</label>
      <Controller
       control={control}
      name="lastName"
         rules={{ required: "This field is required" }} 
        render={({ field: { onChange, onBlur, value } }) => (
         
                <TextComp   
                         sx={{
               width: '100%',
                '& .MuiOutlinedInput-root': {
                    width: '100%',
                  height: '55px',
                  borderRadius: '55px',
                  paddingLeft: '0.4rem',
                },
              }}
                       icon={<PersonIcon />} placeholderText='Enter last name'  onChangefunc={onChange} onBlurfunc={onBlur} value={value} errorsName={errors.lastName} />
  
  
       )} 
       />
       </div>
      
    
       <div className="w-full max-w-[450px]">
           <label className="text-xs font-semibold text-gray-600 m-3">Email</label>
      <Controller
       control={control}
      name="email"
        rules={{ required: "This field is required" }} 
        render={({ field: { onChange, onBlur, value } }) => (
      
                <TextComp   
                         sx={{
               width: '100%',
                '& .MuiOutlinedInput-root': {
                    width: '100%',
                  height: '55px',
                  borderRadius: '55px',
                  paddingLeft: '0.4rem',
                },
              }}
                       icon={ <Markunread  />} placeholderText='Enter email'  onChangefunc={onChange} onBlurfunc={onBlur} value={value} errorsName={errors.email} />
  

       )} 
       />
       </div>
       <div className="w-full max-w-[450px]">
           <label className="text-xs font-semibold text-gray-600 m-3">Password</label>
   <Controller
        control={control}
        name="password"
        // إضافة شرط أن الحقل إلزامي
        rules={{ required: "This field is required" }} 
        render={({ field: { onChange, onBlur, value } }) => (

                      <TextComp   
                      type="password"
                         sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '55px',
                  borderRadius: '55px',
                  paddingLeft: '0.4rem',
                },
              }}
                       icon={  <HttpsIcon  />} placeholderText='Enter password'  onChangefunc={onChange} onBlurfunc={onBlur} value={value} errorsName={errors.password} />
        )} 
      />
      </div>

<div className="w-full flex justify-center mt-5 md:mt-[30px]">
         <ButtonComp name="Sign up"
  icon=""
  fnc={handleZuRegister}
  sx={{
 maxWidth: '450px',
  width: '100%',
  backgroundColor: '#3F33D1',
  border: 'none',
  height: '49px', 
  borderRadius: '10px',
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 600,
  cursor: 'pointer',
  transition: '0.5s',
     }}
  />
  </div>

                   <div className="mt-1 flex gap-1 text-center text-xs text-gray-500">
             <p> Do you have an account?</p>
              <p onClick={()=> {
                setFormType(0)
              navigate('/login')

              }} className="text-[#5146E5] font-semibold hover:underline cursor-pointer">
                Sign In
              </p>
            </div>
      </div>
  
                      
  </FormProvider>
  </div>
  )
}
export default Register