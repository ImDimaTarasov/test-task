import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

const EditIntern = () => {
    const { id } = useParams();

    const [intern, setIntern] = useState({
        name: '',
        email: '',
        dateStart: '',
        dateEnd: '',
    });
    
    useEffect(() => {
        //TODO: get intern from REST api http://localhost:3001/interns/:id
        const fetchIntern = async () => {
            const response = await fetch(`http://localhost:3001/interns/${id}`);
            const intern = await response.json();
            setIntern(changeInternDates(intern));
        }
        fetchIntern()
        // console.log(`I want to get intern with id: ${id}!`)
    }, [id]);
    const changeInternDates = (intern) => {
        return {
            id: intern.id,
            name: intern.name,
            email: intern.email,
            dateStart: intern.internshipStart.substr(0, 10),
            dateEnd: intern.internshipEnd.substr(0, 10),
        };
    };
    const handleChange = (event) => {
        setIntern({...intern, [event.target.name]: event.target.value});
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(emailValidator()){
            console.log(intern)
        }
        return
    };

    const emailValidator = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!intern.email || regex.test(intern.email) === false){
            console.log("not valid")
            return false;
        }
        return true;
    }
    

    return (
        <div>
        <NavLink to="/">Back to list </NavLink>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input 
                type="text" 
                name="name" 
                value={intern.name}
                onChange={(e) => handleChange(e)}
                required
            />              
            <label>Email</label>
            <input 
                type="text" 
                name="email" 
                value={intern.email}
                onChange={(e) => handleChange(e)}
                required
            />
            <div 
                className='errorMessage' 
                style={{display: emailValidator()? 'none' :'blockd'}}
            >
                required
            </div>
            <label>Start</label>
            <input 
                type="date" 
                name="dateStart" 
                value={intern.dateStart}
                onChange={(e) => handleChange(e)}
                required
            />
            <label>End</label>
            <input  
                type="date" 
                name="dateEnd" 
                value={intern.dateEnd}
                onChange={(e) => handleChange(e)}
                required
            />
                
            <input type="submit" value="Submit" />
        </form >
    </div>
    );
};

export default EditIntern;