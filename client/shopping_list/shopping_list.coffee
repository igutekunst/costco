Template.shopping_list.products = ->
  if Meteor.user()
    Meteor.user().cart
  else
    []
Template.cart_product.in_cart =  ->
  if Meteor.user()
    cart = Meteor.user().cart
    id = @_id
    items = _.filter cart, (item) ->
        item._id is id
    if items.length > 0
        items[0].amount
    else
        0
Template.cart_product.events "click input.remove": (event, template) ->
  Meteor.call "remove_from_cart", template.data._id

Template.product.unitPrice = ->
  @price / @size
