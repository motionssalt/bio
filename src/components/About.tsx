import React from 'react';
import { Award, Compass, Globe, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Avatar / Visual Identity Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-mid)] bg-[var(--bg-surface)] p-8 shadow-lg">
              <div className="w-20 h-20 rounded-2xl bg-black border border-white/20 flex items-center justify-center p-2 mb-6">
                <img
                  src="/logo.png"
                  alt="MOTIONSALT signature seal"
                  className="w-full h-full object-contain filter invert dark:invert-0"
                />
              </div>

              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Founder & Lead Creator
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[var(--text-primary)] mb-2">
                Victor Jumbo · MOTIONSALT
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                Solo motion designer, editor, and developer based in Nigeria. Operating globally with remote creators, agencies, and brands.
              </p>

              <div className="space-y-3 pt-6 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>UTC+1 Timezone · Seamless overlap with UK, EU & US East</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>High-Fidelity Code + Video Workflow Pipelines</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Trusted for commercial clarity and pulse-pounding rhythm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
              The Philosophy
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-6">
              Frames that hook attention. Motion that stays remembered.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <p>
                In a media landscape overwhelmed by generic templates and AI noise, audiences reward rhythm, atmosphere, and authentic craft. Every frame I cut is calibrated to evoke adrenaline, curiosity, and aesthetic awe.
              </p>
              <p>
                My background bridges cinematic video editing (AMVs, dynamic commercials, YouTube pacing) with technical software development (Python automation, ffmpeg scripting, interactive web apps). This unique intersection allows me to iterate faster, automate repetitive rendering bottlenecks, and invest 100% of my energy into pure creative storytelling.
              </p>
              <p>
                Whether you need a heart-pounding 30-second promotional reel, an intricate kinetic title sequence, or a striking graphic design campaign, I bring speed, communication clarity, and bespoke visual excellence.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
