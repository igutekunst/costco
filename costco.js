// Set up a collection to contain product information. On the server,
// it is backed by a MongoDB collection named "products".


nav_items = [{name: 'Home', link: '/home'}, 
                {name: 'Shopping List', link:'/shopping_list'},
                {name: 'Products', link:'/products'},
                {name: 'About', link:'/about'},
                ] 
if (Meteor.isClient) {
    Meteor.subscribe("products");
    Template.navigation.items = function () {

        return nav_items;
    }

    Template.nav_item.active = function () {
        return Meteor.Router.page() == this.name.toLowerCase() ? "active" : '';
    }


    items = {};
     nav_items.map(function (item) {
        items[item.link] = item.link.slice(1);
    })
    Meteor.Router.add(items)
}


