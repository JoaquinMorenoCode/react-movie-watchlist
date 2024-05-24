import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Watchlist.css';

export default function Watchlist() {


    const [watchlist, setWatchlist] = useState([]);

    const fetchWatchlist = async () => {
        const url = "https://joaquinm.alwaysdata.net/get_watchlist.php";
        const response = await fetch(url);
        const data = await response.json();
        setWatchlist(data);
    }

    function deleteBookmark(id) {
     const url = "https://joaquinm.alwaysdata.net/delete_bookmark.php?id=" + id;
     fetch(url);
    }

    function deleteWatchlist() {
        const url = "https://joaquinm.alwaysdata.net/delete_watchlist.php";
        fetch(url);
       }
   


    useEffect(() => {
        fetchWatchlist();
    }, [])

    useEffect(() => {
        fetchWatchlist();
    }, [watchlist])



    const renderTable = () => {
        return (

            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th className='overviewColumn'>Overview</th>
                        <th style={{ width: '100px' }}>Release Year</th>
                        <th className='imgColumn'></th>

                    </tr>
                </thead>
                <tbody>
                    {watchlist.map(movie =>
                        <tr key={movie.id}   >
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td className='overviewColumn' >{movie.overview}</td>
                            <td style={{ width: '100px' }} >{movie.releaseYear}</td>
                            <td className='   imgColumn' style={{ overflow: "hidden"  }}>
                                <div className='position-relative' >
                                    <img    style={{width:"100%"}} src={movie.imageUrl}>
                                    </img>
                                    <h5  className='position-absolute  top-0 end-0  text-white'><i onClick={()=> deleteBookmark(movie.id)} class="bi bi-trash3-fill p-2"></i></h5>
                                </div>
                            </td>

                        </tr>
                    )}
                </tbody>

            </table>


        )
    }






    return (
        <>
            <div>
                <div className='container'>
                    <div className='pt-5 pb-5 d-flex justify-content-end  align-items-center' >
                        <h1 >    Your Watchlist</h1>
                        <div className='ps-2'>
                            <button className='btn btn-primary'> Delete watchlist</button>
                        </div>
                    </div>
                    <div>{renderTable()}</div>
                </div>
            </div>


        </>
    )
}
