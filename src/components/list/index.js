import React, {useState, useEffect, useRef} from 'react';
import { useDrop } from 'react-dnd'
import {status, itemType} from '../../common/constant'
import Item from '../item'
import classes from './list.module.css';

function List (props) {
  const { data, addNewItem, updateList, removeList, removeItem, checkItem, moveItem} = props;
  const [showInput, setShowInput] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [value, setValue] = useState('');
  const titleInputRef= useRef(null);
  // Enabled can receive drop when an element dragging
  const [{ isActive }, drop] = useDrop({
    accept: itemType.BOX,
    drop: () => ({listId: data.id}),
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  })

  // Handle form add new item
  const onKeyUpAddInput = e => {
    // Press Enter key to submit
    if (e.which === 13 && value) {
        addNewItem({listId: data.id, name: value.trim()});
    }
    // Press ESC key on input to dismiss
    if (e.which === 27) {
      setShowInput(false)
    }
  }
  // Call events to parent to update data
  const handleRemoveList = () => {
    const listId = data && data.id;
    listId && removeList({listId: listId})
  }
  const handleRemoveItem = (itemId) => {
    const listId = data && data.id;
    listId && itemId && removeItem({listId: listId, itemId: itemId})
  }
  const handleCheckItem = (itemId) => {
    const listId = data && data.id;
    listId && itemId && checkItem({listId: listId, itemId: itemId})
  }
  const handleMoveItem = ({dropListId, itemId}) => {
    const dragListId = data && data.id;
    // Only call if dragging to another drop elements
    if (dropListId && itemId && dragListId && dropListId !== dragListId){
      moveItem({dropListId, itemId, dragListId})
    }
  }
  return (
    <div className={[classes.Item, "todo-item"].join(" ")} ref={drop}>
       <div className={classes.ItemHeader}>
            {showTitle ?(
              <>
              <input className="__input" style={{border: 'none', height: '25px', width: '100%', marginRight: '5px'}} type="text" ref={titleInputRef} defaultValue={data.name} />
              <span style={{fontSize: '2em'}} className="material-icons __text_btn" onClick={() => {setShowTitle(false);updateList({...data, name: titleInputRef.current.value})}}>save</span>
              </>
            ) : (
              <>
              <a title="click to edit" className="__text_btn __truncate_text" style={{display: 'block', flexGrow: 1, marginRight: '5px'}} onClick={() => setShowTitle(true)}>{data.name}</a>
              <div className={classes.BtnGroup}>
                   <span className="material-icons __text_btn" onClick={() => setShowInput(!showInput)}>playlist_add</span>
                   <span className="material-icons __text_btn" onClick={e => handleRemoveList()}>delete</span>
               </div>
               </>
            )}
           
        </div>
        <div className={classes.ItemBody}>
        {showInput && (
        <div style={{margin: '10px'}}>
          <input className={["__input", classes.InputItem].join(" ")} onChange={(e) => setValue(e.target.value)} onKeyUp={(e) => onKeyUpAddInput(e) }/>
        </div>
        )}
        
          <ul >
            {data.openItems && 
            data.openItems.length > 0 && 
            data.openItems.map((each, index) => (
            <Item key={index} 
            data={each} 
            dragItemEnd={e => handleMoveItem(e)}
            onRemoveItem={e => handleRemoveItem(e)}
            onCheckItem={e => handleCheckItem(e)}
            />
            ))}
          </ul>
        </div>
        
    </div>
  );
}


export default List;

