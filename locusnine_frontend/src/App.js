import React,{ useState } from 'react';
import RegisterUser from './components/registerUsers';
import ShowUsers from "./components/showUsers";
function App() {
  const [ dataFetched, setDataFetched ] = useState(false);
  return (
    <div className="App">
      <RegisterUser
        onSubmit={() => {
          console.log('on submit', dataFetched);
          setDataFetched(false);
        }}
      />
      <ShowUsers
        isDataFetched={dataFetched}
        onDataFetched={() => {
          setDataFetched(true);
          console.log('data fetched: ', dataFetched);
        }}
      />
    </div>
  );
}

export default App;
