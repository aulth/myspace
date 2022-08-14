// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ShortUniqueId from 'short-unique-id'
export default function handler(req, res) {
  const uid = new ShortUniqueId({length:6})
  res.status(200).json({ name: 'John Doe' , uid:uid()})
}
