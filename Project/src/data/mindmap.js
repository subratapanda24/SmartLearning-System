export const mindmapData = {
  1: {
    nodes: [
      { id: '1', type: 'default', position: { x: 400, y: 0 }, data: { label: 'React' }, style: { background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold' } },
      { id: '2', position: { x: 100, y: 120 }, data: { label: 'Components' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #7c3aed44', borderRadius: '10px', padding: '8px 16px' } },
      { id: '3', position: { x: 400, y: 120 }, data: { label: 'State & Hooks' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #7c3aed44', borderRadius: '10px', padding: '8px 16px' } },
      { id: '4', position: { x: 700, y: 120 }, data: { label: 'JSX' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #7c3aed44', borderRadius: '10px', padding: '8px 16px' } },
      { id: '5', position: { x: 0, y: 250 }, data: { label: 'Functional' }, style: { background: '#12121a', color: '#a5b4fc', border: '1px solid #7c3aed22', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '6', position: { x: 200, y: 250 }, data: { label: 'Props' }, style: { background: '#12121a', color: '#a5b4fc', border: '1px solid #7c3aed22', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '7', position: { x: 300, y: 250 }, data: { label: 'useState' }, style: { background: '#12121a', color: '#a5b4fc', border: '1px solid #7c3aed22', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '8', position: { x: 450, y: 250 }, data: { label: 'useEffect' }, style: { background: '#12121a', color: '#a5b4fc', border: '1px solid #7c3aed22', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '9', position: { x: 600, y: 250 }, data: { label: 'useContext' }, style: { background: '#12121a', color: '#a5b4fc', border: '1px solid #7c3aed22', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '10', position: { x: 700, y: 250 }, data: { label: 'Expressions' }, style: { background: '#12121a', color: '#a5b4fc', border: '1px solid #7c3aed22', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '11', position: { x: 150, y: 380 }, data: { label: 'Virtual DOM' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #7c3aed44', borderRadius: '10px', padding: '8px 16px' } },
      { id: '12', position: { x: 450, y: 380 }, data: { label: 'Event Handling' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #7c3aed44', borderRadius: '10px', padding: '8px 16px' } },
      { id: '13', position: { x: 700, y: 380 }, data: { label: 'Routing' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #7c3aed44', borderRadius: '10px', padding: '8px 16px' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', style: { stroke: '#7c3aed88' }, animated: true },
      { id: 'e1-3', source: '1', target: '3', style: { stroke: '#7c3aed88' }, animated: true },
      { id: 'e1-4', source: '1', target: '4', style: { stroke: '#7c3aed88' }, animated: true },
      { id: 'e2-5', source: '2', target: '5', style: { stroke: '#7c3aed44' } },
      { id: 'e2-6', source: '2', target: '6', style: { stroke: '#7c3aed44' } },
      { id: 'e3-7', source: '3', target: '7', style: { stroke: '#7c3aed44' } },
      { id: 'e3-8', source: '3', target: '8', style: { stroke: '#7c3aed44' } },
      { id: 'e3-9', source: '3', target: '9', style: { stroke: '#7c3aed44' } },
      { id: 'e4-10', source: '4', target: '10', style: { stroke: '#7c3aed44' } },
      { id: 'e1-11', source: '1', target: '11', style: { stroke: '#7c3aed44' } },
      { id: 'e1-12', source: '1', target: '12', style: { stroke: '#7c3aed44' } },
      { id: 'e1-13', source: '1', target: '13', style: { stroke: '#7c3aed44' } },
    ]
  },
  2: {
    nodes: [
      { id: '1', position: { x: 400, y: 0 }, data: { label: 'Python Data Science' }, style: { background: '#059669', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold' } },
      { id: '2', position: { x: 100, y: 120 }, data: { label: 'NumPy' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #05966944', borderRadius: '10px', padding: '8px 16px' } },
      { id: '3', position: { x: 400, y: 120 }, data: { label: 'Pandas' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #05966944', borderRadius: '10px', padding: '8px 16px' } },
      { id: '4', position: { x: 700, y: 120 }, data: { label: 'Visualization' }, style: { background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #05966944', borderRadius: '10px', padding: '8px 16px' } },
      { id: '5', position: { x: 0, y: 250 }, data: { label: 'Arrays' }, style: { background: '#12121a', color: '#6ee7b7', border: '1px solid #05966922', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '6', position: { x: 180, y: 250 }, data: { label: 'Broadcasting' }, style: { background: '#12121a', color: '#6ee7b7', border: '1px solid #05966922', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '7', position: { x: 320, y: 250 }, data: { label: 'DataFrames' }, style: { background: '#12121a', color: '#6ee7b7', border: '1px solid #05966922', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '8', position: { x: 480, y: 250 }, data: { label: 'GroupBy' }, style: { background: '#12121a', color: '#6ee7b7', border: '1px solid #05966922', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '9', position: { x: 620, y: 250 }, data: { label: 'Matplotlib' }, style: { background: '#12121a', color: '#6ee7b7', border: '1px solid #05966922', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
      { id: '10', position: { x: 780, y: 250 }, data: { label: 'Seaborn' }, style: { background: '#12121a', color: '#6ee7b7', border: '1px solid #05966922', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', style: { stroke: '#05966988' }, animated: true },
      { id: 'e1-3', source: '1', target: '3', style: { stroke: '#05966988' }, animated: true },
      { id: 'e1-4', source: '1', target: '4', style: { stroke: '#05966988' }, animated: true },
      { id: 'e2-5', source: '2', target: '5', style: { stroke: '#05966944' } },
      { id: 'e2-6', source: '2', target: '6', style: { stroke: '#05966944' } },
      { id: 'e3-7', source: '3', target: '7', style: { stroke: '#05966944' } },
      { id: 'e3-8', source: '3', target: '8', style: { stroke: '#05966944' } },
      { id: 'e4-9', source: '4', target: '9', style: { stroke: '#05966944' } },
      { id: 'e4-10', source: '4', target: '10', style: { stroke: '#05966944' } },
    ]
  }
};
