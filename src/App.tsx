import './App.css';
import { AppSidebar } from './components/AppSidebar';
import { LayoutPage } from './pages/LayoutPage';

function App() {
  return (
    <div>
      <AppSidebar>
        <div>
          <LayoutPage/>
        </div>
      </AppSidebar>
    </div>
  );
}

export default App;
