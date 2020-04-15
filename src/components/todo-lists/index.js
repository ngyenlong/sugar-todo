import React,{useState, useEffect} from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {saveData, getData} from '../../storage';
import {status} from '../../common/constant';
import CreateForm from '../create-form';
import List from '../list';
import classes from './todo-lists.module.css';
import {Utilities} from '../../common/Utilities';

function TodoLists (props) {
  const [data, setData] = useState([]);
  //Get backup data in localstorage, call once
  useEffect(() => {
    const dataBkup = getData();
    if (dataBkup && dataBkup.length > 0) {
      setData(dataBkup);
    }
  }, [])

  // Add a new list to dashboard
  const addNewList = value => {
    //Sort list by name in alphanumberic order
    const update = Utilities.sortByKey([...data,{id: Utilities.randomUuid(), name: value ? value.trim() : 'Untitled title', openItems: []}], 'name');
    setData(update);
    //Backup data to localstorage
    saveData(update);
  }

  // Delete a list by list id
  const handleRemoveList = ({listId}) => {
    // Alert confirm delete if click yes
    if (!listId) return;
    if (window.confirm("Are you sure you want to permanently delete this item(s)?")) {
      const update = [...data];
      const currentIndex = update.findIndex(x => x.id === listId);
      if (currentIndex > -1) {
        update.splice(currentIndex, 1);
      } 
      setData(update);
      saveData(update);
    }
  }

  // Update the list by list id, only update name
  const handleUpdateList = list => {
    if (!list || (list && !list.id)) return;
    const update = [...data];
    const currentIndex = update.findIndex(x => x.id === list.id);
    if (currentIndex > -1) {
      update[currentIndex] = {... update[currentIndex], name: list.name};
      setData(update);
      saveData(update);
    } 
  }

  // Add a new item of the list by list id
  const handleAddNewItem = ({listId, name}) => {
    if (!listId) return;
    const update = [...data];
    const currentIndex = update.findIndex(x => x.id === listId);
    if (currentIndex > -1) {
      update[currentIndex].openItems = [...update[currentIndex].openItems, {id: Utilities.randomUuid(), name: name, status: status.OPEN}]
      setData(update);
      saveData(update);
    }
  }

  // Delele an item of list by list id and item id
  const handleRemoveItem = ({listId, itemId}) => {
    if (!listId || !itemId) return;
    if (window.confirm("Are you sure you want to permanently delete this item(s)?")) {
      const update = [...data];
      const listIndex = update.findIndex(x => x.id === listId);
      if (listIndex > -1) {
        const openItems = update[listIndex].openItems || [];
        const itemIndex = openItems.findIndex(x => x.id === itemId);
        if (itemIndex > -1) {
          openItems.splice(itemIndex, 1);
          setData(update);
          saveData(update);
        }
      }
    }
  }

  // Toggle checked item of the list by list id and item id
  const handleCheckItem = ({listId, itemId}) => {
    if (!listId || !itemId) return;
    const update = [...data];
    const listIndex = update.findIndex(x => x.id === listId);
    if (listIndex > -1) {
      const openItems = update[listIndex].openItems || [];
      const itemIndex = openItems.findIndex(x => x.id === itemId);
      if (itemIndex > -1) {
        openItems[itemIndex] = {...openItems[itemIndex], status: openItems[itemIndex].status === status.COMPLETED ? status.OPEN : status.COMPLETED}
        setData(update);
        saveData(update);
      }
    }
  }

  // Move an item to another list by dragging list id, drop list id and item id
  const handleMoveItem = ({dropListId, itemId, dragListId}) => {
    if (!dropListId || !itemId || !dragListId) return;
    const update = [...data];
    const currentItemIndex = update.findIndex(x => x.id === dragListId);
    if (currentItemIndex > -1) {
      const openItemsCurrent = update[currentItemIndex].openItems || [];
      const rowIndex = openItemsCurrent.findIndex(x => x.id === itemId);
      if (rowIndex > -1) {
          const destItemIndex = update.findIndex(x => x.id === dropListId);
          if (destItemIndex > -1){
            const openItemsDest = update[destItemIndex].openItems || [];
            openItemsDest.push(openItemsCurrent[rowIndex]);
            openItemsCurrent.splice(rowIndex, 1);
            setData(update);
            saveData(update);
          }
      }
    }
  }
  return (
    <div className={classes.ListWrap}>
      <div className={classes.ListHeader}>
        <h1 style={{color: '#366B95'}}>DASHBOARD</h1>
        <CreateForm submit={addNewList}/>
      </div>
      <DndProvider backend={Backend}>
        <div className={classes.ListContent}>
          {data && 
        data.length > 0 && 
        data.map((item, index) =>  (
          <List 
          data={item} 
          key={index} 
          removeItem={e => handleRemoveItem(e)} 
          moveItem={e => handleMoveItem(e)} 
          checkItem={e => handleCheckItem(e)} 
          updateList={e => handleUpdateList(e)} 
          removeList={e => handleRemoveList(e)} 
          addNewItem={e => handleAddNewItem(e)}
          />
          ))}
          </div>
      </DndProvider>
    </div>
  );
}
export default TodoLists;