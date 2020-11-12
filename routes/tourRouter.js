const express = require('express');
const  {getAllTours ,createTour,getTour ,updateTour,deleteTour ,checkId} =require('./../controllers/tourController')


const router = express.Router();

router.param('id',checkId)
router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
