import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getUsers, updateFlag } from './stores/user-store';
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
      <div style={{ "display": "flex", "flexDirection": "row" }}>
        <table>
          <thead>
            <tr>
            <th>Name</th>
            <th>Bio</th>
            <th>Highlighted Posts</th>
            <th>Current Flag</th>
            <th>Update Flag</th>
            </tr>
          </thead>
          <tbody>

            {users && users.map((user, index) => {
              return (<tr key={user._id}>
                <td style={{ "verticalAlign": "top" }}><a href={user._id}>{user.user.name}</a></td>
                <td style={{ "textAlign": "start" }}>{parse(user.bio)}</td>
                <td style={user.posts.length > 0 ? { "verticalAlign": "top", "color": "red", "fontWeight": "bold", "width": "200px" } : { "verticalAlign": "top" }}>{user.posts.length > 0 ? <a href='#' onClick={() => { showPost === index ? setShowPost(null) : setShowPost(index) }}>{user.posts.length}</a> : user.posts.length}</td>
                <td style={{"verticalAlign": "top"}}>{(() => {
                  if (!user.flag) {
                    return "❓"
                  }
                  return user.flag
                })()}</td>
                <td style={{"verticalAlign": "top"}}>
                  <select onChange={async (e) => {
                    const response = await updateFlag(user._id, e.target.value)
                    if(response.status === 200) {
                      const newUsers = [...users]
                      newUsers[index].flag = e.target.value
                      setUsers(newUsers)
                      console.log(newUsers)
                    }
                  }} name="flag" id="flag-select">
                    <option value="">--new flag--</option>
                    <option value="🟢">🟢</option>
                    <option value="🟠">🟠</option>
                    <option value="🔴">🔴</option>
                  </select>
                </td>
              </tr>)

            })}
          </tbody>
        </table>

        <div style={{ "flex": 1 }}>
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
