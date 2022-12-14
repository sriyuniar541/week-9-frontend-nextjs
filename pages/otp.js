import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Import.module.css'
import { useRouter } from 'next/router'





export default function  Otp () {

  const router = useRouter()

  const [inputData, setInputData] = useState({
    
    email: '',
    otp: ''
  })


  const registerHandling = async (e) => {
    e.preventDefault()
    const { email, otp } = inputData
    const data = { email, otp }

    const res = await (await fetch('http://localhost:4001/users/email/verif', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })).json()
    if (res.success) {
      alert(res.message);
      setInputData({
        email: '',
        otp: ''
      })
      router.push('/login')
    }
  }


  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputData({ ...inputData, [name]: value })
  }



  return (
    <div className=''>
      <div className='row'>
        <div className='col-6 text-center'>
          <div className={styles.g}>
              <div className={styles.g1} >
                <Image src='/bg2.png' width={700} height={550} alt='' style={{paddingTop:'50%',paddingBottom:'50%'}}/>
              </div>
          </div>
        </div>
        
        <div className='col-lg-6' style={{paddingTop:'15%',paddingBottom:'15%'}}> 
          <form onSubmit={registerHandling} className='col-lg-6 offset-lg-3'>
              <label className="form-label" style={{ color: '#8692A6' }}>Email</label>
              <input type='text'  name="email" className="form-control" id="FormControl" placeholder='Email address' value={inputData.email} onChange={onChangeHandler}/>

              <label className="form-label" style={{ color: '#8692A6' }}>password</label>
              <input type='text' name="otp" className="form-control" id="FormControl" placeholder='Code 6 digit' value={inputData.otp} onChange={onChangeHandler}/>
              <button className=' text-center btn btn-warning col-lg-6 offset-lg-3 mt-4 text-white'>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
