
import React from 'react';
import { Vulnerability } from '../types';
import { ShieldAlert, ExternalLink, ShieldCheck, Tag, Target, CheckCircle2 } from 'lucide-react';

interface SecurityAdvisoryProps {
  vulnerabilities: Vulnerability[];
  isScanning: boolean;
}

const SecurityAdvisory: React.FC<SecurityAdvisoryProps> = ({ vulnerabilities, isScanning }) => {
  if (isScanning) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
        <div className="relative">
          <ShieldAlert className="w-12 h-12 text-emerald-500 animate-pulse" />
          <div className="absolute inset-0 w-12 h-12 bg-emerald-500/20 rounded-full animate-ping" />
        </div>
        <p className="text-slate-400 font-mono text-sm animate-pulse uppercase tracking-widest">Intelligent Scan Active...</p>
      </div>
    );
  }

  if (vulnerabilities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-slate-600 border-2 border-dashed border-slate-800/50 rounded-xl m-1">
        <ShieldCheck className="w-12 h-12 mb-3 opacity-20" />
        <p className="text-xs uppercase font-mono tracking-widest opacity-60">System hygiene optimal</p>
        <p className="text-[10px] mt-2 opacity-40 italic">Run audit for real-time CVE analysis</p>
      </div>
    );
  }

  const severityStyles = {
    Critical: 'text-red-500 bg-red-500/10 border-red-500/30',
    High: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
    Medium: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    Low: 'text-blue-500 bg-blue-500/10 border-blue-500/30'
  };

  const statusStyles = {
    Open: 'text-red-400 bg-red-400/5 border-red-400/10',
    Mitigated: 'text-blue-400 bg-blue-400/5 border-blue-400/10',
    Resolved: 'text-emerald-400 bg-emerald-400/5 border-emerald-400/10',
    'In Review': 'text-slate-400 bg-slate-400/5 border-slate-400/10'
  };

  return (
    <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide py-1">
      {vulnerabilities.map((vuln) => (
        <div 
          key={vuln.id} 
          className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-all group shadow-sm hover:shadow-emerald-500/5"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2 items-center">
              <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase border shadow-sm ${severityStyles[vuln.severity]}`}>
                {vuln.severity} {vuln.cvss && `v${vuln.cvss.toFixed(1)}`}
              </span>
              <span className="text-[9px] font-mono text-slate-500 tracking-tighter uppercase flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" /> {vuln.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
               <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono border ${statusStyles[vuln.status as keyof typeof statusStyles]}`}>
                {vuln.status.toUpperCase()}
              </span>
              <a href={`https://nvd.nist.gov/vuln/detail/${vuln.cveId}`} target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                {vuln.cveId}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">{vuln.title}</h3>
          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">{vuln.description}</p>
          
          <div className="bg-emerald-500/5 border-l-2 border-emerald-500/40 p-2.5 rounded-r relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1 mb-1">
              <Target className="w-3 h-3" /> Mitigation Roadmap
            </p>
            <p className="text-[11px] text-slate-300 font-medium leading-snug">{vuln.recommendation}</p>
          </div>
        </div>
      ))}
      <div className="pt-2 text-center">
        <p className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">Global Vulnerability Index Synchronized</p>
      </div>
    </div>
  );
};

export default SecurityAdvisory;
