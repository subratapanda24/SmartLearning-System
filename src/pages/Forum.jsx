
import { useState } from 'react'
import { MessageSquare, Plus, ChevronRight, Search, Pin, Send, X } from 'lucide-react'
import { Card, CardContent, Badge, Button, Input, Textarea } from '../components/ui'
import { forumPosts } from '../data/mockData'

export default function Forum() {
  const [activePost, setActivePost] = useState(null)
  const [search, setSearch] = useState('')
  const [reply, setReply] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [posts, setPosts] = useState(forumPosts)

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const sendReply = () => {
    if (!reply.trim() || !activePost) return
    const newReply = { id: Date.now(), author: 'Alex Johnson', authorPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', content: reply, date: 'Just now', isInstructor: false }
    setPosts(prev => prev.map(p => p.id === activePost.id ? { ...p, replies: [...p.replies, newReply] } : p))
    setActivePost(prev => ({ ...prev, replies: [...prev.replies, newReply] }))
    setReply('')
  }

  if (activePost) return (
    <div className="space-y-4 max-w-2xl">
      <button onClick={() => setActivePost(null)} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black font-medium">
        <ChevronRight className="w-4 h-4 rotate-180" />Back to Forum
      </button>
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <img src={activePost.authorPhoto} alt={activePost.author} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-black">{activePost.author}</span>
                <span className="text-xs text-gray-400">{activePost.date}</span>
                <Badge variant="secondary">{activePost.category}</Badge>
              </div>
              <h2 className="text-base font-bold text-black mt-1">{activePost.title}</h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{activePost.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-black">{activePost.replies.length} Replies</p>
        {activePost.replies.map(r => (
          <Card key={r.id} className={r.isInstructor ? 'border-black' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img src={r.authorPhoto} alt={r.author} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-black">{r.author}</span>
                    {r.isInstructor && <Badge variant="default" className="text-xs">Instructor</Badge>}
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{r.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4 space-y-2.5">
          <p className="text-xs font-semibold text-black">Add a Reply</p>
          <Textarea placeholder="Write your reply..." rows={3} value={reply} onChange={e => setReply(e.target.value)} />
          <Button onClick={sendReply} disabled={!reply.trim()} size="sm" className="gap-1.5">
            <Send className="w-3.5 h-3.5" />Post Reply
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-black">Discussion Forum</h1>
          <p className="text-gray-500 text-sm mt-0.5">Ask questions and engage with peers</p>
        </div>
        <Button onClick={() => setShowNew(true)} className="gap-1.5 flex-shrink-0"><Plus className="w-4 h-4" />New Post</Button>
      </div>

      {showNew && (
        <Card className="border-black">
          <CardContent className="p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-black">Create New Post</p>
              <button onClick={() => setShowNew(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <Input placeholder="Post title..." />
            <Textarea placeholder="What is your question or topic?" rows={3} />
            <div className="flex gap-2">
              <Button size="sm">Post</Button>
              <Button size="sm" variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search discussions..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="space-y-2.5">
        {filtered.map(post => (
          <Card key={post.id} className="hover:border-gray-300 transition-colors cursor-pointer" onClick={() => setActivePost(post)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img src={post.authorPhoto} alt={post.author} className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        {post.pinned && <Pin className="w-3 h-3 text-black flex-shrink-0" />}
                        <h3 className="text-sm font-semibold text-black line-clamp-1">{post.title}</h3>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{post.author} — {post.date}</p>
                    </div>
                    <Badge variant="secondary" className="flex-shrink-0">{post.category}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{post.content}</p>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />{post.replies.length} replies
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
