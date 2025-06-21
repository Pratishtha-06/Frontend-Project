import AddItems from './components/AddItems'
import ViewItems from './components/ViewItmes';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './components/layout';
import Details from './components/details';

function App() {
  

  return (
    <>
     <BrowserRouter>
       <Routes>
          <Route path='/' element={<Layout/>}>
          <Route index element={<AddItems/>}/>
          <Route path="/view-items" element={<ViewItems/>}/>
          <Route path="/view-item/:index" element={<Details />} />
          </Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
