# Week-11-Todo-API-Example

Example of the complete Todo API 

The app has been deployed to Heroku so can be tested using the following requests:


### Create an item:
post - https://wk11exampletodoapi.herokuapp.com/todo/create

n.b. request body must contain name field

### Show list of items
get - https://wk11exampletodoapi.herokuapp.com/todo/

### Show an item by id 
get - https://wk11exampletodoapi.herokuapp.com/todo/<id>

### Update an item
put - https://wk11exampletodoapi.herokuapp.com/todo/<id>

n.b. request body must contain name field and id must exist in the list.

### Delete an item 
delete - https://wk11exampletodoapi.herokuapp.com/todo/<id>


n.b. id must exist in the list.
