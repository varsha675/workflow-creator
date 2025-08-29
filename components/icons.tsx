
import React from 'react';

const defaultIconProps = {
  className: "h-5 w-5 text-white",
  strokeWidth: 2,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};

type IconProps = { className?: string; };

export const PlayIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" /></svg>;
export const SendIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
export const GitForkIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-5-9l-3 3 3 3m10-6l3 3-3 3M6 12H4c-1.1 0-2 .9-2 2v2M18 12h2c1.1 0 2 .9 2 2v2" /></svg>;
export const FlagIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z" /></svg>;
export const EyeIcon = () => <svg {...defaultIconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
export const WorkflowIcon = () => <svg {...defaultIconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M10 3h4v4h-4zM3 10h4v4H3zM17 10h4v4h-4z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4m0 0v4m-5-4h10" /></svg>;
export const ChevronsRightIcon = ({className = ''}) => <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
export const MailIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
export const CouponIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>;
export const ClockIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const WorkflowBuilderIcon = () => <svg className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z"></path><path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z"></path></svg>;
export const CheckCircleIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const XCircleIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || defaultIconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const PlusIcon = ({className = ''}: IconProps) => <svg {...defaultIconProps} className={className || "h-6 w-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
