"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";

/* ── SVG Illustrations ── */

function WorkbenchIllustration() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blueprint on wall */}
      <rect x="220" y="20" width="100" height="80" fill="#8FAF72" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M 230 40 L 300 40 M 230 60 L 280 60 M 230 80 L 310 80" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="225" cy="25" r="3" fill="#C4622D" />
      <circle cx="315" cy="25" r="3" fill="#C4622D" />
      
      {/* Wall Gears */}
      <circle cx="100" cy="50" r="25" stroke="#2C2C2C" strokeWidth="2" fill="#E8B84B" fillOpacity="0.3" strokeDasharray="6 4" />
      <circle cx="100" cy="50" r="10" stroke="#2C2C2C" strokeWidth="2" fill="none" />
      <circle cx="150" cy="80" r="15" stroke="#2C2C2C" strokeWidth="2" fill="#C4622D" fillOpacity="0.3" strokeDasharray="4 4" />
      <circle cx="150" cy="80" r="6" stroke="#2C2C2C" strokeWidth="2" fill="none" />

      {/* Workbench Table */}
      <path d="M 40 140 L 360 140 L 360 160 L 40 160 Z" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 60 160 L 60 190 M 340 160 L 340 190" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
      
      {/* Tools on bench */}
      {/* Screwdriver */}
      <path d="M 80 135 L 120 120 L 125 125 L 85 140 Z" fill="#C4622D" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 120 120 L 140 110 L 142 113 L 125 125" fill="#E8B84B" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 141 111 L 150 108" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Wrench */}
      <path d="M 280 135 L 260 105" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
      <path d="M 260 105 C 255 100, 245 105, 245 110 C 250 115, 260 110, 260 105 Z" fill="#8FAF72" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 252 108 L 248 102" stroke="#F5F0E8" strokeWidth="2" />
      
      {/* Small notebook/paper */}
      <rect x="180" y="125" width="40" height="15" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" transform="rotate(-5 180 125)" />
      <path d="M 185 130 L 210 128" stroke="#2C2C2C" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function ScientistIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-[80px] h-[80px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 25 90 C 25 60, 40 50, 50 50 C 60 50, 75 60, 75 90 Z" fill="#E8B84B" fillOpacity="0.2" stroke="#2C2C2C" strokeWidth="3" strokeLinejoin="round" />
      <rect x="60" y="70" width="15" height="10" rx="2" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" transform="rotate(10 60 70)" />
      <path d="M 62 74 L 70 76" stroke="#2C2C2C" strokeWidth="1.5" />
      <circle cx="50" cy="35" r="20" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="3" />
      <circle cx="42" cy="32" r="5" fill="none" stroke="#2C2C2C" strokeWidth="2" />
      <circle cx="58" cy="32" r="5" fill="none" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 47 32 L 53 32" stroke="#2C2C2C" strokeWidth="2" />
      <path d="M 45 45 C 48 48, 52 48, 55 45" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PadlockIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-[80px] h-[80px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 35 50 L 35 35 C 35 20, 65 20, 65 35 L 65 40" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="25" y="50" width="50" height="40" rx="6" fill="#8FAF72" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="3" />
      <circle cx="50" cy="65" r="4" fill="#2C2C2C" />
      <path d="M 50 69 L 50 78" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
      {/* Key going in */}
      <path d="M 85 70 L 60 70" stroke="#C4622D" strokeWidth="3" strokeLinecap="round" />
      <circle cx="90" cy="70" r="5" fill="none" stroke="#C4622D" strokeWidth="3" />
      <path d="M 65 70 L 65 75 M 70 70 L 70 75" stroke="#C4622D" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-[80px] h-[80px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 20 C 35 20, 30 40, 30 55 C 30 65, 20 70, 20 75 L 80 75 C 80 70, 70 65, 70 55 C 70 40, 65 20, 50 20 Z" fill="#E8B84B" fillOpacity="0.4" stroke="#2C2C2C" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 40 75 C 40 85, 60 85, 60 75" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Motion lines */}
      <path d="M 15 40 C 5 45, 5 55, 10 60" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
      <path d="M 85 40 C 95 45, 95 55, 90 60" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
      <path d="M 25 30 C 15 35, 15 45, 20 50" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 75 30 C 85 35, 85 45, 80 50" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DynamiteIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-[80px] h-[80px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="40" width="30" height="50" rx="4" fill="#C4622D" fillOpacity="0.3" stroke="#2C2C2C" strokeWidth="3" transform="rotate(-15 50 65)" />
      <path d="M 40 50 L 65 43" stroke="#2C2C2C" strokeWidth="2" transform="rotate(-15 50 65)" opacity="0.3" />
      <path d="M 37 65 L 62 58" stroke="#2C2C2C" strokeWidth="2" transform="rotate(-15 50 65)" opacity="0.3" />
      {/* Fuse */}
      <path d="M 58 35 C 65 25, 60 15, 75 10" stroke="#2C2C2C" strokeWidth="2" fill="none" />
      {/* Fire */}
      <path d="M 70 8 C 75 0, 85 5, 80 15 C 75 18, 70 12, 70 8 Z" fill="#E8B84B" stroke="#2C2C2C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 73 8 L 76 12" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Toggle Switch Component ── */
function DoodleToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 border-[2px] border-charcoal/80 flex items-center px-1
        ${checked ? "bg-olive/40" : "bg-cream/50"}`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-charcoal transition-transform duration-300 transform 
          ${checked ? "translate-x-6" : "translate-x-0"}`}
      />
    </div>
  );
}

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [passwordStrength, setPasswordStrength] = useState(0); // 0, 1, 2, 3
  
  const [profileName, setProfileName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toggles, setToggles] = useState({
    summaryReady: true,
    rateLimit: true,
    weeklyDigest: false,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setProfileName(session.user.name);
    }
  }, [session]);

  const handleProfileUpdate = async () => {
    if (!(session?.user as any)?.id) return;
    try {
      const res = await fetchWithAuth(`/api/user/${(session!.user as any).id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: profileName }),
      });
      if (res.ok) {
        update({ name: profileName });
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!(session?.user as any)?.id) return;
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetchWithAuth(`/api/user/${(session!.user as any).id}/password`, {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordStrength(0);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update password");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAccount = async () => {
    if (!(session?.user as any)?.id) return;
    try {
      const res = await fetchWithAuth(`/api/user/${(session!.user as any).id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        signOut({ callbackUrl: "/" });
      } else {
        alert("Failed to delete account");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Simple password strength calculator
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length === 0) setPasswordStrength(0);
    else if (val.length < 6) setPasswordStrength(1);
    else if (val.length < 10) setPasswordStrength(2);
    else setPasswordStrength(3);
  };

  const strengthColor = 
    passwordStrength === 1 ? "bg-terracotta" :
    passwordStrength === 2 ? "bg-mustard" :
    passwordStrength === 3 ? "bg-olive" : "bg-transparent";
    
  const strengthWidth = 
    passwordStrength === 1 ? "w-1/3" :
    passwordStrength === 2 ? "w-2/3" :
    passwordStrength === 3 ? "w-full" : "w-0";

  return (
    <>
      <div className="p-8 md:p-12 lg:px-20 max-w-5xl mx-auto space-y-12">
        {/* PAGE HEADER */}
        <header className="relative flex flex-col md:flex-row items-center gap-6 pb-6 border-b-2 border-charcoal/10">
          <div className="flex-1">
            <h1 className="font-caveat text-5xl md:text-6xl text-ink">Settings ⚙</h1>
            <p className="font-sans text-lg text-charcoal/60 mt-2">
              Manage your account, preferences and security
            </p>
          </div>
          <div className="w-full max-w-[300px] h-[120px] hidden md:block">
            <WorkbenchIllustration />
          </div>
        </header>

        {/* PROFILE SETTINGS */}
        <section>
          <DoodleCard className="p-8 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <ScientistIcon />
              <h2 className="font-caveat text-3xl text-ink mt-4">Profile Info</h2>
              <p className="font-sans text-sm text-charcoal/50 mt-2">
                Update how you appear to others
              </p>
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="font-caveat text-xl text-ink mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="bg-transparent font-sans text-lg text-charcoal outline-none border-b-2 border-charcoal/20 focus:border-terracotta transition-colors py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-caveat text-xl text-ink mb-1">Email <span className="text-sm border ml-2 border-charcoal/20 px-2 rounded-full text-charcoal/40 font-sans tracking-widest uppercase">Verified</span></label>
                <input 
                  type="email" 
                  value={session?.user?.email || "Loading..."}
                  readOnly
                  className="bg-transparent font-sans text-lg text-charcoal/40 outline-none border-b-2 border-charcoal/10 py-2 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col flex-1">
                  <label className="font-caveat text-xl text-ink mb-1">Job Title</label>
                  <input 
                    type="text" 
                    defaultValue="Lead Pharmacologist"
                    className="bg-transparent font-sans text-lg text-charcoal outline-none border-b-2 border-charcoal/20 focus:border-terracotta transition-colors py-2"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-caveat text-xl text-ink mb-1">Organization</label>
                  <input 
                    type="text" 
                    defaultValue="Global Health Labs"
                    className="bg-transparent font-sans text-lg text-charcoal outline-none border-b-2 border-charcoal/20 focus:border-terracotta transition-colors py-2"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <DoodleButton onClick={handleProfileUpdate} variant="primary" className="!bg-terracotta/90 hover:!bg-terracotta !text-cream !px-8">
                  Save Changes
                </DoodleButton>
              </div>
            </div>
          </DoodleCard>
        </section>

        {/* CHANGE PASSWORD */}
        <section>
          <DoodleCard className="p-8 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <PadlockIcon />
              <h2 className="font-caveat text-3xl text-ink mt-4">Security</h2>
              <p className="font-sans text-sm text-charcoal/50 mt-2">
                Keep your account protected
              </p>
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="font-caveat text-xl text-ink mb-1">Current Password</label>
                <input 
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent font-sans text-lg text-charcoal outline-none border-b-2 border-charcoal/20 focus:border-mustard transition-colors py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-caveat text-xl text-ink mb-1">New Password</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    handlePasswordChange(e);
                  }}
                  placeholder="Enter new password"
                  className="bg-transparent font-sans text-lg text-charcoal outline-none border-b-2 border-charcoal/20 focus:border-mustard transition-colors py-2"
                />
                <div className="mt-3 h-2 w-full bg-charcoal/5 rounded-full overflow-hidden border border-charcoal/10 relative">
                  <div className={`h-full transition-all duration-500 ease-out ${strengthColor} ${strengthWidth}`} />
                </div>
                <span className="font-sans text-xs text-charcoal/40 mt-1 uppercase tracking-wider font-bold">
                  {passwordStrength === 1 && "Weak"}
                  {passwordStrength === 2 && "Good"}
                  {passwordStrength === 3 && "Strong"}
                  {passwordStrength === 0 && "Strength"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-caveat text-xl text-ink mb-1">Confirm New Password</label>
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="bg-transparent font-sans text-lg text-charcoal outline-none border-b-2 border-charcoal/20 focus:border-mustard transition-colors py-2"
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <DoodleButton onClick={handlePasswordSubmit} variant="secondary" className="!px-8 text-charcoal border-charcoal/30">
                  Update Password
                </DoodleButton>
              </div>
            </div>
          </DoodleCard>
        </section>

        {/* NOTIFICATIONS */}
        <section>
          <DoodleCard className="p-8 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <BellIcon />
              <h2 className="font-caveat text-3xl text-ink mt-4">Notifications</h2>
              <p className="font-sans text-sm text-charcoal/50 mt-2">
                Control the noise
              </p>
            </div>
            
            <div className="flex-1 flex flex-col gap-6 pt-2">
              <div className="flex items-center justify-between border-b-2 border-charcoal/5 pb-4">
                <div>
                  <h3 className="font-caveat text-2xl text-ink">Summaries Ready</h3>
                  <p className="font-sans text-sm text-charcoal/50">Email me when a pending summary finishes</p>
                </div>
                <DoodleToggle 
                  checked={toggles.summaryReady} 
                  onChange={() => setToggles(p => ({ ...p, summaryReady: !p.summaryReady }))} 
                />
              </div>
              
              <div className="flex items-center justify-between border-b-2 border-charcoal/5 pb-4">
                <div>
                  <h3 className="font-caveat text-2xl text-ink">Quota Warnings</h3>
                  <p className="font-sans text-sm text-charcoal/50">Email me when my API key is near the limit</p>
                </div>
                <DoodleToggle 
                  checked={toggles.rateLimit} 
                  onChange={() => setToggles(p => ({ ...p, rateLimit: !p.rateLimit }))} 
                />
              </div>

              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-caveat text-2xl text-ink">Weekly Digest</h3>
                  <p className="font-sans text-sm text-charcoal/50">A round-up of my newest categorized papers</p>
                </div>
                <DoodleToggle 
                  checked={toggles.weeklyDigest} 
                  onChange={() => setToggles(p => ({ ...p, weeklyDigest: !p.weeklyDigest }))} 
                />
              </div>
            </div>
          </DoodleCard>
        </section>

        {/* DANGER ZONE */}
        <section className="pb-16">
          <div className="relative overflow-hidden rounded-xl bg-terracotta/[0.03] p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-terracotta/20">
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="10" 
                fill="none" stroke="#C4622D" strokeWidth="2" strokeDasharray="8 6" opacity="0.4" />
            </svg>

            <div className="flex items-center gap-6 relative z-10">
              <DynamiteIcon />
              <div>
                <h2 className="font-caveat text-3xl text-red-800">Danger Zone</h2>
                <p className="font-sans text-sm text-red-900/60 mt-1 max-w-sm">
                  Permanently erase your account and all associated summaries. This action cannot be reversed.
                </p>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-auto mt-4 md:mt-0">
               <DoodleButton 
                variant="ghost" 
                className="!text-red-700 !border-red-700/50 hover:!bg-red-50 !w-full"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete My Account
              </DoodleButton>
            </div>
          </div>
        </section>
      </div>

      {/* CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="animate-in zoom-in-95 duration-200 relative z-10 w-full max-w-sm">
            <DoodleCard className="p-8 text-center !border-terracotta/40">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="font-caveat text-4xl text-ink mb-2">Are you sure?</h3>
              <p className="font-sans text-charcoal/60 mb-8">This cannot be undone.</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <DoodleButton variant="ghost" className="flex-1" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </DoodleButton>
                <DoodleButton variant="primary" className="flex-1 !bg-terracotta !text-cream" onClick={handleDeleteAccount}>
                  Confirm
                </DoodleButton>
              </div>
            </DoodleCard>
          </div>
        </div>
      )}
    </>
  );
}
