import React, { useEffect, useState } from 'react'
import image1 from '../images/about1.jpg'
import image2 from '../images/about2.jpg'
import image3 from '../images/about3.jpg'
import './home.css'
import Carousel from 'react-material-ui-carousel'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'

var carouselItems = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        image: image1
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        image: image2
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image: image3
    }
]
const Home = () => {

    const [cardItems, setCardItems] = useState([])
    const [search, setSearch] = useState('')
    const [input, setInput] = useState('')
    const [visibleItems, setVisibleItems] = useState(9);
    const [sorted, setSorted] = useState(false);

    useEffect(()=>{
        const getProducts = async () =>{
            try{
                const res = await axios.get('https://dummyjson.com/products')
                setCardItems(res.data.products)
                // console.log(res.data.products);
            } catch(error){
                console.log(error);
            }
        }
        getProducts()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearch(input);
        setTimeout(()=>{
            setInput('');
        }, 1000)
    }

    const loadMoreProducts = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 9); // Show 9 more products on each click
    };

    const sortProductsByName = () => {
        const sortedItems = [...cardItems].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setCardItems(sortedItems); // Update the state with the sorted products
        setSorted(true); // Indicate that products are sorted
      };

    useEffect(()=>{
        if(search){
            const handleApi = async ()=>{
                try{
                    const response = await axios.get(`https://dummyjson.com/products/search?q=${search}`)
                    setCardItems(response.data.products);
                    console.log(response.data.products);
                } catch(error){
                    console.log(error);
                }
            }
            setTimeout(()=>{
                handleApi();
            }, 500)
        }
    },[search])
  return (
    <>
    {/* carousel section */}
    <Carousel autoPlay infiniteLoop interval={2000} >
           {carouselItems.map((item)=>{
            return(
                <>
                
                <img src={item.image} height="100%" width="100%"/>
                
                
                </>
            )
           })}
    </Carousel>

    {/* card section */}
    <Container>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2 }}>
                    <TextField
                        variant="outlined"
                        type="search"
                        name="search"
                        id="search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search..."
                        sx={{ width: '300px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ height: '56px' }}
                    >
                        Search
                    </Button>
                </Box>
            </form>

            {/* Sorting Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sortProductsByName}
                    sx={{ mb: 2 }}
                >
                Sort by Name
                </Button>
            </Box>

            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: '20px' }}
            >
                {Array.isArray(cardItems) && cardItems.length > 0 ? (
                    cardItems.slice(0, visibleItems).map((cardItem, index) => (
                        <Grid
                            className='card'
                            item
                            xs={12}
                            ms={4}
                            md={4}
                            key={index}
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 200, objectFit: 'contain' }}
                                    image={cardItem.images ? cardItem.images[0] : 'no images found'}
                                    title={cardItem.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {cardItem.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {cardItem.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/products/${cardItem.id}`}
                                        sx={{
                                            textTransform: 'none', // Prevents uppercase text
                                            borderRadius: '8px',   // Rounded corners
                                            fontWeight: 'bold',    // Bold text
                                            padding: '6px 16px',   // Padding for a better look
                                            mt: 1                  // Margin top
                                        }}
                                    >
                                        See Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                        No products found
                    </Typography>
                )}
            </Grid>


            {visibleItems < cardItems.length && ( // Show the button only if there are more items to load
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={loadMoreProducts}
                    >
                        Load More
                    </Button>
                </Box>
            )}
    </Container>
    </>
  )
}

export default Home