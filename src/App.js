import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getUsers } from './stores/user-store';
import parse from "html-react-parser";

function App() {

  const [users, setUsers] = useState([])
  const [showPost, setShowPost] = useState(null) 

  useEffect(() => {
    (async () => {
      setUsers(await getUsers())
    })()
  }, [])

  console.log(users)

  return (
    <div className="App">
      <h1>Follower Protect</h1>
      <div style={{"display": "flex", "flexDirection": "row"}}>
      <table>
        <tbody>
        {users && users.map((user, index) => <tr key={user._id}><td><a href={user._id}>{user.user.name}</a></td><td style={user.posts.length > 0 ? {"color": "red", "fontWeight": "bold", "width": "200px"} : {}}>{user.posts.length}</td><td><a href='#' onClick={() => {showPost === index ? setShowPost(null) : setShowPost(index)}}>Show Posts</a></td></tr>)}
      </tbody>
      </table>

      <div style={{"flex": 1}}>
        <h2>{showPost !== null ? users[showPost].user.name : ""}</h2>
        {showPost !== null ? users[showPost].posts.map((post) => {
          return (
            parse(post)
          )
        }) : null}
      </div>
      </div>
    </div>
  );
}

export default App;
