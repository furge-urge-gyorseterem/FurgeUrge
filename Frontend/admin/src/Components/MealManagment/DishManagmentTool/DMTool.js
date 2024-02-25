
import './DMTool.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import  { useState, } from 'react';

import MealList from '../MealList/MealList';


function DMTool() {
const DMToolKategoris =["All","Leves","Főétel","Desszert"]
const [tabIndex, setTabIndex] = useState(0);









  return (
    <div className="DMTool">
         <Tabs className="" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
     <TabList className="costumTablist">
    {DMToolKategoris.map(item=>(<Tab className="costumTab">{item}</Tab>))}
    </TabList>    
    
    {DMToolKategoris.map(item=>(<TabPanel> <MealList kategoria={item}/> </TabPanel>))}
 
   
    </Tabs>
  
    </div>
  );
}

export default DMTool;
