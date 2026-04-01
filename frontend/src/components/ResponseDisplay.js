import { useStore } from '../store';
import Button from "./Button";
export default function ResponseDisplay({ response }) {
  if (!response) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-secondary border-2 border-surface rounded-xl shadow-xl p-6 w-96 animate-fadeIn">
        <div className="flex justify-between h-8 mb-6" ><h2 className="text-lg font-bold mb-4 text-white">Response</h2><Button variant="negative" onClick={() => useStore.getState().setShowResponse(false)}>X</Button></div>
        <div className="space-y-2 text-white">
          <div className="flex justify-between">
            <span className="font-semibold">Nodes:</span>
            <span>{response.nodes}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Edges:</span>
            <span>{response.edges}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Is DAG:</span>
            <span className={response.isDAG ? "text-green-400" : "text-red-400"}>
              {response.isDAG ? "Yes ✅" : "No ❌"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
