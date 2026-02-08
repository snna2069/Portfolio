import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimationProvider } from './context/AnimationContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout';
import { Home } from './pages';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AnimationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </AnimationProvider>
    </ThemeProvider>
  );
}

export default App;
