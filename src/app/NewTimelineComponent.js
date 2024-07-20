'use client';
import Timeline, {
    TimelineHeaders, 
    SidebarHeader,
    DateHeader
} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import EditItemForm from './EditItemForm';
import NewItemForm from './NewItemForm';
import DeleteGroupComponet from './DeleteGroupComponent';


const NewTimelineComponent = ()=> {
    
    //const [isClient, setIsClient] = useState(false);
    
    const [editingItem, setEditingItem] = useState(null);
    
    const getGroupsFromLocalStorage = () => {
        const savedGroups = localStorage.getItem('timelineGroups');
        return savedGroups ? JSON.parse(savedGroups) :  [{id:1, title: 'group 1', stackItems: true, height: 50}] 
    };
    
    const [groups, setGroups] = useState(getGroupsFromLocalStorage);

    useEffect(()=>{
        localStorage.setItem('timelineGroups', JSON.stringify(groups))
    },[groups]);
    
    /*const [groups, setGroups] = useState(
        
        [
          {id:1, title: 'group 1', stackItems: true, height: 50},
        ]
        
    );*/
    
    const getItemsFromLocalStorage = () => {
        const savedItems = localStorage.getItem('timelineItems');
        console.log('savedItems', savedItems);
        return savedItems ? JSON.parse(savedItems).map(item=>
             ({...item, start_time: moment(item.start_time), 
                end_time: moment(item.end_time)})) 
                :  [{id:1, group:1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour'), canMove: true, canResize: true, canChangeGroup: true}]
                 
    };
    
    const [items, setItems] = useState(getItemsFromLocalStorage())
    console.log('items', items);
    console.log('getItemsFromLocalStorage', getItemsFromLocalStorage());
    

    useEffect(()=>{
        localStorage.setItem('timelineItems', JSON.stringify(items))
        //console.log('Items saved to localStorage:', items);
    },[items]);

    /*const [items, setItems] = useState(      

        [    
          {id:1, group:1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour'), canMove: true, canResize: true, canChangeGroup: true},
        ]
    
    );*/

    const [newItem, setNewItem] = useState({
   
        group: 1,
        title: '',
        start_time: moment(),
        end_time: moment().add(1, 'hour')
     
       });

    const [newGroup, setNewGroup] = useState({
       
        title: '',
        stackItems: true,
        height: 50
      
       });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'start_time' || name === 'end_time') {
          setNewItem((prevState) => {const updateItem = {
            ...prevState, [name]: moment(value)
          }; 
          console.log('Update newItem:', updateItem);
          console.log('Items', items);
          return updateItem;
        });
        } else {
          setNewItem((prevState) => {
            const updateItem = {...prevState, [name]: value };
             console.log('Update newItem:', updateItem);
             return updateItem;
          });
        }
      }; 

        const handleGroupInputChange = (e) => {
          const { name, value } = e.target;
           setNewGroup((prevState) => {
            const updateGroup = {...prevState, [name]: value };
             console.log('Update newItem:', updateGroup);
             return updateGroup;
          });
        };
       
       const handleAddItem = (e) => {
       
        e.preventDefault()
        const newItemWithId = { ...newItem, id: items.length + 1 }
        setItems([ ...items, newItemWithId]);
       
       }
       const handleAddGroup = (e) => {
       
        e.preventDefault()
        const newGroupWithName = { ...newGroup, id: groups.length + 1 }
        setGroups([ ...groups, newGroupWithName]);
       
       }
      
       const handleItemMove = (itemId, dragTime, newGroupOrder) => {
            
        setItems(items.map(item => 
        item.id === itemId ? { ...item, group: groups[newGroupOrder].id, start_time: moment(dragTime) } : item
        
        ));
       };
       
       const handleItemSelect = (itemId, e, time) => {
        
        const selectedItem = items.find(item => item.id === itemId);
        setEditingItem(selectedItem);
       
       };

       const handleItemDeselect = () => {
        setEditingItem(null);
      };
       
       const handleUpdateItem = (e) => {
        
        e.preventDefault();
        setItems(items.map(item => 
          item.id === editingItem.id ? editingItem : item
        ));
        
        handleItemDeselect();
               
       };
       
       const handleEditInputChange = (e) => {
        
        const { name, value } = e.target;
        
        if (name === 'start_time' || name === 'end_time') {
          
            setEditingItem((prevState) => ({
            ...prevState,
            [name]: moment(value)
          }));
        } else {
          setEditingItem((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
      };

      const handleDeleteGroup = (groupId) => {
        
        const updatedGroups = groups.filter(group => group.id !== groupId);
        setGroups(updatedGroups);
    
        const updatedItems = items.filter(item => item.group !== groupId);
        setItems(updatedItems);

      };

      const handleDeleteItems = (itemId) => {
        
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);

      };

      /*useEffect(() => {
        setIsClient(true)
      }, [])*/
      
    return (
      <div>
        
         
        <div>
         <Timeline  
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
          onItemMove={handleItemMove}
          onItemSelect={handleItemSelect}
          onItemDeselect={handleItemDeselect} 
         >
            <TimelineHeaders>
                <SidebarHeader>
                {({ getRootProps }) => {
                  return <div {...getRootProps()}>Groups Title</div>;
                }}
                </SidebarHeader>
                <DateHeader unit="primaryHeader"/>
                <DateHeader />
            </TimelineHeaders>
         </Timeline>
        </div>
        <h3 className="ms-5">Add a new Item and a new Group</h3>
        <NewItemForm 
        newItem={newItem}
        newGroup={newGroup}
        groups={groups}
        handleInputChange={handleInputChange}
        handleGroupInputChange={handleGroupInputChange}
        handleAddItem={handleAddItem}
        handleAddGroup={handleAddGroup}/>
        
        <EditItemForm 
         editingItem={editingItem}
         handleEditInputChange={handleEditInputChange}
         handleUpdateItem={handleUpdateItem}
         handleDeleteItems={handleDeleteItems}
        />
        <DeleteGroupComponet 
         groups={groups}
         handleDeleteGroup={handleDeleteGroup}
        />
      
      
    </div>

  )
};   

export default NewTimelineComponent;

