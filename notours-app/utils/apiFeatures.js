export default class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // const { duration, difficulty } = req.query;
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);

    // const tours = await Tour.find(queryObj);

    // This is another method

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(duration)
    //   .where('difficulty')
    //   .equals(difficulty);

    // We are making the above method a query which executes at a later point

    // 1B) Advanced Filtering

    // { difficulty: 'easy , duration: { $gte: 5 } }
    // gte, gt, lte, lt

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b{gte|gt|lte|lt}\b/g, (match) => `$${match}`); // replaces the above 4 words with a $ sign in front of them

    console.log('queryStr', queryStr);

    this.query = this.query.find(JSON.parse(queryStr));
    // const query = Tour.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log('sortBy', sortBy);
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // excludes __v from mongo query response
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    const skip = (page - 1) * limit;

    // page=2&limit=10, page1 => 1-10, page 2 => 11-20..
    this.query = this.query.skip(skip).limit(limit);

    // if (this.queryString.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) {
    //     throw new Error('This page does not exist!');
    //   }
    // }

    return this;
  }
}
