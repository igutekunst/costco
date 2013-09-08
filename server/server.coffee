# On server startup, create some products if the database is empty.
if Meteor.isServer

  Accounts.onCreateUser (options, user) ->
    user.cart = []
    user.history = []
    
    # We still want the default hook's 'profile' behavior.
    user.profile = options.profile  if options.profile
    user

  Meteor.publish "products", ->
    Products.find {}

  Meteor.publish "userData", ->
    Meteor.users.find _id: @userId

  Meteor.methods
    add_to_cart: (item, amount) ->
      count = Meteor.users.find(
        _id: Meteor.user()._id
        cart:
            $elemMatch:
                _id: item._id

      ).count()
      if count is 0
        item.amount = amount * 1
        Meteor.users.update
          _id: Meteor.user()._id
        ,
          $push:
            cart: item

        return true
      new Meteor.Error(409, "Item already in cart", "Costco carts only support one item per type in cart. Too add more, change the amount/qunatity desired.")

    remove_from_cart: (id) ->
      Meteor.users.update
        _id: Meteor.user()._id
      ,
        $pull:
          cart:
            _id: id


