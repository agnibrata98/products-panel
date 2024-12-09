// CategorySidebar.jsx
import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography, Divider, Paper, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 3,
        borderRadius: 2,
        height: '100%',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}
      >
        Product Categories
      </Typography>
      <Divider sx={{ mb: 3, borderColor: '#1976d2' }} />
      <List>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <ListItem
              button
              key={index}
              sx={{
                borderRadius: 1,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateX(10px)',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#e3f2fd',
                },
              }}
            >
              <Link
                to={`/category/${category.slug}`}
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 'bold',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    padding: 1,
                    textAlign: 'left',
                  }}
                >
                  {category.name}
                </Typography>
              </Link>
            </ListItem>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', color: '#666' }}>
            No categories available
          </Typography>
        )}
      </List>
    </Paper>

  );
};

export default CategorySidebar;
