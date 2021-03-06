import mongoose from 'mongoose';
import slugify from 'slugify';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
      trim: true, // removes blank spaces from the end and beginning of the string.
    },
    description: {
      type: String,
      trim: true, // removes blank spaces from the end and beginning of the string.
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // permanently hides this field from the output
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Virtual Property
 * Created each time when we get data from db
 */
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

/**
 * Mongoose Document Middleware - Pre Hook/ Middleware
 * Runs before an actual event, ie.., before a document is saved in to the db
 * Runs before .save() and .create(), but not on insertMany()
 */
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/**
 * Mongoose Post Hook
 * Runs after a doc is saved
 */
tourSchema.post('save', function (doc, next) {
  next();
});

/**
 * Mongoose Query Middleware - Pre Hook
 * Runs before execution of a query
 * Wont execute for findOne() unless we use regular expression
 */
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); // executed before the find query is executed in the controller

  this.start = Date.now();
  next();
});

/**
 * Mongoose Query Middleware - Post Hook
 */
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

/**
 * Mongoose Aggregation Middleware - Pre Hook
 * Runs before execution of a aggregation
 */
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  console.log('aggregation pipeline', this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
