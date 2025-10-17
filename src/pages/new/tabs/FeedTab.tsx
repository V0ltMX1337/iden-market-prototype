import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { User, Post, Comment } from '../types';

interface FeedTabProps {
  currentUser: User;
  onNavigate?: (type: string, data?: any) => void;
}

const FeedTab = ({ currentUser, onNavigate }: FeedTabProps) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      authorId: 2,
      author: {
        id: 2,
        name: 'Анна Смирнова',
        avatar: '👩',
        email: '',
        friendsCount: 234,
        followersCount: 1200,
        isOnline: true,
        twoFactorEnabled: false,
      },
      text: 'Отличный день для прогулки! ☀️ Погода просто замечательная.',
      images: [],
      likes: 124,
      comments: 18,
      reposts: 5,
      timestamp: '2 часа назад',
      isLiked: false,
      isReposted: false,
    },
  ]);

  const [showComments, setShowComments] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState<Record<number, Comment[]>>({
    1: [
      {
        id: 1,
        postId: 1,
        authorId: 3,
        author: {
          id: 3,
          name: 'Дмитрий',
          avatar: '👨',
          email: '',
          friendsCount: 100,
          followersCount: 200,
          isOnline: true,
          twoFactorEnabled: false,
        },
        text: 'Согласен, отличная погода!',
        likes: 5,
        timestamp: '1 час назад',
        isLiked: false,
      },
    ],
  });

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleRepost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isReposted: !post.isReposted, reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1 }
        : post
    ));
  };

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now(),
      postId,
      authorId: currentUser.id,
      author: currentUser,
      text: commentText,
      likes: 0,
      timestamp: 'Только что',
      isLiked: false,
    };

    setPostComments({
      ...postComments,
      [postId]: [...(postComments[postId] || []), newComment],
    });

    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));

    setCommentText('');
  };

  return (
    <div className="space-y-3">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
              {currentUser.avatar}
            </div>
            <Input 
              placeholder="Что у вас нового?" 
              className="flex-1 border-0 bg-gray-100 h-9 text-sm focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 h-9 px-4"
              onClick={() => alert('Пост опубликован!')}
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post.id} className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white cursor-pointer flex-shrink-0"
                onClick={() => onNavigate?.('user-profile', post.author)}
              >
                {post.author.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div 
                  className="font-medium text-sm hover:underline cursor-pointer truncate"
                  onClick={() => onNavigate?.('user-profile', post.author)}
                >
                  {post.author.name}
                </div>
                <div className="text-xs text-gray-500">{post.timestamp}</div>
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-full flex-shrink-0">
                <Icon name="MoreHorizontal" size={18} className="text-gray-600" />
              </button>
            </div>
            
            <p className="mb-3 text-[15px] leading-relaxed">{post.text}</p>
            
            {post.images && post.images.length > 0 && (
              <div className="bg-gray-100 h-48 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Image" size={40} className="text-gray-400" />
              </div>
            )}
            
            <div className="flex items-center gap-6 text-gray-600 text-sm pt-2 border-t">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Icon name={post.isLiked ? 'Heart' : 'Heart'} size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                <span className="text-xs font-medium">{post.likes}</span>
              </button>
              
              <button 
                onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <Icon name="MessageCircle" size={18} />
                <span className="text-xs font-medium">{post.comments}</span>
              </button>
              
              <button 
                onClick={() => handleRepost(post.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  post.isReposted ? 'text-green-500' : 'hover:text-green-500'
                }`}
              >
                <Icon name="Repeat2" size={18} />
                <span className="text-xs font-medium">{post.reposts}</span>
              </button>
              
              <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors ml-auto">
                <Icon name="Share2" size={18} />
              </button>
            </div>

            {showComments === post.id && (
              <div className="mt-3 pt-3 border-t space-y-3">
                {(postComments[post.id] || []).map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                      {comment.author.avatar}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-none px-3 py-2">
                      <div className="font-medium text-sm">{comment.author.name}</div>
                      <p className="text-sm">{comment.text}</p>
                      <div className="text-xs text-gray-500 mt-1">{comment.timestamp}</div>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                    {currentUser.avatar}
                  </div>
                  <Input
                    placeholder="Написать комментарий..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    className="flex-1 border-0 bg-gray-100 h-8 text-sm"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleAddComment(post.id)}
                    className="bg-blue-600 hover:bg-blue-700 h-8 px-3"
                  >
                    <Icon name="Send" size={14} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedTab;
