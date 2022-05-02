import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './internList.scss';

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
       <article className='interns'>
            <h3>Participants</h3>
            <ul className='interns__list'>
                {interns.map(u => (
                    <li  
                    key={u.id}
                    className='interns__list_item'
                    >
                        {u.name} 
                        <NavLink to={`/interns/${u.id}`}>
                        <div className="icon">Edit</div>
                        </NavLink>
                    </li>
                ))}
            </ul>
       </article>
    );
};

export default InternList;