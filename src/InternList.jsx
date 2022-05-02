import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const InternList = () => {

    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch('http://localhost:3001/interns');
            const interns = await response.json();
            setInterns(interns);
        }
        fetchInterns();
    }, []);

    return (
        <ul>
            {interns.map(u => (<li key={u.id}>{u.name} <NavLink to={`/interns/${u.id}`}>Edit</NavLink></li>))}
        </ul>
    );
};

export default InternList;