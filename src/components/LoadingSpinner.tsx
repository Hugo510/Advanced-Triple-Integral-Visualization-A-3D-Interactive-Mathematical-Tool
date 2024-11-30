import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
        </div>
    );
};