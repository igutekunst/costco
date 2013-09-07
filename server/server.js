// On server startup, create some products if the database is empty.
if (Meteor.isServer) {

    Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var prods = [{name: "Brocoli",   itemNumber :  4, price : 1,    size : 1,  unit : "can"},
                   {name : "Diet Coke", itemNumber : 0, price : 9.59, size : 32, unit : "can"},
                   {name : "Root Beer", itemNumber : 1, price : 9.59, size : 32, unit : "can"},
                   {name : "Cheese"   , itemNumber : 2, price : 10,    size : 1,  unit : "block"}
                  ];
      for (var i = 0; i < prods.length; i++)
        Products.insert(prods[i]);
    }

  });
    Accounts.onCreateUser(function(options, user) {
     user.cart = [];
     user.history = [];
      // We still want the default hook's 'profile' behavior.
      if (options.profile)
        user.profile = options.profile;
      return user;
    });

  Meteor.publish("products", function() {
    return Products.find({})
  })

  Meteor.publish("userData", function() {
    return Meteor.users.find({_id: this.userId}) 
  });

  Meteor.methods({
      add_to_cart : function(item)  {
      var count = Meteor.users.find({_id : Meteor.user()._id, 
                                        cart : item}).count()
        
        if (count == 0) {
            Meteor.users.update( {_id     : Meteor.user()._id},  
                                {$push   : {'cart' : item } }  );
            return true;
        }
            return new Meteor.Error(409, "Item already in cart", "Costco carts only support one item per type in cart. Too add more, change the amount/qunatity desired.");
        },
      remove_from_cart : function(id) {
        Meteor.users.update ({_id : Meteor.user()._id}, {$pull : {cart : { _id : id}}}) ;
      }
  })

}
