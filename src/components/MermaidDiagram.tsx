import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  fallbackImage?: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, fallbackImage }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'var(--font-tahoma)',
    });

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(true);
      }
    };

    renderDiagram();
  }, [chart]);

  if (error && fallbackImage) {
    return (
      <div className="border border-gray-300 p-2 bg-white">
        <img src={fallbackImage} alt="Flow diagram" className="w-full h-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-300 p-3 bg-gray-50 text-center">
        <p className="text-sm text-red-600">Failed to render diagram</p>
        <details className="mt-2 text-xs text-left">
          <summary className="cursor-pointer text-gray-600">View source</summary>
          <pre className="mt-2 p-2 bg-white border border-gray-200 overflow-auto">
            {chart}
          </pre>
        </details>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="border border-gray-300 p-4 bg-gray-50 text-center">
        <p className="text-sm text-gray-600">Loading diagram...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="border border-gray-300 p-3 bg-white overflow-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ fontFamily: 'var(--font-tahoma)' }}
    />
  );
};
