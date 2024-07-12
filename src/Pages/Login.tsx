import { Link, useNavigate } from 'react-router-dom';
import SocialMedias from '../Components/SocialMedias'
import React, { useState } from 'react'

export default function Login() {
  const [info, setInfo] = useState({
    email:'',
    password:'',
  })
  const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate()

   const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (info.email.length < 7) {
      setEmailError('email incorreto')
      console.log(emailError);
      
      
    } 
    navigate('/home');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) { // Tipagem necessária
    e.preventDefault(); // Impede comportamento padrão
    const { name, value } = e.target; //Desestrutura nome do input e o valor digitado a partir do target
    setInfo((prevData) => ({  //prevData = dados atuais
      ...prevData,            // Mantem os dados atuais
      [name]: value,          // Nome e valor do input vão vir no e.target
      }));
  } 

  const add = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const firstParent = target.parentElement;
    if (firstParent) {
      const secondParent = firstParent.parentElement?.parentElement;
      secondParent?.classList.add("active")      
    }
  }
  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const firstParent = target.parentElement;
    if (firstParent) {
      const secondParent = firstParent.parentElement?.parentElement;
      secondParent?.classList.remove("active")      
    }
  }

  return (
    <>
      <div className="container" id='container'>
        <div className="form-container sign-up">
          <form className='singUpForm'>
            <h1>Create Account</h1>
              <SocialMedias />
              <span>or use your email for registration</span>
              <input
               type="text"
               placeholder='Name'
              />
              <input
               type="email"
               placeholder='Email'
               name='email'
               onChange={handleChange}
              />
              <input
               type="password"
               placeholder='Password'
               name='password'
               onChange={handleChange}
              />
              <button className='login' onClick={remove}>Sing In</button>
              <button className='login' onClick={handleNavigate}>Sing Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form className='singInForm'>
            <h1>Sing In</h1>
            <SocialMedias />
            <span>or use your email and password</span>
            <input
               type="email"
               placeholder='Email'
               name='email'
               onChange={handleChange}
              />
              <input
               type="password"
               placeholder='Password'
               name='password'
               onChange={handleChange}
              />
            <Link className='frgt-passw' to="#">Forget Your Passord?</Link>
            <button className='register' onClick={handleNavigate}>Sing In</button>
            <button className='register' onClick={add}>Sing Up</button>
          </form>
        </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toogle-panel toggle-left">
                <h1>Hello, Friend!</h1>
                <p> Enter your personal details to use all of site features</p>
                
              </div>
              <div className="toogle-panel toggle-right">
                <h1>Welcome Back!</h1>
                <p>Login whit your email and password</p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
