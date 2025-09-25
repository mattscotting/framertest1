import './framer/styles.css'

import DesktopComponentFramerComponent from './framer/desktop-component'

export default function App() {
  return (
    <div className='flex flex-col items-center gap-3 '>
      <DesktopComponentFramerComponent.Responsive/>
    </div>
  );
};