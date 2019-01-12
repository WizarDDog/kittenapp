# kittenapp
App has two views (screens). One view is choosable list of random(from 1 ot 16) kitten pictures and random(from 1 to 95) 
names. With filter button to choose between how many kitten pictures with names, to render. You can choose between 
30-50-100 displayed kittens. After slecting other filter option, all list rerenders with new pictures and names.
All images on the list have TouchableHighlight atribute added, to neavigate to other "kitten view" view (screen).  
Second view is kitten picture and name displayed with some random LoremIpsum text.
There is "No connection" alert and some styling added too.


App tasks: 

Main task by subtasks:
1.	Create a mobile application with react-native framework, application should:
a.	Have two routes (they are usually called views or screens in iOS)
b.	Primary route (view) should be a list view in which all kittens should be displayed
c.	Secondary route (view) should be kitten info view
d.	List should display random kitten images with randomly generated names 
e.	User should be able to specify count of displayed kitten items
2.	Image app functionality:
 .	RN application should have basic navigation (from List view to Kitten view and back).
a.	App should have a filter popup which allows user to specify how many items to show using placekitten.com API (30/50/100).
b.	On application startup all images should be retrieved form API and each kitten should be assigned with randomly retrieved 
name from names array.
c.	Application should show some sort of progress (loading) indicator while images are being fetched.
d.	In Kitten view application should render kitten image at the top followed by it’s name and display kitten description below 
(Lorem Ipsum).
e.	In List view application should render all kittens as list items.
f.	If there are no internet connection user should see message with relevant information (it could be modal popup or text element 
in empty kitten list), for example “Couldn't connect to the internet”.
