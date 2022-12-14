// import styles from '../styles/Import.module.css'
// import Navbar from '../componen/Navbar'
// import Footer from '../componen/Footer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '../componen/button'

 


export default function Home(query) {
console.log(query)
  const [get, setGet] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(4)


  //search/filter
  const filterRecipe = get.filter(recipe => {
    return recipe.title.toLowerCase().includes(search.toLowerCase())
  })

  //sort by id
  const sortByIdAsc = filterRecipe.sort((a, b) => a.id - b.id)
  const sortByIdDesc = filterRecipe.sort((a, b) => b.id - a.id)

 
  //delete
  const deleteRecipe = (e, id) => {
    //axios.delete(`http://localhost:4001/recipe/12`)
    axios.delete(`http://localhost:4001/recipe/${id}`)
      .then((result) => {
        console.log(result,'delete succes')
        alert('Delete data success');
      })
      .catch((err) => {
        console.log(err)
        alert('Delete data fail');
      })
  }

   //pagination
  const nextPage = async () => {
      setPage(page + 1)
          axios.get(`http://localhost:4001/recipe?limit=${limit}&page=${page}`) 
            .then((result) => {
              result.data && setGet(result.data.data)
              alert('get data success');
            })
            .catch((err) => {
              console.log(err)
              alert('get data fail');
            })
  }
  //pagination
  const prevPage = async () => {
      setPage(page - 1)
        axios.get(`http://localhost:4001/recipe?limit=${limit}&page=${page}`) 
        .then((result) => {
          result.data && setGet(result.data.data)
          alert('get data success');
        })
        .catch((err) => {
          console.log(err)
          alert('get data fail');
        })
  }

const getRecipe =  () => {
  // axios.get(`http://localhost:4001/recipe?limit=${limit}&page=${page}`) 
  //     .then((result) => {
  //       result.data && setGet(result.data.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
} 


  useEffect(() => {
    getRecipe()
  }, [])



  return (
   <div className='container p-5 bg-light bg-gradient'>
     <input type="name" className='form-control shadow p-3 mb-5 bg-body rounded col-10' id="search" placeholder='Search Recipe' style={{ height: 'auto' }} value={search} onChange={e => setSearch(e.target.value)}/>
     <h3 className='text-warning'>New Recipe</h3>
     <div className=''>
          {filterRecipe.map((p, i) => {
              return (
                <div  className='row d-flex justify-content-between py-5' key={p.id}>
                  <div className='col-4'>
                  <div className="card text-bg-dark">
                  <img src={p.photo} alt='' style={{ width: '100%', zIndex: 3, position: 'absolute', marginLeft: '3%', marginTop: '3%' }} />
                  {/* <div class="card-img-overlay">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small>Last updated 3 mins ago</small></p>
                  </div> */}
                </div>
                 
                  </div>
                  <div className='col-5' style={{ padding:'6%' }}>
                    <h4>{p.title.toUpperCase()}</h4>
                    <hr />
                    <p>{p.description}</p>
                    <div className='d-flex'>
                      <Link href={`/recipe/${p.id}`}><Button type='btn btn-warning text-white ml-3' title='Learn More'/></Link>
                      <button className= 'btn btn-danger text-white col-lg-5 ml-5' onClick={(e) =>deleteRecipe(e, p.id)}>delete</button>
                    </div>
                    
                  </div>
                </div>
              )
              
          })}
           <div className='col-12 offset-5 mt-5 text-center '>
          <ul className="pagination">
            <button className="page-item border-white" onClick={nextPage}>next</button>
            <li className="page-item"><a className="page-link" >{page}</a></li>
            <button className="page-item border-white" disabled={page < 1 } onClick={prevPage}>back</button>
          </ul>
        </div>
      </div>
              
   </div>
  )
}


