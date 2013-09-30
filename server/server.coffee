# On server startup, create some products if the database is empty.
if Meteor.isServer

    Accounts.onCreateUser (options, user) ->
        user.cart = []
        new_cart =
            created_at: new Date()
            items: []
            userId: user._id
            old_carts: []

        cart_id = Carts.insert new_cart

        user.history = []
        user.cart_id = cart_id

        # We still want the default hook's 'profile' behavior.
        user.profile = options.profile  if options.profile
        user

    Meteor.publish "products", ->
        Products.find {}

    Meteor.publish "userData", ->
        Meteor.users.find userId: @userId

    Meteor.publish "group_cart", ->
        Meteor.users.find {},
            fields :
                cart : true
    Meteor.publish "carts", ->
        Carts.find userId: @userId
        



  Meteor.methods
    add_to_cart: (item, amount) ->
        cart = Carts.findOne userId: @userId
        id = item._id
        count = _.filter cart.items, (item) ->
            item._id is id
            
        .length
        if count is 0
            item.amount = amount * 1
            Carts.update userId: @userId
                ,
                    $push:
                        items: item
            return true
        new Meteor.Error(409, "Item already in cart", "Costco carts only support one item per type in cart. Too add more, change the amount/qunatity desired.")

    remove_from_cart: (id) ->
        Carts.update userId: Meteor.userId()
            ,
                $pull:
                    items:
                        _id: id
        return true


