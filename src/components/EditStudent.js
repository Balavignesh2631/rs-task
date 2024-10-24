import React,{ useEffect, useState }from 'react'
import { useParams, useNavigate,NavLink} from 'react-router-dom';

function EditStudent() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');    

    useEffect(() => {
        const fetchStudent = async () => {
          const response = await fetch(`http://localhost:5000/api/students/${id}`);
          const data = await response.json();
          console.log(data);
          setFirstName(data[0]['firstName']);
          setlastName(data[0]['lastName']);
          setemail(data[0]['email']);
          setpassword(data[0]['password']);
        };
    
        fetchStudent();
      }, [id]);
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/api/studentsEdit/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({'firstName':firstName,'lastName':lastName,'email':email,'password':password}),
        });
        navigate('/student'); // Redirect after saving
      };

      const [showPassword, setShowPassword] = useState(false); 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};
  return (
    <>
    
      <div >
        <header>
          <nav id="formcontainer" className="fixed-top header-scrolled" method='POST'>
            <div id="form-sec">
              <p id="form-item">SSBK Training</p>
              <div id="n3">
                <ul>
                  <li><NavLink to="/student" id='form-link1'>Back</NavLink></li>
                </ul>
              </div>
              
            </div>
          </nav>
        </header>

       </div>

    {/* =========================================================================== */}
    {/* student Register form */}
    <main className='form-title'>
        <section className='form-set'> 
        <div className="form-container">
            
            <form onSubmit={handleSubmit} className="registration-form" >
            <fieldset>
            <legend>Student Update Form</legend>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => {setFirstName(e.target.value)}}
                        placeholder="Enter your first name"
                       
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => {setlastName(e.target.value)}}
                        placeholder="Enter your last name"
                      
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {setemail(e.target.value)}}
                        placeholder="Enter your email"
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                       type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {setpassword(e.target.value)}}
                        placeholder="Enter your password"
                       
                    />
                     <span style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', 
                    cursor: 'pointer' }} 
                    onClick={toggleShowPassword}  >
                    {showPassword ? '🙈' : '👁️'} 
                    </span>
                   
                </div>
                </fieldset>
                <button type="submit" className="submit-button">Update</button>
            </form>
            
        </div>
        </section>

    </main>
    </>
  )
}

export default EditStudent