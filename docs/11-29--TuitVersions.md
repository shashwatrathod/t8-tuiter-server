
We will create the following endpoints: 

PUT /edit -> dump "tuit", "v", "tid" into TuitVersion. Then on the main tuit, we are going to add 1 to the version number, then edit the "tuit" and then save it in the same collection.

Tuits:
[{
    tuit: "something else 2"
    v: 3
    _id: "1"
}]

TuitVersions:
[{
    tuit: "something"
    v: 1
    tid: "1"
}, {
    tuit: "something else"
    v: 2
    _id: "1"
}]

GET tuits/tid/versions
[{
    tuit: "something else"
    v: 2
    _id: "1"
}, {
    tuit: "something"
    v: 1
    tid: "1"
}, ... ]




Frontend:
-> If the tuit is posted by logged in user, then show an edit button next to the tuit.
-> Create a new screen (React router: /tuits/tid/edit)
-> On submit, call PUT /edit -> navigate back

-> Each edited tuit will have an icon to show that it is edited. (check on any tuit if 'v' > 1)
-> when any user clicks the icon, they are taken to a new screen (React router tuits/tid/versions) to see previous versions