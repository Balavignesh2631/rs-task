import React,{ useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Studentpage.css'
import Button from 'react-bootstrap/Button';


function Studentpage() {
  const [stud, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

   // Handle delete function
   const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/studentDelete/${id}`, {
          method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
          // Remove the deleted student from state
          setStudents(stud.filter(student => student.id !== id));
        } else {
          const errorData = await response.json();
          alert(errorData.message); // Show error message if deletion fails
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('An error occurred while deleting the student.');
      }
    }
  };


  return (
    <>
      <div >
        <header>
          <nav id="student" className="fixed-top header-scrolled">
            <div id="stud1">
              <p id="stud2">SSBK Training</p>
              <div >
                <ul id="stud3">
                  <li><NavLink to='/' id='studli1'>Home</NavLink></li>
                  {/* */}
                </ul>
              </div>
            </div>
          </nav>
        </header>

      </div>

    {/* =========================================================================== */}
    {/* main section */}
    <main className='stud-title'>
      <section >
        <div className='stud-item'>
          <h3 id='stud-item1'>Student Data Table</h3>
          <hr id='stud-item3'></hr>
          <hr id='stud-item4'></hr>
          <h4 id='stud-item2'>Add student data.Click Add Button</h4>
          <Button   id='stud-btn'><NavLink to="/add" id='add' >ADD</NavLink></Button>
        </div>
      </section>

      <section>
        <div class="container">
        
          <table>
              <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email ID</th>
                    <th colSpan={2} >Action</th>
                    
                  </tr>
              </thead>
              <tbody>
                {stud.map(student => (
                  <tr key={student.id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td><NavLink to={`/edit/${student.id}`}><Button>Edit</Button></NavLink></td>
                    <td><Button onClick={()=>handleDelete(student.id)}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </section>
    </main>
    </>
    
  )
}

export default Studentpage