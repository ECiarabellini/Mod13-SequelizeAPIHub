const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // Find the category by ID in the request parameters
    const category = await Category.findByPk(req.params.id);

    // If category with the given ID does not exist, return 404 Not Found
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Update the category's name with the value from request body
    await category.update({ category_name: req.body.category_name });
    //return new category if successful
    res.status(200).json(category);
  } catch (error) {
    // If an error occurs, return 500 Internal Server Error
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If category with the given ID does not exist, return 404 Not Found
    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
