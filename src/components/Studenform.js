import React,{ useState } from 'react'
// import Button from 'react-bootstrap/Button';
import { NavLink,useNavigate } from 'react-router-dom';
import './Studentform.css'

function Studenform() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try {
          const response = await fetch('http://localhost:5000/api/studentsdata', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
          alert(result.message);
          
          // Clear the form after submission
          setFormData({
              firstName: '',
              lastName: '',
              email: '',
              password: ''
          });
          
      } catch (error) {
          alert('Error submitting data: ' + error.message);
      }
      navigate('/student')
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
                  <li><NavLink to='/' id='form-link'>Home</NavLink></li>
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
            <legend>Student Registration Form</legend>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    <span style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', 
                    cursor: 'pointer' }} 
                    onClick={toggleShowPassword}  >
                    {showPassword ? '🙈' : '👁️'} 
                    </span>
                   
                </div>
                </fieldset>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            
        </div>
        </section>

    </main>
    </>
    
  )
}

export default Studenform