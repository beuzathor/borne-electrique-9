import { getPosts } from './api';

async function testAPI() {
  try {
    console.log('Testing WordPress API...');
    const result = await getPosts(1);
    console.log('API Response:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAPI();