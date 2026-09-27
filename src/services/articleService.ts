import { supabase } from '../lib/supabase';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  read_time: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const articleService = {
  async getArticles(publishedOnly = true, page = 1, limit = 20) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    let query = supabase
      .from('articles')
      .select('id, title, slug, category, excerpt, cover_image, author, read_time, is_published, created_at')
      .order('created_at', { ascending: false })
      .range(from, to);
      
    if (publishedOnly) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Article[];
  },

  async getArticleBySlug(slug: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data as Article;
  },

  async createArticle(article: Partial<Article>) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();
    if (error) throw error;
    return data as Article;
  },

  async updateArticle(id: string, article: Partial<Article>) {
    const { data, error } = await supabase
      .from('articles')
      .update({ ...article, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Article;
  },

  async deleteArticle(id: string) {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};
