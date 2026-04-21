import { message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
	const { dsTags, setDsTags } = useModel('tag');

	const MOCK_AUTHOR: Blog.IAuthor = {
		id: 'A1',
		name: 'Nguyễn Cao Quảng',
		avatar: 'https://i.pinimg.com/736x/40/f0/b6/40f0b6b18b4fad35178b5ab8ea0d0854.jpg',
		bio: 'Just an NPC.',
		skills: ['React', 'TypeScript', 'Ant Design', 'CapCut'],
		socials: [
			{ platform: 'facebook', url: 'https:' },
			{ platform: 'github', url: 'https' },
		],
	};

	const MOCK_POSTS: Blog.IPost[] = [
		{
			id: 'P1',
			title: 'Cách setup Background xanh tím cực nghệ',
			slug: 'cach-setup-background-xanh-tim-cuc-nghe',
			thumbnail: 'https://picsum.photos/id/1/800/450',
			summary: 'Hướng dẫn chi tiết cách tạo quầng sáng Mesh Gradient cho Web bằng CSS.',
			content: 'Đây là phần content của bài viết',
			author: MOCK_AUTHOR,
			createdAt: '2026-04-21T10:00:00Z',
			viewCount: 150,
			status: 'published',
			tags: ['T1', 'T2'],
		},
		{
			id: 'P2',
			title: 'Review CapCut PC 2026',
			slug: 'review-capcut-pc-2026',
			thumbnail: 'jjjjj',
			summary: 'Tính năng AI mới trong CapCut có thực sự đỉnh như lời đồn?',
			content: 'Nội dung đang cập nhật...',
			author: MOCK_AUTHOR,
			createdAt: '2026-04-20T08:30:00Z',
			viewCount: 45,
			status: 'draft',
			tags: ['T3'],
		},
	];

	const [dsPosts, setDsPosts] = useState<Blog.IPost[]>(() => {
		const saved = localStorage.getItem('dsPosts');
		return saved ? JSON.parse(saved) : MOCK_POSTS;
	});

	const syncWithTags = (newPosts: Blog.IPost[]) => {
		const updatedTags = dsTags.map((tag) => ({
			...tag,
			postCount: newPosts.filter((p) => p.tags.includes(tag.id)).length,
		}));
		setDsTags(updatedTags);
		localStorage.setItem('dsTags', JSON.stringify(updatedTags));
		localStorage.setItem('dsPosts', JSON.stringify(newPosts));
	};

	const addPost = (values: Blog.IPost) => {
		const cleanTitle = values.title.toLowerCase().trim();
		const baseSlug = cleanTitle.split(' ').filter(Boolean).join('-');
		const finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

		const newPost: Blog.IPost = {
			...values,
			id: `P${Date.now()}`,
			slug: finalSlug,
			author: MOCK_AUTHOR,
			viewCount: 0,
			createdAt: new Date().toISOString(),
		};

		const newDs = [...dsPosts, newPost];
		setDsPosts(newDs);
		syncWithTags(newDs);
		message.success('Đã đăng bài thành công!');
	};

	const deletePost = (id: string) => {
		const newDs = dsPosts.filter((p) => p.id !== id);
		setDsPosts(newDs);
		syncWithTags(newDs);
		message.success('Đã xóa bài viết!');
	};

	const updatePost = (id: string, values: Partial<Blog.IPost>) => {
		const newDs = dsPosts.map((p) => (p.id === id ? { ...p, ...values } : p));
		setDsPosts(newDs);
		syncWithTags(newDs);
		message.success('Cập nhật thành công!');
	};
	const incrementView = (id: string) => {
		const currentPosts = JSON.parse(localStorage.getItem('dsPosts') || '[]');
		const newData = currentPosts.map((p: Blog.IPost) =>
			p.id === id ? { ...p, viewCount: (p.viewCount || 0) + 1 } : p,
		);

		setDsPosts(newData);
		localStorage.setItem('dsPosts', JSON.stringify(newData));
	};

	return { dsPosts, addPost, updatePost, deletePost, incrementView };
};
