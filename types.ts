export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export enum CommunityStatus {
  Active = 'Active',
  Archived = 'Archived',
  Pending = 'Pending'
}

export interface Community {
  id: string;
  name: string;
  creationDate: string;
  membersCount: number;
  status: CommunityStatus;
}

export interface CommunityRequest {
  id: string;
  name: string;
  requesterName: string;
  requesterEmail: string;
  requesterAvatar: string;
  submissionDate: string;
  timeAgo: string; // e.g., "2 hours ago"
}

export interface MemberRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  communityName: string;
  submissionDate: string;
  timeAgo: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  icon: string;
  colorClass: string; // e.g., "text-blue-500"
}