export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  bio?: string;
  phone?: string;
  city?: string;
  birthdate?: string;
  friendsCount: number;
  followersCount: number;
  isOnline: boolean;
  lastSeen?: string;
  twoFactorEnabled: boolean;
}

export interface Message {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
}

export interface Chat {
  id: number;
  type: 'private' | 'group';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  name?: string;
  avatar?: string;
}

export interface Post {
  id: number;
  authorId: number;
  author: User;
  text: string;
  images?: string[];
  video?: string;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
  isLiked: boolean;
  isReposted: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  author: User;
  text: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
}

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  location: string;
  authorId: number;
  author: User;
  timestamp: string;
  views: number;
  contacts: {
    phone?: string;
    email?: string;
  };
}

export interface Video {
  id: number;
  title: string;
  description?: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: number;
  likes: number;
  authorId: number;
  author: User;
  timestamp: string;
}

export interface Community {
  id: number;
  name: string;
  description: string;
  avatar: string;
  cover?: string;
  membersCount: number;
  type: 'public' | 'private' | 'closed';
  category: string;
  adminId: number;
  isMember: boolean;
  posts: Post[];
}

export interface Friend {
  id: number;
  user: User;
  status: 'friend' | 'pending' | 'incoming' | 'none';
  mutualFriends: number;
}

export interface Attachment {
  type: 'image' | 'video' | 'file' | 'audio';
  url: string;
  name?: string;
  size?: number;
}

export interface TrivoidAuthData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  code?: string;
}

export type TabType = 'feed' | 'messages' | 'friends' | 'ads' | 'communities' | 'video' | 'taxi' | 'music' | 'profile' | 'services' | 'settings';

export interface AppView {
  type: 'tab' | 'user-profile' | 'community-page' | 'settings';
  data?: any;
}