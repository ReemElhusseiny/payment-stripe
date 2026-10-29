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

interface LoginParams {
  email: string;
  password: string;
}
interface ErrorResponse {
  success: boolean;
  message: string;
}


function NewLogin({ setFormType }: { setFormType: (formType: number) => void }) {
  // const theme = useTheme();
  const methods = useForm({
        mode: "onTouched"
      })
     const {control, getValues, setError, trigger, formState: { errors, }} = methods
  const { login } = useUserStore();
  const navigate = useNavigate(); 
const handleLogin = async () => {
  const isFormValid = await trigger(['email', 'password']);
  if (!isFormValid) {
    return; 
  }
  try {
    const values = getValues();
    const body: LoginParams = {
      email: values.email,
      password: values.password
    }
   const response =  await login(body);
   if(response?.user?.is_active === true ){
        navigate("/dashboard")
    }
    else if(response?.user?.is_active === false){
      navigate("/payments")
    }
  } catch (error: unknown) {
    const err = error as ErrorResponse;
    const errorMsg = err?.message || "Invalid login credentials";
      setError("password", { type: "server", message: errorMsg });
  }
}
  return (
      
            <div className="mt-[70px] w-full h-full flex flex-col items-center">
                 <FormProvider {...methods}>
                    <div className="w-full flex flex-col items-center gap-[10px]">
                        <div className="w-full max-w-[450px]">
                        <label className="text-xs font-semibold text-gray-600">Email Address</label>
                   <Controller
      control={control}
      name="email"
      rules={{
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    message: "Please enter a valid Gmail address",
  },
}}
        render={({ field: { onChange, onBlur, value } }) => (
       
               <TextComp   
             sx={{
    // maxWidth: '400px',
    width: '100%',
    // width: '380px',
    margin: '10px 0',
    '& .MuiOutlinedInput-root': {
       width: '100%',
      height: '55px',
      borderRadius: '55px',
    //   backgroundColor: '#f0f0f0',
      paddingLeft: '0.4rem',
    },
  }}
           icon={<Markunread  />} placeholderText='Enter Email'  onChangefunc={onChange} onBlurfunc={onBlur} value={value} errorsName={errors.email} />

       )} 
       /> 
       </div>
       <div className="w-full max-w-[450px]">
       <label className="text-xs font-semibold text-gray-600">Password</label>
   <Controller
        control={control}
        name="password"
        // إضافة شرط أن الحقل إلزامي
        rules={{ required: "This field is required" }} 
        render={({ field: { onChange, onBlur, value } }) => (
              <TextComp 
              type='password'  
           sx={{
            width: '100%',
    // maxWidth: '700px',
          margin: '10px 0',
          '& .MuiOutlinedInput-root': {
             width: '100%',
            height: '55px',        // التعديل الخارجي الخاص بكِ
            borderRadius: '55px',   // التعديل الخارجي الخاص بكِ
            paddingLeft: '0.4rem',
          },
        }}
  icon={ <HttpsIcon />}
  placeholderText='Enter Password' 
  onChangefunc={onChange}
  onBlurfunc={onBlur} 
  value={value}
  errorsName={errors.password}
   />

          // </div>
        )} 
      />
       <div className="w-full h-full flex justify-end">
                  <p className="text-xs font-medium text-[#5A5BF3] hover:underline cursor-pointer">
                    Forgot Password?
                  </p>
                </div>
      </div>
              
                <div className="w-full flex justify-center mt-5 md:mt-[20px]">
    <ButtonComp name="Sign in"
  icon=""
  fnc={handleLogin}
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
  margin: '10px 0',
  cursor: 'pointer',
  transition: '0.5s',
     }}
  />
  </div>

                   <div className="mt-1 gap-1 flex gap-1 text-center text-xs text-gray-500">
              <p>Don't have an account?</p>
              <p onClick={()=> {setFormType(1)
              navigate('/register')

              }} className="text-[#5146E5] font-semibold hover:underline cursor-pointer">
                Sign Up
              </p>
            </div>
                      </div>
                      
  </FormProvider>
  </div>
  )
}
export default NewLogin