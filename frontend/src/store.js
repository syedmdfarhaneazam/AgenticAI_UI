// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    showResponse: false,
    setShowResponse: (value) => set({ showResponse: value }),
    setResponse: (response) => set({ response }),
    response: null,
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    // a function to delete the node
    // this is my function that will pre load the data if data is avaliable in local Storage
    initializeFromLocalStorage: () => {
      try {
        const savedData = localStorage.getItem('pipelineData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData.nodes && parsedData.edges) {
            set({
              nodes: parsedData.nodes,
              edges: parsedData.edges,
            });
            console.log('data loaded locally for piplines');
          }
        }
      } catch (error) {
        console.error('error in loading data from local sTORage', error);
      }
    },
  }));
