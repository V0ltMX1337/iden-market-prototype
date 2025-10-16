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
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg">
              {currentUser.avatar}
            </div>
            <Input placeholder="Что у вас нового?" className="flex-1" />
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="flex-1 text-sm">
              <Icon name="Image" size={16} className="mr-1" />
              Фото
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-sm">
              <Icon name="Video" size={16} className="mr-1" />
              Видео
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-sm">
              <Icon name="Music" size={16} className="mr-1" />
              Музыка
            </Button>
          </div>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg cursor-pointer"
                onClick={() => onNavigate?.('user-profile', post.author)}
              >
                {post.author.avatar}
              </div>
              <div className="flex-1">
                <div 
                  className="font-semibold hover:underline cursor-pointer"
                  onClick={() => onNavigate?.('user-profile', post.author)}
                >
                  {post.author.name}
                </div>
                <div className="text-xs text-gray-500">{post.timestamp}</div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Icon name="MoreHorizontal" size={18} className="text-gray-600" />
              </button>
            </div>
            
            <p className="mb-3 text-sm">{post.text}</p>
            
            {post.images && post.images.length > 0 && (
              <div className="bg-gray-100 h-48 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Image" size={40} className="text-gray-400" />
              </div>
            )}
            
            <div className="flex items-center gap-4 text-gray-600 text-sm border-t pt-3">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1 transition-colors ${
                  post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Icon name="Heart" size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>
              <button 
                onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <Icon name="MessageCircle" size={18} />
                <span>{post.comments}</span>
              </button>
              <button 
                onClick={() => handleRepost(post.id)}
                className={`flex items-center gap-1 transition-colors ${
                  post.isReposted ? 'text-green-500' : 'hover:text-green-500'
                }`}
              >
                <Icon name="Repeat2" size={18} />
                <span>{post.reposts}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors ml-auto">
                <Icon name="Share2" size={18} />
              </button>
            </div>

            {showComments === post.id && (
              <div className="mt-3 pt-3 border-t space-y-3">
                {(postComments[post.id] || []).map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-sm">
                      {comment.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <div className="font-semibold text-sm">{comment.author.name}</div>
                        <div className="text-sm">{comment.text}</div>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <button className="hover:underline">{comment.timestamp}</button>
                        <button className="hover:underline">Нравится</button>
                        <button className="hover:underline">Ответить</button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm">
                    {currentUser.avatar}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Написать комментарий..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      className="text-sm"
                    />
                    <Button 
                      size="sm"
                      onClick={() => handleAddComment(post.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
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
