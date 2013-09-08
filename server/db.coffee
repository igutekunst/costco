
if Meteor.isServer
  Meteor.startup ->
    if Products.find().count() is 0
      prods = [
        name: "Brocoli"
        itemNumber: 4
        price: 1
        size: 1
        unit: "can"
      ,
        name: "Diet Coke"
        itemNumber: 0
        price: 9.59
        size: 32
        unit: "can"
      ,
        name: "Root Beer"
        itemNumber: 1
        price: 9.59
        size: 32
        unit: "can"
      ,
        name: "Cheese"
        itemNumber: 2
        price: 10
        size: 1
        unit: "block"
      ]
      i = 0

      while i < prods.length
        Products.insert prods[i]
        i++
