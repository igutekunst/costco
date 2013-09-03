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
      var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
      user.dexterity = d6() + d6() + d6();
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
}
