import { useEffect, useState } from 'react';
import './News.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const News = ( ) => {
    const { loc } = useParams();
    const [data, setData]  = useState([])
    useEffect( () => {
        async function fetchData (){

            const val = `https://newsdata.io/api/1/latest?apikey=pub_64479109ea6b5b9cbdd1db384d1b4f6873663&q=${loc}&language=en`
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