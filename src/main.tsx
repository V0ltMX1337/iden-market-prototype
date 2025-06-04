import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './pages/index/App'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);