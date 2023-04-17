// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Context from "../context/context"

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
