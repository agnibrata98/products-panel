import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Container, Card, CardContent, CardMedia, Box, Divider, Rating } from "@mui/material"; // Import Rating component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick"; // Import react-slick for the carousel    

const ProductsDetails = () => {
     // Slick slider settings
  const settings = {
    dots: true, // Show dots below the slider
    infinite: true, // Infinite loop of images
    speed: 500,
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true, // Automatically scroll through images
    autoplaySpeed: 3000, // Scroll speed for auto scroll
  };


  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ display: 'flex', padding: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        {/* Product Image Carousel */}
        <Box sx={{ width: { xs: '100%', sm: '300px' }, mr: { sm: 3 }, mb: { xs: 3, sm: 0 } }}>
          <Slider {...settings}>
            {product.images.map((image, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Product Details */}
        <CardContent sx={{ flex: '1', textAlign: { xs: 'center', sm: 'left' } }}>
          {/* Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2rem' },
            }}
          >
            {product.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: '1.8',
              mb: 3,
            }}
          >
            {product.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Price */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'secondary.main',
              mb: 1,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Price: ${product.price}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 2 }}>
            <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
            {product.rating} ({product.reviews.length} reviews)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductsDetails;
