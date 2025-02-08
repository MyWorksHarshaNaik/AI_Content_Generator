import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface props{
  aiOutput:string
}

function OutputSection({aiOutput}:props) {
  {/* @ts-ignore */}
  const editorRef:any=useRef();

  useEffect(()=>{
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  },[aiOutput])

  return (
    <div className='bg-white shadow-lg border rounded-lg'>

      <div className='flex justify-between items-center'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button
        onClick={()=>navigator.clipboard.writeText(aiOutput)} 
        className='flex gap-2'>
          <Copy/>Copy
        </Button>
      </div>

      <Editor
        initialValue="Your results will appear here..."
        ref={editorRef}
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  )
}

export default OutputSection