import React from 'react';
import TasksView from './Components/Tasks'
import Header from './Components/Header'
import TaskTrackerStore from "./store/TaskTrackerStore";

function App() {
  return (
    <TaskTrackerStore>
      <Header/>
      <TasksView />
    </TaskTrackerStore>
  );
}

export default App;
