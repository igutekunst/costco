
  Template.products.products = function () {
    return Products.find({}, {sort: {price: 1, name: 1}});
  };

  Template.products.alert = function () {
      
    return Session.get("alert") ? Session.get("alert") : false;
  };



  Template.product.events({
    'click': function () {
      Session.set("selected_product", this._id);
    },
    'click input.cart' : function (event, template) {
         Meteor.call('add_to_cart', template.data, function (ret, error) {
             if (error !== true) {
                 Session.set("alert", error);
             } else {
                Session.set("alert", false) ;
             }
         } );
    }
  });

  Template.product.unitPrice = function() {
   return this.price / this.size
  };
 
