import { Routes, Route } from 'react-router-dom';
import { routeList } from './routes/routeList';
import './App.css'

function App() {

  return (
    <div>
      <Routes>
          {routeList.map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={element} />
          ))}
        </Routes>
    </div>
  );
}

export default App
