"use client";

import { TerminalBlink } from "../ui/TerminalBlink";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-neutral-400 text-sm">
            root@vaultnode:~$ exit<TerminalBlink />
          </div>
          
          <div className="flex gap-6 text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Docker Hub</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Docs</a>
          </div>
        </div>
        
        <div className="text-center text-neutral-700 text-xs mt-8">
          © 2026 VaultNode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}