import React from 'react';
import Link from 'next/link';
import { Terminal, Github, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span>System Design <span className="text-cyan-400">Lab</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An authoritative, search-optimized technical knowledge hub for BTech students and backend software engineers.
              Original 24-step case studies, interactive capacity estimation, and verified distributed systems blueprints.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free & Open-Source Engineering Curriculum</span>
            </div>
          </div>

          {/* Fundamentals Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Fundamentals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fundamentals/hld-vs-lld" className="hover:text-cyan-400 transition-colors">
                  HLD vs LLD Guide
                </Link>
              </li>
              <li>
                <Link href="/fundamentals/capacity-estimation" className="hover:text-cyan-400 transition-colors">
                  Capacity Math Cheat Sheet
                </Link>
              </li>
              <li>
                <Link href="/fundamentals/caching" className="hover:text-cyan-400 transition-colors">
                  Distributed Caching
                </Link>
              </li>
              <li>
                <Link href="/fundamentals/load-balancing" className="hover:text-cyan-400 transition-colors">
                  Load Balancing & Hashing
                </Link>
              </li>
              <li>
                <Link href="/fundamentals/database-scaling" className="hover:text-cyan-400 transition-colors">
                  Database Sharding & Replication
                </Link>
              </li>
            </ul>
          </div>

          {/* Case Studies Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Flagship Studies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/case-studies/url-shortener" className="hover:text-cyan-400 transition-colors">
                  URL Shortener (TinyURL)
                </Link>
              </li>
              <li>
                <Link href="/case-studies/rate-limiter" className="hover:text-cyan-400 transition-colors">
                  Distributed Rate Limiter
                </Link>
              </li>
              <li>
                <Link href="/case-studies/notification-system" className="hover:text-cyan-400 transition-colors">
                  Notification Fan-Out Engine
                </Link>
              </li>
              <li>
                <Link href="/case-studies/chat-system" className="hover:text-cyan-400 transition-colors">
                  Scalable Chat System
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Project */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Tools & Project</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/capacity-calculator" className="hover:text-cyan-400 transition-colors">
                  Capacity Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/decision-matrix" className="hover:text-cyan-400 transition-colors">
                  Architecture Decision Matrix
                </Link>
              </li>
              <li>
                <Link href="/interview-prep/beginners" className="hover:text-cyan-400 transition-colors">
                  Beginner Interview Roadmap
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/deepanshu954/SystemDesignLab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} System Design Lab. Built for software engineers.</p>
          <div className="flex items-center gap-4">
            <span>Project Team: Deepanshu, Yash, Anirudh, Aditiya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
