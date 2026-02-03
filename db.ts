import { BlogPost } from './types';

const REDIS_URL = "https://hip-hermit-37870.upstash.io";
const REDIS_TOKEN = "AZPuAAIncDE5NGIyMjZkNTNhNWU0ZDdjOTQ0NTBhY2FmMjk4MDExY3AxMzc4NzA";
const BLOGS_KEY = "chalu_blog_posts";

/**
 * Fetches all blog posts from the Upstash Redis database.
 */
export const getDBBlogs = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`${REDIS_URL}/get/${BLOGS_KEY}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
    });
    const data = await response.json();
    if (data.result) {
      return JSON.parse(data.result);
    }
    return [];
  } catch (error) {
    console.error("Database Error (Fetch):", error);
    return [];
  }
};

/**
 * Saves the entire array of blog posts to the Upstash Redis database.
 */
export const saveDBBlogs = async (blogs: BlogPost[]): Promise<boolean> => {
  try {
    const response = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["SET", BLOGS_KEY, JSON.stringify(blogs)])
    });
    const data = await response.json();
    return data.result === "OK";
  } catch (error) {
    console.error("Database Error (Save):", error);
    return false;
  }
};