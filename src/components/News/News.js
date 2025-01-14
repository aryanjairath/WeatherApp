import { useEffect, useState } from 'react';
import './News.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const News = ( ) => {
    const { loc } = useParams();
    const [data, setData]  = useState([])
    useEffect( () => {
        async function fetchData (){

            const val = `http://localhost:5000/api/news/${loc}`
            try {
                const response = await axios.get(val);
                setData(response.data.results || []);
              } catch (error) {
                if (error.response && error.response.status === 429) {
                  console.error('Rate limit exceeded. Please try again later.');
                } else {
                  console.error(error);
                }
              }
              

            }
        fetchData();
    }, [loc]);
    return (
        <div className='news-container'>
                    <h1 style ={{textAlign:'center', justifyContent:'center',alignItems:'center', display:'flex'}}>{loc} News</h1>
            {data.map((item) => (
                <div className = "news-item" key = {item.article_id} >
                    <h4>{item.title}</h4>
                    <img src = {item.image_url}   style={{ transform: "scale(0.4)" }}/>
                    <h3>Interested? Read More: </h3>
                    <a href = {item.link}>{item.link} </a>
                </div>
            )) 
        }
        </div>
    );
}
export default News