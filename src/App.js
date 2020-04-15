import React,{useEffect} from 'react';
import TodoLists from './components/todo-lists';
import getOpenItems from './services/open-items'

const style = {
  flexGrow: 1, 
  margin: '0 auto',
  maxWidth: '1140px',
  padding: '0 15px'
}

function App(props) {
  useEffect(() => {
    //Declare window.getOpenItems() function
    getOpenItems();
  },[])
  return (
    <div style={style}>
      <TodoLists />
    </div>
  );
}

export default App;
