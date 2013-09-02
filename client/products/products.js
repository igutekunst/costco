
  Template.products.products = function () {
    return Products.find({}, {sort: {price: 1, name: 1}});
  };

  Template.products.selected_product = function () {
    var product = Products.findOne(Session.get("selected_product"));
    return product && product.name;
  };

  Template.product.selected = function () {
    return Session.equals("selected_product", this._id) ? "selected" : '';
  };

  Template.products.events({
    'click input.inc': function () {
      Products.update(Session.get("selected_product"), {$inc: {price: 5}});
    }
  });

  Template.product.events({
    'click': function () {
      Session.set("selected_product", this._id);
    }
  });

  Template.product.unitPrice = function() {
   return this.price / this.size
  };
