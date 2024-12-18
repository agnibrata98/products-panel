// CategoryProducts.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import CategorySidebar from './CategorySidebar';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${slug}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <Box sx={{ flexGrow: 1, mt: 5 }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} sm={3}>
          <CategorySidebar /> {/* Use the CategorySidebar component */}
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} sm={9}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                      <Typography variant="body1" gutterBottom>
                        {product.title}
                      </Typography>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <Typography variant="body2" color="textSecondary">
                        ${product.price}
                      </Typography>
                    </Paper>
                  </Grid>
                ))
              ) : (
                <Typography>No products available in this category</Typography>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryProducts;
