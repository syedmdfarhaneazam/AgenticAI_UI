import { useStore } from "./store";
import Button from "./components/Button";

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));
    const handleSubmit = async () => {
        console.log("Nodes:", nodes);
        console.log("Edges:", edges);
        const payload = {
            nodes,
            edges,
        };
        try {
            const response = await fetch(
                `https://agentic-ai-ui.vercel.app/pipelines/parse`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                },
            );

            if (response.ok) {
                const result = await response.json();
                console.log("Server response:", result);
                useStore.getState().setResponse(result);
                useStore.getState().setShowResponse(true);
            } else {
                console.error("Error from server:", response.statusText);
            }
        } catch (error) {
            console.error("Error sending payload:", error);
        }
    };
    const handleSaveLocally = () => {
        const payload = {
            nodes,
            edges,
        };
        localStorage.setItem("pipelineData", JSON.stringify(payload));
        alert("Pipeline data saved locally!");
    };

    return (
        <div className="flex items-center justify-center space-x-4 mt-4">
            <Button variant="positive" onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="outline" onClick={handleSaveLocally}>
                Save Locally
            </Button>
            <Button
                variant="negative"
                onClick={() => {
                    localStorage.removeItem("pipelineData");
                    window.location.reload();
                }}
            >
                Delete Local Data
            </Button>
        </div>
    );
};
