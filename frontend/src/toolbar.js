import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }} className='border-b-2 shadow-sm bg-secondary border-surface'>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='date' label='Date' />
                <DraggableNode type='toggler' label='Boolean' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='provideLink' label='Links' />
                <DraggableNode type='provideApiKey' label='API Keys' />
            </div>
        </div>
    );
};
