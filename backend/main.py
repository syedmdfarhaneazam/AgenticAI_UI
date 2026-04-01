from fastapi import FastAPI, Form,Body
import json
from fastapi.middleware.cors import CORSMiddleware

def creategraph(edges):
  # here i will create an adjecency list
    adjacency_list = {}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source not in adjacency_list:
            adjacency_list[source] = []
        adjacency_list[source].append(target)
        if target not in adjacency_list:
            adjacency_list[target] = []
    return adjacency_list

def isADag(graph):
    visited = set()
    stack = set()
    def dfs(node):
        visited.add(node)
        stack.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in stack:
                return True
        stack.remove(node)
        return False
    for node in graph:
        if node not in visited:
            if dfs(node):
                return False
    return True

app = FastAPI()
origins = [ "http://localhost", "http://localhost:3000", "http://127.0.0.1:3000", ]
app.add_middleware( 
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: dict = Body(...)):
    graph = creategraph(pipeline['edges'])
    is_dag = isADag(graph)
    return {
        'nodes': len(pipeline['nodes']), 
        'edges': len(pipeline['edges']),
        # 'graph': graph,
        'isDAG': is_dag
    }
