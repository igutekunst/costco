Template.products.products = ->
  Products.find {},
    sort:
      price: 1
      name: 1


Template.products.alert = ->
  (if Session.get("alert") then Session.get("alert") else false)

Template.product.in_cart = ->
  if Meteor.user()
    cart = Meteor.user().cart
    id = @_id
    items = _.filter cart, (item) ->
        item._id is id
    if items.length > 0
        items[0].amount
    else
        0


Template.product.dirty = (a) ->
  Session.equals "amount." + @_id, @in_cart

Template.product.events
  click: ->
    Session.set "selected_product", @_id

  "click input.cart": (event, template) ->
    amount = $("#amount_" + template.data._id).val()
    Meteor.call "add_to_cart", template.data, amount, (ret, error) ->
        if error is not true
            Session.set "alert", error
        else
            Session.set "alert", false


  "click input.remove": (event, template) ->
    Meteor.call "remove_from_cart", template.data._id


Template.product.unitPrice = ->
  @price / @size
