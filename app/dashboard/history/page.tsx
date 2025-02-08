"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import React, { useEffect, useState } from 'react';

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function History() {
  const [historyData, setHistoryData] = useState<HISTORY[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await db.select().from(AIOutput);
        {/*@ts-ignore*/}
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {historyData.length > 0 ? (
          historyData.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">{item.templateSlug}</h2>
              <p className="text-gray-600 mb-2 truncate">{item.aiResponse}</p>
              <p className="text-gray-500 text-sm mb-2">Words: {item.aiResponse.split(' ').length}</p>
              <p className="text-gray-400 text-sm mb-4">{item.createdAt}</p>
              <Button 
                variant='ghost' 
                className='text-primary' 
                onClick={() => navigator.clipboard.writeText(item.aiResponse)}
              >
                Copy
              </Button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No history available.
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
