
import {saveData, getData} from '../../storage';

export default window.getOpenItems = function () {
    const data = getData();
    return data.map(d => {
        return {
            name: d.name,
            openItems: d.openItems.map(i => {return i.name})
        }
    })
}