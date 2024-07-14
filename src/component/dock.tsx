// components/Dock.tsx
import React, { useState } from 'react';
import $ from 'jquery'

// import './dock.css'

const Dock = () => {
  const [dockPosition, setDockPosition] = useState(1)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleDock = () => {
    let position = dockPosition + 1
    position > 3 && (position = 1)
    switch (position) {
      case 1:
        $('#dock-container').css('top', 0).css('right', '').css('left', '50%')
        break;
      case 2:
        $('#dock-container').css('top', '50%').css('right', '').css('left', 0)
        break;
      default:
        $('#dock-container').css('top', '50%').css('left', '').css('right', 0)
        break;
    }
    setDockPosition(position)
  }

  return (
    <div
      className={`extension-docking ${isCollapsed ? 'collapsed' : ''}`}
      style={{ zIndex: 9999 }}
      onClick={toggleDock}
    >
      {/* Dock content */}
      {!isCollapsed && (
        <div className="dock-content">
          <h1>Dock Content</h1>
        </div>
      )}
    </div>
  );
};

export default Dock;