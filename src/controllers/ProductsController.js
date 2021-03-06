import ProductModel from "../models/ProductModel";

const ProductController = {
  create: (request, response, next) => {
    const addedProduct = new ProductModel(request.body);

    addedProduct.save()
      .then(() => {
        return response.json(addedProduct);
      })
      .catch((err) => {
        return next(err);
      });
  },

  list: (request, response, next) => {
    ProductModel.find({}).exec()
      .then(data => {
        return response.json(data);
      })
      .catch(err => {
        return next(err);
      });
  },

  listOne: (request, response, next) => {
    const query = request.params.id;

    ProductModel.findById(query)
      .then((data) => {
        return response.json(data);
      })
      .catch(err => {
        return next(err);
      });
  },

  update: (request, response, next) => {
    const itemBody = request.body;
    ProductModel.findById(request.params.id).exec()
      .then(data => {
        data.name = itemBody.name || data.name;
        data.description = itemBody.description || data.description;
        data.reviewNum = itemBody.reviewNum || data.reviewNum;
        data.rating = itemBody.rating || data.rating;
        data.imgUrl = itemBody.imgUrl || data.imgUrl;
        data.price = itemBody.price || data.price;
        data.category = itemBody.category || data.category;
        // @TODO Would change the logic here so we can add review one at a time
        // insted of having to send all of the each time.
        data.reviews = itemBody.reviews || data.reviews;
        return data.save();
      })
      .then(data => {
        return response.json(data);
      })
      .catch(err => {
        return next(err);
      });
  },

  delete: (request, response, next) => {
    const query = request.params.id;

    ProductModel.findByIdAndRemove(query).exec()
      .then(data => {
        return response.json(data);
      })
      .catch(err => {
        return next(err);
      });
  }
};

export default ProductController;
