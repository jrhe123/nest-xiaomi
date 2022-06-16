/**
 * mongoose static helper functions
 *
 * Model.deleteMany()
 * Model.deleteOne()
 * Model.find()
 * Model.findById()
 * Model.findByIdAndDelete()
 * Model.findByIdAndRemove()
 * Model.findByIdAndUpdate()
 * Model.findOne()
 * Model.findOneAndDelete()
 * Model.findOneAndRemove()
 * Model.findOneAndUpdate()
 * Model.replaceOne()
 * Model.updateMany()
 * Model.updateOne()
 */

/**
 * validate:
 *
 * required
 * max
 * min
 * enum
 * match
 * maxlength
 * minlength
 *
 * validate -> custom
 */

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true,
    validate: function (val) {
      // if true, pass validatiion
      return val.length > 5;
    },
  },
  sn: {
    type: String,
    unique: true,
    trim: true,
    // minlength: 8, // validate String only
    // maxlength: 12,
    match: /^sn(.*)/, // validate String only
  },
  age: {
    type: Number,
    min: 0,
    max: 100, // validate Number only
  },
  status: {
    type: String,
    enum: ['0', '1', '2'], // validate String only
    default: '1',
  },
  url: {
    type: String,
    set(val) {
      let formatted = 'https://' + val;
      return formatted;
    },
  },
});

UserSchema.static.findByName = function (name, cb) {
  this.find({ name: name }, function (err, doc) {
    cb(err, doc);
  });
};

UserSchema.method.print = function () {
  console.log('this is regular method');
  console.log(this.name);
};

module.exports = mongoose.mode('User', UserSchema);

var user = new UserModel({
  name: 'roy',
  sn: '123456',
  age: 18,
});
user.save();

UserModel.find({}, function (err, docs) {
  if (err) {
    return;
  }
  console.log('docs: ', docs);
});

user.print();

//
var CategorySchema = new mongoose.Schema({
  title: String,
  description: String,
});
var AuthorSchema = new mongoose.Schema({
  name: String,
  password: String,
});
var ArticalSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  cid: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
});

ArticalModel.aggregate(
  [
    {
      $lookup: {
        from: 'category',
        localField: 'cid',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'author',
        localField: 'author_id',
        foreignField: '_id',
        as: 'author',
      },
    },
  ],
  function (err, docs) {
    if (err) return;
    console.log('docs: ', docs);
  },
);

//
OrderModel.aggregate(
  [
    {
      $lookup: {
        from: 'order_item',
        localField: 'order_id',
        foreignField: 'order_id',
        as: 'items',
      },
    },
    {
      $match: { total_price: { $gte: 100 } },
    },
  ],
  function (err, docs) {
    if (err) return;
    console.log('docs: ', docs);
  },
);

//
experienceSchema
  .findById({ _id: experienceGUID })
  .populate({ path: 'Sections' })
  .exec((error, experience) => {});

experienceSectionSchema
  .findById({ _id: section._id })
  .lean() // return json instead of mongo document
  .populate('Pages', '_id Html PageGUID')
  .exec((error, experienceSection) => {});
