// API key ---> 67da1ac6c707498ba689920d805138df
import { useEffect, useState } from 'react';
import './App.css';
import News from './News';

function App() {

  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("Health");

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  let currentDate = new Date();
  let from = null;
  let to = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1)}-${currentDate.getDate()}`;
  

  if (currentDate.getDate() < 4)
  {
      let previousMonth = currentDate.getMonth(); // 0-indexed: 0 is January, 11 is December
      let year = currentDate.getFullYear();
    
      // If it's January, move to the previous year and set the month to December
      if (previousMonth === 0)
      {
          previousMonth = 12; // December
          year -= 1; // Previous year
      }
    
      // Get the number of days in the previous month
      let prevMonthDays = daysInMonth(previousMonth, year);
    
      // Calculate the 'from' date
      let fromDate = prevMonthDays - (3 - currentDate.getDate()); // Days back from the last day of the previous month
      from = `${year}-${String(previousMonth).padStart(2, '0')}-${String(fromDate).padStart(2, '0')}`;
  } 
  
  else
  {
      // If the date is not less than 4, set 'from' as 3 days before the current date
      from = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate() - 3).padStart(2, '0')}`;
  }


  useEffect(()=>{
    fetch(`https://newsapi.org/v2/everything?q=${category}&from=${from}&to=${to}&apiKey=aa246ba0f444448fbcdadb5ec25e0b36`)
    .then((response)=>response.json())
    .then((news)=>{
      console.log(news.articles);
      setArticles(news.articles);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[category])




  return (
    <div className="App">
      <header className='header'>
        <div className='title'>
          <h1>News</h1>
          <h1 className='hub'>HUB</h1>
        </div>
        <input className='search' type='text' placeholder='Search News' onChange={(event)=>{
          if(event.target.value !== "")
          {
            setCategory(event.target.value);
          }
          else {
            setCategory("World");
          }
        }}/>
      </header>
      
      <section className='news-articles'>
        {

          articles.length !== 0?
          articles.map((article)=>{
            // only send the article if the cover photo exists
            if(article.urlToImage != null)
            {
              return(
                <News article={article}/>
              )
            }
          })
          // h3 is displayed if API returns no array for the searched category
          :<h3>No available news for the searched category</h3>
        }
        
      </section>
    </div>
  );
}

export default App;
