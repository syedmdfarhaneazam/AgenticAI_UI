// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { DateNode } from "./nodes/dateNode";
import { TogglerNode } from "./nodes/togglerNode";
import { TimerNode } from "./nodes/timerNode";
import { ProvideLinkNode } from "./nodes/provideLinkNode";
import { ProvideApiKeyNode } from "./nodes/provideApiKey";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    date: DateNode,
    toggler: TogglerNode,
    timer: TimerNode,
    provideLink: ProvideLinkNode,
    provideApiKey: ProvideApiKeyNode,
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
        let nodeData = { id: nodeID, nodeType: `${type}` };
        return nodeData;
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData("application/reactflow")) {
                const appData = JSON.parse(
                    event.dataTransfer.getData("application/reactflow"),
                );
                const type = appData?.nodeType;

                // check if the dropped element is valid
                if (typeof type === "undefined" || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                addNode(newNode);
            }
        },
        [reactFlowInstance, addNode, getNodeID],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    return (
        <>
            <div
                ref={reactFlowWrapper}
                style={{ width: "100vw", height: "80vh" }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                    connectionLineType="smoothstep"
                >
                    <Background color="#6629f5" gap={gridSize} />
                    {/* <Controls style={{ backgroundColor: '#140C2A', border: '1px solid #3B1D6B', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} /> */}
                    <MiniMap
                        style={{
                            backgroundColor: "#140C2A",
                            border: "1px solid #3B1D6B",
                            borderRadius: "4px",
                            height: 100,
                            width: 200,
                        }}
                        maskColor="rgba(42, 20, 80, 0.6)"
                        nodeColor="#6C3FC9"
                        nodeStrokeColor="#4C2490"
                        nodeBorderRadius={2}
                    />
                </ReactFlow>
            </div>
        </>
    );
};
