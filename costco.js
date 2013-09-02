// Set up a collection to contain product information. On the server,
// it is backed by a MongoDB collection named "products".

Products = new Meteor.Collection("products");

nav_items = [{name: 'Home', link: '/home'}, 
                {name: 'Shopping List', link:'/shopping_list'},
                {name: 'Products', link:'/products'},
                {name: 'About', link:'/about'},
                ] 
if (Meteor.isClient) {
    Template.navigation.items = function () {

        return nav_items;
    }

    Template.nav_item.active = function () {
        return Meteor.Router.page() == this.name.toLowerCase() ? "active" : '';
    }


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
    items = {};
     nav_items.map(function (item) {
        items[item.link] = item.link.slice(1);
    })
    Meteor.Router.add(items)
}


