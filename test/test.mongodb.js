/**
 * $project
 * $match
 * $group
 * $sort
 * $limit
 * $skip
 * $lookup
 */

db.order.aggregate([
  {
    $project: { order_id: 1, order_guid: 1 },
  },
  {
    $match: { total_price: { $gte: 100 } },
  },
  {
    $sort: { total_price: -1 },
  },
  {
    $limit: 1,
  },
  {
    $skip: 2,
  },
]);

db.order.aggregate([
  {
    $group: {
      _id: '$order_id',
      total: {
        $sum: '$num',
      },
    },
  },
]);

db.order.aggregate([
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
]);
