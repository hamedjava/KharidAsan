class ProductEntity {
  constructor({
    _id,
    id,
    name,
    description,
    price,
    stock,
    category,
    images = [],
    sellerId,
    createdAt,
    updatedAt
  }) {
    this._id = _id || id;
    this.id = _id || id;
    this.name = name;
    this.description = description || '';
    this.price = price;
    this.stock = stock || 0;
    this.category = category || '';
    this.images = images;
    this.sellerId = sellerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toObject() {
    return {
      id: this._id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      category: this.category,
      images: this.images,
      sellerId: this.sellerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = ProductEntity;
