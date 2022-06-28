import axios from "axios";

export async function getRssFeed(sports) {
  let data = await axios.get(`http://localhost:3000/api/rss/get_rss`, { sports });
  
  return JSON.parse(data.data);
}
