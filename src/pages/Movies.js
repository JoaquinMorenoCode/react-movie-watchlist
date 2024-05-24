import React, { useEffect, useState } from 'react'
import './Movies.css'
import { CSSTransition } from 'react-transition-group'
import { Placeholder } from 'react-bootstrap';
import { Form } from 'react-router-dom';
export default function Paquetes() {

    const [movies, setMovies] = useState([]);
    const [bookmarkStatus, setBookmarkStatus] = useState({});
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("us");
    const [platform, setPlatform] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isLoaded, setLoaded] = useState(false);


    const fetchCountryCode = async () => {
        try {
            const url = "https://joaquinm.alwaysdata.net/get_countries.php";
            // const url = "http://localhost/demo/mockupdata.php";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    const fetchMovies = () => {
        const url =  "https://joaquinm.alwaysdata.net/get_movies.php?country=" + country + "&catalogs=" + platform; 
        // const url = "http://localhost/demo/readjson.php" //staticjson
        fetch(url).then((response) => response.json())
            .then((data) => {
                setMovies(data["shows"])
            });

    }

    const isBookmark = async (id) => {
        const url = "https://joaquinm.alwaysdata.net/isBookmark.php?id=" + id;
        const response = await fetch(url);
        const res = await response.json();
        const bookmarkIcon = document.getElementById(id);
        if (res != null) {
            return true;
        } else {
            return false;
        }
    }
    // Function to fetch bookmark statuses for movies
    const fetchBookmarkStatus = async (movies) => {
        const bookmarks = {};
        for (let movie of movies) {
            const isBookmarked = await isBookmark(movie.id);
            bookmarks[movie.id] = isBookmarked;
        }
        setBookmarkStatus(bookmarks);
        setLoaded(true);
    };
    const deleteBookmark = (id) =>{
        const url = "https://joaquinm.alwaysdata.net/delete_bookmark.php?id=" + id; 
        fetch(url);
    }

    //Load Data
    useEffect(() => {
        fetchCountryCode();
        fetchMovies();
        
    }, [])
    //Reload movies 
    useEffect(() => {
        fetchMovies()
    }, [isSearching])

    // Check Bookmark
    useEffect(() => {
        if (movies.length > 0) {
            fetchBookmarkStatus(movies);
        }
    }, [movies,bookmarkStatus]);
 

    function handleCountrySelect(event) {
        setCountry(event.target.value.toString().toLowerCase());
        setIsSearching(!isSearching);
    }
    function handlePlatformSelect(event) {
        const option = event.target.value.toString();
        setPlatform(option == "All:" ? "" : option.toLowerCase());
        setIsSearching(!isSearching);
    }
    async function handleAddBookmark(...args) {
        try {
            let checkBookmark = bookmarkStatus[args[0]];
                console.log("isBookmark?",bookmarkStatus[args[0]]);
            if (checkBookmark == false) {
                bookmarkStatus[args[0]] = true;
                const url = "https://joaquinm.alwaysdata.net/post_watchlist.php"

                const formData = new FormData();
                formData.append("id", args[0]);
                formData.append("title", args[1]);
                formData.append("director", args[2].toString());
                formData.append("overview", args[3]);
                formData.append("releaseYear", args[4]);
                formData.append("imageUrl", args[5]);

                const options = {
                    method: "post",
                    body: formData,
                }

                await fetch(url, options).then(res => console.log(res.status));
               
            } else {
                bookmarkStatus[args[0]] = false;
                deleteBookmark(args[0])
                
            }
        } catch (error) {
            console.error("Error adding bookmark:", error);

        }
    }


    const countryDropdown = () => {

        if (Object.values(countries).length > 0) {
            return (
                <div >
                    <div className='d-flex'>
                        <h3 className='ps-3 pe-2' >{countries[country]["name"]}  </h3>
                        <select className=" ps-3 pe-3 btn btn-secondary dropdown-toggle" onChange={handleCountrySelect} >
                            <option defaultValue="us">US</option>
                            {(Object.values(countries)).map((country) =>
                                <option className='m-5' key={country["countryCode"].toString()} >{country["countryCode"].toUpperCase()}</option>
                            )}
                        </select>
                    </div>

                </div>


            )
        }


    }

    const platformDropdown = () => {

        if (Object.values(countries).length > 0) {
            return (
                <div>

                    <div className='d-flex'>
                        <h3 className='ps-3 pe-2' >Platform:  </h3>
                        <select className=" ps-3 pe-3 btn btn-secondary dropdown-toggle" onChange={handlePlatformSelect} >
                            <option defaultValue="">All:</option>
                            {(countries[country]["services"]).map((country) =>
                                <option className='m-5' key={country["id"].toString()} >{country["id"].toUpperCase()}</option>
                            )}
                        </select>

                    </div>


                </div>


            )
        }


    }



    const drawCards = () => {
        return (

            <div className='w-75 mx-auto'>
                <div className="d-flex flex-wrap justify-content-center " >
                    {movies.map((item) =>
                        <div className="col" key={item.id} >
                            <div className="cardContainer" >
                                <div className='cardImage'>
                                    <img src={item.imageSet.horizontalPoster.w720} className="card-img-top" alt="..." />
                                </div>
                                <div className="cardText">
                                    <h3 className='cardCategory'> {item.title.toUpperCase()}</h3>
                                    <h6 className="cardDescription">{item.overview.slice(0, 100) + "..."}
                                    </h6>
                                    <div className='d-flex justify-content-between'>
                                        <h6 className="cardDescription"> Release: {item.releaseYear || item.firstAirYear}</h6>



                                        <a className="icon" >  <i id={item.id} className={bookmarkStatus[item.id] ? "bi bi-bookmark-check-fill" : "bi bi-bookmark"}


                                            onClick={
                                                () => {

                                                    handleAddBookmark(item.id,
                                                        item.title,
                                                        item.directors || item.creators,
                                                        item.overview,
                                                        item.releaseYear || item.firstAirYear,
                                                        item.imageSet.horizontalPoster.w720)
                                                 
                                                }}></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>)}

                </div>
            </div>



        )
    }




    if (Object.values(countries).length > 0) {

        return (
            <div className='mainPaquetes'>


                <div className='pb-5' >
                    <div className='pt-3 w-100 d-flex justify-content-start'>
                        {countryDropdown()}
                        {platformDropdown()}


                    </div>
                    {drawCards()}
                </div>

            </div>)
    } else {
        return (
            <div className='vh-100 mainPaquetes'>
                <div className='h-100 align-items-center d-flex justify-content-center'>
                    <div >
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }




}
