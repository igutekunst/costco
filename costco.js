// Set up a collection to contain product information. On the server,
// it is backed by a MongoDB collection named "products".

Products = new Meteor.Collection("products");

if (Meteor.isClient) {
  Template.products.products = function () {
    return Products.find({}, {sort: {price: -1, name: 1}});
  };

  Template.products.selected_name = function () {
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
}

// On server startup, create some products if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var names = ["Diet Coke",
                   "Root Beer",
                   "Cheese"];
      for (var i = 0; i < names.length; i++)
        Products.insert({name: names[i], price: Math.floor(Random.fraction()*10)*5});
    }
  });
}
