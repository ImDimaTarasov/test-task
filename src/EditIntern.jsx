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
        fetchIntern();
        // console.log(`I want to get intern with id: ${id}!`)
    }, [id]);

    const changeInternDates = (intern) => {
        return {
            name: intern.name,
            email: intern.email,
            dateStart: intern.internshipStart.slice(0, 10) ,
            dateEnd: intern.internshipEnd.slice(0, 10),
        };
    };
    const handleChange = (event) => {
        setIntern({...intern, [event.target.name]: event.target.value});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if(!emailValidator() || !dateValidator()){
            console.log('required')
            return
        }
        addInternToList();
    };

    const addInternToList = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                name: intern.name,
                email: intern.email,
                internshipStart: intern.dateStart + "T00:00+00Z",
                internshipEnd: intern.dateEnd + "T00:00+00Z"
            })
        };
        fetch( `http://localhost:3001/interns/${id}`, requestOptions);
    };

    const emailValidator = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!intern.email || regex.test(intern.email) === false){
            return false;
        };
        return true;
    };

    const dateValidator = () => {
        const startDate = new Date(intern.dateStart);
        const endDate = new Date(intern.dateEnd);
        return endDate.getTime() >= startDate.getTime();
    };
    

    return (
        <div>
        <NavLink to="/">Back to list </NavLink>
        <form onSubmit={onSubmit}>
            <label>Full name *</label>
            <input 
                type="text" 
                name="name" 
                value={intern.name}
                onChange={(e) => handleChange(e)}
                required
            />              
            <label>Email address*</label>
            <input 
                type="text" 
                name="email" 
                value={intern.email}
                onChange={(e) => handleChange(e)}
                required
            />
            <div 
                className='errorMessage' 
                style={{display: emailValidator()? 'none' :'block'}}
            >
                This field is required
            </div>
            <label>Internship start *</label>
            <input 
                type="date" 
                name="dateStart" 
                value={intern.dateStart}
                onChange={(e) => handleChange(e)}
            />
            <label>Internship end *</label>
            <input  
                type="date" 
                name="dateEnd" 
                value={intern.dateEnd}
                onChange={(e) => handleChange(e)}
            />
            <div 
                className='errorMessage' 
                style={{display: dateValidator()? 'none' :'block'}}
            >
                This date is not correct
            </div>
                
            <input type="submit" value="Submit" />
        </form >
    </div>
    );
};

export default EditIntern;