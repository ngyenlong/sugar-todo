import React from 'react';
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import {status, itemType} from '../../common/constant'
import styles from './item.module.css';

function Item(props) {
    const {data, showCopyIcon, onRemoveItem, onCheckItem, dragItemEnd, ...other} = props;
    // Enabled dragging 
    const [{ opacity }, drag] = useDrag({
        item: { type: itemType.BOX, itemId: data &&  data.id },
        options: {
          dropEffect: showCopyIcon ? 'copy' : 'move',
        },
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult();
          // Call when dragging on drop elements
          if (item && dropResult){
            dragItemEnd({dropListId: dropResult.listId, itemId: item.itemId})
          }
        },
        collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.6 : 1,
        }),
    })
    const handleToggleCheck = () => {
      const itemId = data && data.id;
      itemId && onCheckItem(itemId);
    }
    const handleRemoveItem = () => {
      const itemId = data && data.id;
      itemId && onRemoveItem(itemId);
    }
    const isChecked = !!(data && data.status && data.status === status.COMPLETED);
    return (
        <li className={styles.Row} {...other} ref={drag} style={{opacity }}>
          <label className={styles.CheckboxWrap}>
            <input  type="checkbox"  checked={isChecked} onChange={e => handleToggleCheck()}/>
            <span className={styles.Checkmark}></span>
          </label>
          <p className={isChecked? [styles.TruncateText, styles.TextLine].join(" ") : styles.TruncateText }>{data && data.name}</p>
          <div className={styles.RemoveBtn}>
          <span style={{color: 'gray', fontSize: '1.5em'}} className={["material-icons", "__text_btn"].join(' ')} onClick={e => handleRemoveItem()}>close</span>
          </div>
      </li>
    );
}
Item.propTypes = {
  data: PropTypes.object,
  onRemoveItem: PropTypes.func,
  onCheckItem: PropTypes.func,
  dragItemEnd: PropTypes.func,
}
export default Item;

