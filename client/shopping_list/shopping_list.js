
  Template.shopping_list.products = function () {
      if (Meteor.user()){
        return Meteor.user().cart;
      } else {
      return []
      }
  };


  Template.cart_product.events({
    'click input.remove' : function (event, template) {
        Meteor.call("remove_from_cart", template.data._id);
    }
  });

  Template.product.unitPrice = function() {
   return this.price / this.size
  };
 
