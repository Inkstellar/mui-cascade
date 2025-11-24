import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface FullscreenContextType {
    fullscreenId: string | null;
    setFullscreenId: (id: string | null) => void;
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined);

interface FullscreenProviderProps {
    children: ReactNode;
}

/**
 * Provider component that manages global fullscreen state
 * Wrap your app or a section of your app with this provider
 */
export function FullscreenProvider({ children }: FullscreenProviderProps) {
    const [fullscreenId, setFullscreenId] = useState<string | null>(null);

    return (
        <FullscreenContext.Provider value={{ fullscreenId, setFullscreenId }}>
            {children}
        </FullscreenContext.Provider>
    );
}

interface UseFullscreenReturn {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
    enterFullscreen: () => void;
    exitFullscreen: () => void;
    fullscreenStyles: React.CSSProperties | Record<string, any>;
}

/**
 * Custom hook for managing fullscreen state for a specific component by ID
 * Only one component can be fullscreen at a time
 * Press ESC key to exit fullscreen
 * 
 * @param elementId - Unique ID for the element that will go fullscreen
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isFullscreen, toggleFullscreen, fullscreenStyles } = useFullscreen('my-component-id');
 * 
 *   return (
 *     <Paper id="my-component-id" sx={fullscreenStyles}>
 *       <IconButton onClick={toggleFullscreen}>
 *         <Scaling />
 *       </IconButton>
 *       {/* Your content *\/}
 *     </Paper>
 *   );
 * }
 * ```
 */
export function useFullscreen(elementId: string): UseFullscreenReturn {
    const context = useContext(FullscreenContext);

    if (!context) {
        throw new Error('useFullscreen must be used within a FullscreenProvider');
    }

    const { fullscreenId, setFullscreenId } = context;
    const isFullscreen = fullscreenId === elementId;

    const toggleFullscreen = useCallback(() => {
        setFullscreenId(isFullscreen ? null : elementId);
    }, [isFullscreen, elementId, setFullscreenId]);

    const enterFullscreen = useCallback(() => {
        setFullscreenId(elementId);
    }, [elementId, setFullscreenId]);

    const exitFullscreen = useCallback(() => {
        if (isFullscreen) {
            setFullscreenId(null);
        }
    }, [isFullscreen, setFullscreenId]);

    // Listen for ESC key to exit fullscreen
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isFullscreen) {
                setFullscreenId(null);
            }
        };

        if (isFullscreen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFullscreen, setFullscreenId]);

    const fullscreenStyles = isFullscreen
        ? {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1300,
            borderRadius: 0,
            maxWidth: '100vw',
            width: '100vw',
            height: '100vh',
            overflow: 'auto',
        }
        : {};

    return {
        isFullscreen,
        toggleFullscreen,
        enterFullscreen,
        exitFullscreen,
        fullscreenStyles,
    };
}

export default useFullscreen;
