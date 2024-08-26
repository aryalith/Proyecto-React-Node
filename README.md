# My Game List - React/Node Project

My Game List is an API where you can register and make 3 kinds of game lists. It lets you add a game to either Completed, Playing or Pending. You can browse the global game library and choose the one you are interesed in for details.
Users can have two roles: client or admin. Admin can DELETE games in the global library.
Every user have a personal Library where they can check their list of games added in each status.

Server is also in https://my-game-list-react-node.onrender.com/ but routes in front need to be change if you want to use it.

## Installation

You need to download both folders and install react and node.
More information in the corresponding folder.

## Usage

### Register
You need to register in order to access to your library and add or delete games from Completed, Playing or Pending.
Not logged in people can:
    - Browse Home
    - Browse game library
    - Log in (if you previously registered)
    - Register

### Client user
If you don't want to register you can use this user:
Email: patito@gmail.com
Password: 1234

You can:
    - Browse Home
    - Browse game library
    - Add games to Completed, Playing or Pending. You can't add a game already categorized to another list.
    - Remove games from each list.
    - Log out

### Admin user
Admin status can only be given by changing it through the data base.
If you want to try admin role you can use this user:
Email: admin@admin.com
Password: admin

Admin user can:
    - Browse Home
    - Browse game library
    - Remove a game from game library through detailed view.
    - Add games to Completed, Playing or Pending. You can't add a game already categorized to another list.
    - Remove games from each list.
    - Log out

In the server routes admin users can also add games, delete users, modify games and users. This is not implemented in the front-end yet.

## Contributing

Pull requests are welcome.
