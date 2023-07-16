import React, { useState } from 'react';
import './Todo.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
export default function Todo(){
    const [text,setText]=useState('');
    const [tableData, setTableData] = useState([]);

    const handleChange = (e) => {
        setText(e.target.value);
        console.log(e.target.value);
      };
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log('Now text is '+text);
        const formData = {
            id: Date.now(),
            text: text
          };
        setTableData([...tableData,formData ]);
        setText('');
    };
    const handleDelete = (id) => {
        console.log(id);
        const updatedData = tableData.filter((data) => data.id !== id);
        setTableData(updatedData);
      };
      const handleCheckboxChange = (id) => {
        const updatedData = tableData.map((data) => {
          if (data.id === id) {
            return ( 
                {
                    ...data,
                    checked: !data.checked
                    
                  }
            );
          }
          return data;
        });
        setTableData(updatedData);
      };
    

    return(
        <div >
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="#home">Todo List  </Navbar.Brand>
              </Container>
            </Navbar>
            <div>
                <form  onSubmit={handleSubmit}>
                    <MDBInput type="text" value={text} onChange={handleChange}  placeholder='enter the Task'size='sm'
                    style={{}}/>
                    <MDBBtn className='me-1' color='success'type='submit'>submit</MDBBtn>
                </form>
            </div>
        
        <div>
        {tableData.length > 0 && (
            <MDBTable responsive striped bordered>
              <MDBTableHead>
                <tr>
                  <th>Tasks</th>
                </tr>
                </MDBTableHead>
              <MDBTableBody>
                {tableData.map((data, index) => (
                  <tr
                  key={data.id}
                  className={data.checked ? 'table-success' : ''}
                  >
                     <td>
                        <label>complete</label>
                        <input
                        type="checkbox"
                        checked={data.checked || false}
                        onChange={() => handleCheckboxChange(data.id)}
                        />
                     </td>

                     <td><b>{data.text}</b></td>

                     <td>
                        <Button variant="outline-danger" onClick={() => handleDelete(data.id)}>Delete</Button>
                     </td>
                  </tr>
                ))}
               </MDBTableBody>
              </MDBTable>

          )}
          </div>
        </div>


    );
    
}