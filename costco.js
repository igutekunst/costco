// Set up a collection to contain product information. On the server,
// it is backed by a MongoDB collection named "products".

Products = new Meteor.Collection("products");

if (Meteor.isClient) {
  Template.products.products = function () {
    return Products.find({}, {sort: {price: -1, name: 1}});
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
}

// On server startup, create some products if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var prods = [{name: "Template",   itemNumber :-1, price :-1,    size : 0,  unit : "can"},
                   {name : "Diet Coke", itemNumber : 0, price : 9.59, size : 32, unit : "can"},
                   {name : "Root Beer", itemNumber : 1, price : 9.59, size : 32, unit : "can"},
                   {name : "Cheese"   , itemNumber : 2, price : 0,    size : 1,  unit : "wedge"}
                  ];
      for (var i = 0; i < prods.length; i++)
        Products.insert(prods[i]);
    }
  });
}
