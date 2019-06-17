import React from 'react'
import img from '../../images/loader.gif'


const Loading = (props) => (
    <div className="loading">
        <img src={img} alt="Loading" />
    </div>
);

export default Loading;
