import type { Handler } from '@netlify/functions'
import { getServiceClient } from './_lib/supabase'

const handler: Handler = async () => {
	try {
		const supabase = getServiceClient()
		const { data, error } = await supabase
			.from('blog_posts')
			.select('slug,title,excerpt,published_at')
			.eq('status','published')
			.order('published_at', { ascending: false })
			.limit(50)
		if (error) return { statusCode: 500, body: `blog-list: ${error.message}` }
		return { statusCode: 200, body: JSON.stringify(data || []) }
	} catch (e: any) {
		return { statusCode: 500, body: `blog-list catch: ${e?.message || 'error'}` }
	}
}

export { handler }


