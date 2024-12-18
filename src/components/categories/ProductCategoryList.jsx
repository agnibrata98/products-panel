import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem, ListItemText, Box, Typography, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CategorySidebar from './CategorySidebar';

const ProductCategoryList = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        setCategories(response.data); // Ensure response data is correctly passed to state
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
   <>
        <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
                {/* Sidebar */}
                <Grid item xs={12} sm={3}>
                    <CategorySidebar />
                </Grid>

                {/* Main Content Area */}
                <Grid item xs={12} sm={9}>
                <Typography variant="h5" gutterBottom>
                    Browse Categories
                </Typography>
                <Grid container spacing={2}>
                    {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                            <Link to={`/category/${category.slug}`}>
                                <Typography variant="body1" gutterBottom>
                                {category.name}
                                </Typography>
                            </Link>
                        </Paper>
                        </Grid>
                    ))
                    ) : (
                    <Typography>No categories available</Typography>
                    )}
                </Grid>
                </Grid>
            </Grid>
        </Box>
   </>
  );
};

export default ProductCategoryList;
